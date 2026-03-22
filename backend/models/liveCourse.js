import mongoose from "mongoose";

const liveCourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  meetLink: { type: String, default: "" },
  schedule: { type: Date },
  liveStatus: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: true },
  content: [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
      isPublic: { type: Boolean, default: false },
      contentType: {
        type: String,
        enum: ["video", "document", "link"],
        default: "video",
      },
    },
  ],
  courseType: {
    type: String,
    enum: ["live", "recorded"],
    default: "live",
  },
}, { timestamps: true });

const LiveCourse = mongoose.model("LiveCourse", liveCourseSchema);

export default LiveCourse;
