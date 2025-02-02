import { Router } from "express";
import { getCourseCategory } from "../controllers/courseController.js";
import { createCategory } from "../controllers/categoryController.js"; // Import the correct controller

const router = Router();
router.get("/", getCourseCategory);
router.post("/", createCategory); 

export default router;
