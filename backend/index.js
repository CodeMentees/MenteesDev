import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cron from "node-cron";
import BlockedIp from "./middlewares/ipBlockMiddleware.js";
import path from "path";
import { init } from "./utils/socket.js";
import http from "http";
import routes from "./routes/index.js"
import swaggerRoutes from "./swagger.js";
const app = express();
dotenv.config();

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "*",
  credentials: true,
};

// app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.error(error));
mongoose.connection.on("open", () => console.log("Connected to database"));

// Create HTTP server to work with Socket.io
const server = http.createServer(app);
init(server);
app.use("/api",routes)
app.use("/api", swaggerRoutes);
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Clear blocked IPs older than 24 hours
cron.schedule("0 0 * * *", async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await BlockedIp.deleteMany({ timestamp: { $lt: twentyFourHoursAgo } });
  console.log("Cleared old blocked IPs.");
});

app.listen(process.env.PORT, () =>
  console.log(`BackedExpressAPIServer running on port ${process.env.PORT}`)
);