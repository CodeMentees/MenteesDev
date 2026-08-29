import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import protect from "../middlewares/IsAuthenticate.js";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  getCoursesByCategory,
  updateCourse,
  updateCourseDetails,
  bulkDeleteCourses
} from "../controllers/courseController.js"; // Import the correct controller
import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";

const upload = multer({ storage });
const router = Router();

router.get("/:id", getCourse);
router.get("/:categoryId/category", getCoursesByCategory);
router.get("/", getCourses);

router.use(isAdmin)
router.post("/bulk", bulkDeleteCourses);
router.post("/", upload.single("image"), createCourse);
router.put("/:id", upload.single("image"), updateCourse);
router.put("/:id/details", updateCourseDetails);
router.delete("/:id", deleteCourse);

export default router;
