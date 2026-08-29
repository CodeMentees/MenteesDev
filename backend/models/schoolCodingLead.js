import mongoose from "mongoose";

const schoolCodingLeadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Closed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const SchoolCodingLead = mongoose.model("SchoolCodingLead", schoolCodingLeadSchema);

export default SchoolCodingLead;
