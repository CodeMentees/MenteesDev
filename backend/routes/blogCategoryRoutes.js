import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/blogCategoryController.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";

const router = Router();

// Public Routes
router.get("/", getCategories);
router.get("/:id", getCategory);

// Protected Routes (Only Admin)
router.use(requirePermission("manage_content"));
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
