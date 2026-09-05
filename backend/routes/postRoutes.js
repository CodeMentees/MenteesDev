import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost, likePost, addComment, deleteComment, bulkDeletePosts, getPostBySlug } from "../controllers/postController.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";
import { cachePublic } from "../middlewares/cacheMiddleware.js";

const router = Router();

// Public routes
router.get("/", cachePublic(60, 300), getPosts);
router.get("/slug/:slug", cachePublic(300, 600), getPostBySlug); // ⚠️ Must be BEFORE /:id to avoid shadowing
router.get("/:id", cachePublic(300, 600), getPost);

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