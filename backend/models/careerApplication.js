import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    college: {
      type: String,
      required: true,
      trim: true,
    },
    techStack: {
      type: String,
      required: true,
    },
    resumeDriveLink: {
      type: String,
      default: "",
    },
    resumeData: {
      type: Buffer,
    },
    resumeContentType: {
      type: String,
    },
  },
  { timestamps: true }
);

const CareerApplication = mongoose.model("CareerApplication", careerApplicationSchema);

export default CareerApplication;
