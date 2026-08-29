import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  progress: {
    type: Number,
    default: 0, // Percentage completed
  },
  completedLessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson" // Or whatever your sub-document ID is for lessons/videos
  }],
  status: {
    type: String,
    enum: ["active", "completed", "dropped"],
    default: "active",
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

// Prevent duplicate enrollments
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
