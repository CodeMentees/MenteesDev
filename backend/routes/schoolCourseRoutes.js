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

const router = express.Router();

router.route("/")
    .get(getSchoolCourses)
    .post(protect, isAdmin, createSchoolCourse);

router.route("/:id")
    .get(getSchoolCourseById)
    .put(protect, isAdmin, updateSchoolCourse)
    .delete(protect, isAdmin, deleteSchoolCourse);

export default router;
