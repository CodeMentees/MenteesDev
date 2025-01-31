import { Router } from "express";
import { getCourseCategory } from "../controllers/courseController.js"; // Import the correct controller

const router = Router();

// Define routes
router.get("/", getCourseCategory); // Get all courses


export default router;
