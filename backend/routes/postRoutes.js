import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

// Define routes
router.get("/", getPosts);
router.get("/:id", getPost);

router.use(isAdmin)
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;