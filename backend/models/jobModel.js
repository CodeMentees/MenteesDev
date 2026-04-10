import mongoose from "mongoose";

const jobOpportunitySchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  applyLink: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: false,
    default: "Hiring Partner",
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
});

jobOpportunitySchema.index({ role: 1 });

const JobOpportunity = mongoose.model("JobOpportunity", jobOpportunitySchema);

export default JobOpportunity;
