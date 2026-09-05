import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";
import { cachePublic } from "../middlewares/cacheMiddleware.js";

const router = Router();
router.get("/", cachePublic(120, 600), getCategories);
router.get("/:id", cachePublic(300, 600), getCategoryById);
router.use(requirePermission("manage_courses"))
router.post("/", createCategory); 
router.put("/:id", updateCategory); 
router.delete("/:id", deleteCategory); 

export default router;
