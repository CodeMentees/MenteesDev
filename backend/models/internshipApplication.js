import mongoose from "mongoose";

const internshipApplicationSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

const InternshipApplication = mongoose.model("InternshipApplication", internshipApplicationSchema);

export default InternshipApplication;
