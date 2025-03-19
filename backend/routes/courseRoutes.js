import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  getCoursesByCategory,
  updateCourse,
  updateCourseDetails
} from "../controllers/courseController.js"; // Import the correct controller
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.get("/:id", getCourse);
router.get("/:categoryId/category", getCoursesByCategory);
router.get("/", getCourses);

router.use(isAdmin)
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.put("/:id/details", updateCourseDetails);
router.delete("/:id", deleteCourse);

export default router;
