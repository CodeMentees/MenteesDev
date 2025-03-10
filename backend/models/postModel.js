import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
    categories: [String],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
