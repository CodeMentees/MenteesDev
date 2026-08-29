import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    date: {
      type: String, // format YYYY-MM-DD
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
