import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js"
const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {"useNewUrlParser": true, "useUnifiedTopology": true});
mongoose.connection.on("error", (error) => console.error(error));
mongoose.connection.on("open", () => console.log("Connected to database"));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post",postRoutes);



app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
