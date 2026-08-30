import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import compression from "compression";
import BlockedIp from "./middlewares/ipBlockMiddleware.js";
import path from "path";
import fs from "fs";

import { init } from "./utils/socket.js";
import http from "http";
import routes from "./routes/index.js"
import swaggerRoutes from "./swagger.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

// Fix Vercel's URL rewrite behavior for single-file Express apps
app.use((req, res, next) => {
  // If vercel.json passed the original path via query parameter ?path=
  if (req.query && req.query.path) {
    req.url = req.originalUrl = `/api/${req.query.path}`;
    // Optionally remove it from query so it doesn't pollute req.query
    delete req.query.path;
  }
  next();
});

app.use(compression());

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });
}
console.log('MONGODB_URI present?', !!process.env.MONGODB_URI);
app.set("trust proxy", 1);

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    // allowedOrigins comes from FRONTEND_URL env var (comma-separated list).
    // In production, set FRONTEND_URL to include ALL allowed origins, e.g.:
    //   FRONTEND_URL=https://codementees.com,https://your-project.vercel.app
    // LOW-3: No wildcard *.vercel.app — only explicitly listed domains are allowed.
    const explicitAllowed = new Set(allowedOrigins);

    // Check against exact matches first
    if (explicitAllowed.has(origin)) {
      return callback(null, true);
    }

    // Allow codementees.com and its subdomains
    if (/codementees\.com$/.test(origin)) {
      return callback(null, true);
    }

    // Allow localhost for development
    if (/^http:\/\/localhost:\d+$/.test(origin) || /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)) {
      return callback(null, true);
    }

    // Safely handle Vercel preview URLs:
    // If FRONTEND_URL is set, extract the project name and allow its preview URLs.
    // Example: if FRONTEND_URL=https://menteesdev.vercel.app, we allow /^https:\/\/menteesdev.*\.vercel\.app$/
    let vercelProjectRegex = null;
    if (process.env.FRONTEND_URL) {
      const urls = process.env.FRONTEND_URL.split(",");
      for (const url of urls) {
        if (url.includes('vercel.app')) {
          try {
            const hostname = new URL(url).hostname; // e.g. menteesdev.vercel.app
            const projectName = hostname.split('.')[0]; // menteesdev
            vercelProjectRegex = new RegExp(`^https:\\/\\/${projectName}.*\\.vercel\\.app$`);
            break;
          } catch (e) {
            // Ignore invalid URLs
          }
        }
      }
    }

    if (vercelProjectRegex && vercelProjectRegex.test(origin)) {
       return callback(null, true);
    }

    // If FRONTEND_URL is NOT set, or doesn't contain a vercel app, fallback to allowing all vercel apps 
    // to prevent breaking deployments, relying on SameSite=Lax cookies for CSRF protection.
    if (!process.env.FRONTEND_URL && /\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    console.log(`CORS blocked origin: ${origin}`); // Log blocked origin for debugging
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
// MongoDB connection with serverless caching
let cachedDb = null;
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return mongoose.connection;
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI environment variable is missing!");
    return null;
  }
  if (!cachedDb) {
    cachedDb = mongoose.connect(process.env.MONGODB_URI).then((m) => {
      console.log("Connected to MongoDB database");
      return m;
    }).catch((err) => {
      cachedDb = null;
      console.error("MongoDB connection error:", err.message);
    });
  }
  return cachedDb;
};

// Initiate connection
connectDB();

// Middleware to ensure DB connection is ready before processing API routes
app.use("/api", async (req, res, next) => {
  if (mongoose.connection.readyState < 1) {
    await connectDB();
  }
  next();
});

// Create HTTP server to work with Socket.io (dedicated server mode)
let server;
if (!process.env.VERCEL) {
  server = http.createServer(app);
  init(server);
}
app.use("/api", routes)
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));

app.use("/api", swaggerRoutes);
// Serve static files from the frontend/dist directory
let frontendDistPath = path.join(process.cwd(), "frontend", "dist");
if (!fs.existsSync(frontendDistPath)) {
  frontendDistPath = path.join(__dirname, "../frontend/dist");
}
app.use(express.static(frontendDistPath));

// ── Pre-rendered route serving ────────────────────────────────────────────
// For known public routes, serve the pre-rendered HTML file (dist/<route>/index.html)
// so crawlers receive real content on first load.
// Falls back to the SPA shell (dist/index.html) for all other routes.
const PRE_RENDERED_ROUTES = [
  '/courses',
  '/live',
  '/about',
  '/placement-support',
  '/summer-internships',
  '/school-coding',
  '/school-coding/catalog',
  '/blogs',
  '/faq',
  '/contact',
  '/register',
];

app.get('*', (req, res) => {
  const reqPath = req.path;

  // Prevent serving SPA fallback (index.html) for missing assets or files with extensions
  if (reqPath.startsWith('/api/') || reqPath.startsWith('/assets/') || reqPath.match(/\.[a-zA-Z0-9]+$/)) {
    return res.status(404).send('Not Found');
  }

  // Check if this exact path has a pre-rendered HTML file
  if (PRE_RENDERED_ROUTES.includes(reqPath)) {
    const preRenderedFile = path.join(frontendDistPath, reqPath, 'index.html');
    if (fs.existsSync(preRenderedFile)) {
      return res.sendFile(preRenderedFile);
    }
  }

  // Default SPA fallback
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});


// Clear blocked IPs older than 24 hours (only in dedicated server mode)
if (!process.env.VERCEL) {
  cron.schedule("0 0 * * *", async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await BlockedIp.deleteMany({ timestamp: { $lt: twentyFourHoursAgo } });
    console.log("Cleared old blocked IPs.");
  });
}

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
  server.listen(process.env.PORT, () =>
    console.log(`BackedExpressAPIServer running on port ${process.env.PORT}`)
  );
}

export default app;