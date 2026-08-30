import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { getDefaultPermissions } from "../utils/defaultPermissions.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mentees").then(async () => {
  const email = "random.google.user" + Date.now() + "@test.com";
  const permissions = getDefaultPermissions("student");
  const user = await User.create({ email, name: "Google User", permissions });
  console.log("Newly created Google User:");
  console.log("role:", user.role);
  console.log("isAdmin:", user.isAdmin);
  
  // Clean up
  await User.deleteOne({ _id: user._id });
  process.exit(0);
});
