import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourseCategory,
  getCourses,
  getCoursesByCategory,
  updateCourse,
  updateCourseDetails
} from "../controllers/courseController.js"; // Import the correct controller
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.get("/:id", getCourse);
router.get("/course-category", getCourseCategory);
router.get("/:categoryId/category", getCoursesByCategory);
router.get("/", getCourses);

router.use(isAdmin)
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.put("/:courseId/details", updateCourseDetails);

export default router;
