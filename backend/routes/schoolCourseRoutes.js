import express from "express";
import {
    getSchoolCourses,
    getSchoolCourseById,
    createSchoolCourse,
    updateSchoolCourse,
    deleteSchoolCourse,
} from "../controllers/schoolCourseController.js";
import protect from "../middlewares/IsAuthenticate.js";
import isAdmin from "../middlewares/isAdmin.js";

import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";

const upload = multer({ storage });
const router = express.Router();

router.route("/")
    .get(getSchoolCourses)
    .post(protect, isAdmin, upload.single("image"), createSchoolCourse);

router.route("/:id")
    .get(getSchoolCourseById)
    .put(protect, isAdmin, upload.single("image"), updateSchoolCourse)
    .delete(protect, isAdmin, deleteSchoolCourse);

export default router;
