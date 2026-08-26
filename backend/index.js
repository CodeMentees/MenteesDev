import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
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
app.use(compression());

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') });
}
console.log('Loading .env from:', path.join(__dirname, '.env'));
console.log('process.cwd():', process.cwd());
console.log('MONGODB_URI present?', !!process.env.MONGODB_URI);
app.set("trust proxy", 1);

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      /codementees\.com$/.test(origin) ||
      /^http:\/\/localhost:\d+$/.test(origin) ||
      /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
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
if (!process.env.VERCEL) {
  const server = http.createServer(app);
  init(server);
}
app.use("/api", routes)
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.get("/api/debug-paths", (req, res) => {
  try {
    res.json({
      cwd: process.cwd(),
      dirname: __dirname,
      cwd_files: fs.readdirSync(process.cwd()),
      dirname_files: fs.readdirSync(__dirname),
      root_files: fs.readdirSync(path.join(__dirname, '..'))
    });
  } catch (err) {
    res.json({ error: err.message, stack: err.stack });
  }
});
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
  app.listen(process.env.PORT, () =>
    console.log(`BackedExpressAPIServer running on port ${process.env.PORT}`)
  );
}

export default app;