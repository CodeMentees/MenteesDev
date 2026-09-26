import express from "express";
import {
    getSchoolCourses,
    getSchoolCourseById,
    createSchoolCourse,
    updateSchoolCourse,
    deleteSchoolCourse,
} from "../controllers/schoolCourseController.js";
import protect from "../middlewares/IsAuthenticate.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";

import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";

const upload = multer({ storage });
const router = express.Router();

router.route("/")
    .get(getSchoolCourses)
    .post(protect, requirePermission("manage_courses"), upload.single("image"), createSchoolCourse);

router.route("/:id")
    .get(getSchoolCourseById)
    .put(protect, requirePermission("manage_courses"), upload.single("image"), updateSchoolCourse)
    .delete(protect, requirePermission("manage_courses"), deleteSchoolCourse);

export default router;
