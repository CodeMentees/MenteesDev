import mongoose from "mongoose";

const blogCategorySchema = new mongoose.Schema({
    name: String,
});

const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategory;