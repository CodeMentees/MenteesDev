import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost, likePost, addComment, deleteComment, bulkDeletePosts } from "../controllers/postController.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";

const router = Router();

// Public routes
router.get("/", getPosts);
router.get("/:id", getPost);

// Authenticated user routes (likes & comments)
router.post("/:id/like", isAuthenticated, likePost);
router.post("/:id/comment", isAuthenticated, addComment);
router.delete("/:id/comment/:commentId", requirePermission("manage_content"), deleteComment);

// Admin-only routes
router.use(requirePermission("manage_content"));
router.post("/bulk", bulkDeletePosts);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;