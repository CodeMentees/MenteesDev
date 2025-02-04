import { Router } from "express";
import { getCourseCategory } from "../controllers/courseController.js";
import { createCategory } from "../controllers/categoryController.js"; // Import the correct controller
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();
router.get("/", getCourseCategory);
router.use(isAdmin)
router.post("/", createCategory); 

export default router;
