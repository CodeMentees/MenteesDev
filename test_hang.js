console.log('first line');
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
dotenv.config();

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",")
  : ["http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("trust proxy", 1);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.error(error));
mongoose.connection.on("open", () => console.log("Connected to database"));

// Create HTTP server to work with Socket.io
const server = http.createServer(app);
init(server);
app.use("/api", routes)
app.get("/api/ping", (req, res) => res.json({ message: "pong" }));
app.use("/api", swaggerRoutes);
// Serve static files from the frontend/dist directory
const frontendDistPath = path.join(process.cwd(), "frontend", "dist");

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


// Clear blocked IPs older than 24 hours
cron.schedule("0 0 * * *", async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await BlockedIp.deleteMany({ timestamp: { $lt: twentyFourHoursAgo } });
  console.log("Cleared old blocked IPs.");
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(`BackedExpressAPIServer running on port ${process.env.PORT}`)
);