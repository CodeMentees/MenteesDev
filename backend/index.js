import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import queryRoutes from "./routes/queryRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import cron from "node-cron";
import BlockedIp from "./middlewares/ipBlockMiddleware.js";
import path from "path";
import { init } from "./utils/socket.js";
import http from "http";
const app = express();
dotenv.config();

import { fileURLToPath } from "url";

// Derive __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
  origin: "https://codementees.com",
  credentials: true,
};

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", (error) => console.error(error));
mongoose.connection.on("open", () => console.log("Connected to database"));

app.use("/api/home", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/query", queryRoutes);

//chats related
app.use("/api/groups", groupRoutes);
app.use("/api/messages", messageRoutes);

// Create HTTP server to work with Socket.io
const server = http.createServer(app);
// Socket.io
init(server);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Fallback for all other routes to serve the index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Clear blocked IPs older than 24 hours
cron.schedule("0 0 * * *", async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await BlockedIp.deleteMany({ timestamp: { $lt: twentyFourHoursAgo } });
  console.log("Cleared old blocked IPs.");
});

// app.listen(process.env.PORT, () =>
//   console.log(`Server running on port ${process.env.PORT}`)
// );

// server.listen( 3000, () =>
//   console.log(`Server running on port ${process.env.PORT || 3000}`)
// );

export default app;