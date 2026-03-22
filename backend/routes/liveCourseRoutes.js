import express from "express";
import {
  getLiveCourses,
  getLiveCourseById,
  createLiveCourse,
  updateLiveCourse,
  deleteLiveCourse,
  addLiveCourseContent,
  updateLiveCourseContent,
  deleteLiveCourseContent,
} from "../controllers/liveCourseController.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";

const router = express.Router();

router.route("/")
  .get(getLiveCourses)
  .post(isAdmin, createLiveCourse);

router.route("/:id")
  .get(getLiveCourseById)
  .put(isAdmin, updateLiveCourse)
  .delete(isAdmin, deleteLiveCourse);

router.route("/:id/content")
  .post(isAdmin, addLiveCourseContent);

router.route("/:id/content/:contentId")
  .put(isAdmin, updateLiveCourseContent)
  .delete(isAdmin, deleteLiveCourseContent);

export default router;
