import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  courseName: String,
  message: { type: String, required: false },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const Query = mongoose.model("Query", querySchema);

export default Query;
