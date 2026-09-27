import mongoose from "mongoose";

const blogTopicQueueSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "Technology",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "published", "failed"],
      default: "pending",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    publishedPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
  },
  { timestamps: true }
);

blogTopicQueueSchema.index({ status: 1, createdAt: 1 });

const BlogTopicQueue = mongoose.model("BlogTopicQueue", blogTopicQueueSchema);

export default BlogTopicQueue;
