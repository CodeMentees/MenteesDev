import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js"; // Import the correct controller
import { requirePermission } from "../middlewares/rbacMiddleware.js";

const router = Router();
router.get("/", getCategories);
router.get("/:id",getCategoryById)
router.use(requirePermission("manage_courses"))
router.post("/", createCategory); 
router.put("/:id", updateCategory); 
router.delete("/:id", deleteCategory); 

export default router;
