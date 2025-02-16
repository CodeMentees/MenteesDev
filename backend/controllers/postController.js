import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";

//create post
const createPost = asyncHandler(async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      category: req.body.category,
    });
    const createdPost = await post.save();
    res.status(201).json({
      data: createdPost,
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//delete post
const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.deleteOne();
      res.json({ message: "Post removed" });
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//get post
const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json({ data: post, message: "post fetch successfully" });
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//update post

const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      post.title = req.body.title || post.title;
      post.content = req.body.content || post.content;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//get posts
const getPosts = asyncHandler(async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 }) // Sort by newest posts
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments(); // Total post count for pagination info

    return res.json({
      data: posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export { createPost, deletePost, getPost, getPosts, updatePost };
