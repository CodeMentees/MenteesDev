import mongoose from "mongoose";

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: "from-blue-500 to-cyan-400",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    stipend: {
      type: String,
      default: "",
    },
    preferredBackground: {
      type: String,
      default: "",
    },
    jobType: {
      type: String,
      default: "Internship", // Default for legacy data
    },
  },
  { timestamps: true }
);

const Career = mongoose.model("Career", careerSchema);

export default Career;
