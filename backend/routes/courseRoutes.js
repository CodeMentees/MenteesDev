import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourseCategory,
  getCourses,
  updateCourse,
  updateCourseDetails
} from "../controllers/courseController.js"; // Import the correct controller

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/course-category", getCourseCategory);
router.put("/:courseId/details", updateCourseDetails);

export default router;
