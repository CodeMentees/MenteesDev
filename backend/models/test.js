import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    testname: { type: String, required: true },
  },
  { timestamps: true },
);

const test = mongoose.model("test", testSchema);

export default test;
