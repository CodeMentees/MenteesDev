import mongoose from "mongoose";

const querySchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  courseName: String,
  date: { type: Date, default: Date.now },
});

const Query = mongoose.model("Query", querySchema);

export default Query;
