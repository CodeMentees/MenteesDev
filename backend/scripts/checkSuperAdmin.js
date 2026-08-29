import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mentees").then(async () => {
  const users = await User.find({ isAdmin: true });
  console.log("Admins found:", users.map(u => ({ email: u.email, role: u.role, isAdmin: u.isAdmin })));
  process.exit(0);
});
