import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/blogCategoryController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

// Public Routes
router.get("/", getCategories);
router.get("/:id", getCategory);

// Protected Routes (Only Admin)
router.use(isAdmin);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
