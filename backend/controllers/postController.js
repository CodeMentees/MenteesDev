import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API endpoints for managing posts
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Error creating post
 */
const createPost = asyncHandler(async (req, res) => {
  try {
    const { title, content, image, categories, seo } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const post = new Post({ title, content, image, categories, seo });
    const createdPost = await post.save();

    res.status(201).json({ data: createdPost, message: "Post created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post removed successfully
 *       404:
 *         description: Post not found
 */
const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();
    res.json({ message: "Post removed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post fetched successfully
 *       404:
 *         description: Post not found
 */
const getPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments.user", "name email");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ data: post, message: "Post fetched successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               image:
 *                 type: string
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */
const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.image = req.body.image || post.image;
    post.categories = req.body.categories || post.categories;
    if (req.body.seo) post.seo = req.body.seo;

    const updatedPost = await post.save();
    res.json({ data: updatedPost, message: "Post updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get a paginated list of posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of posts per page (default is 10)
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 */
const getPosts = asyncHandler(async (req, res) => {
  try {
    let { page = 1, limit = 10, category } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const query = {};
    if (category) {
      query.categories = category;
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 }) // Sort by newest posts
      .skip(skip)
      .limit(limit)
      .populate("comments.user", "name email");

    const totalPosts = await Post.countDocuments(query); // Total post count for pagination info

    res.json({
      data: posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      message: "Posts fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.likes.includes(req.userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== req.userId.toString());
    } else {
      post.likes.push(req.userId);
    }

    await post.save();
    res.json({ message: "Post liked/unliked successfully", data: post.likes });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const addComment = asyncHandler(async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      user: req.userId,
      text,
    };

    post.comments.push(comment);
    await post.save();

    await post.populate("comments.user", "name email");
    res.status(201).json({ message: "Comment added successfully", data: post.comments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Admins are naturally authorized to delete any comment. Check handled by isAdmin middleware.

    post.comments.pull(req.params.commentId);
    await post.save();

    res.json({ message: "Comment deleted successfully", data: post.comments });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const bulkDeletePosts = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: "Invalid payload" });
  }
  await Post.deleteMany({ _id: { $in: ids } });
  res.json({ message: "Posts deleted successfully" });
});

export { createPost, deletePost, getPost, getPosts, updatePost, likePost, addComment, deleteComment, bulkDeletePosts };
