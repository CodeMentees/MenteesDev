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
import { requirePermission } from "../middlewares/rbacMiddleware.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";

const router = express.Router();

router.route("/")
  .get(getLiveCourses)
  .post(requirePermission("manage_live"), createLiveCourse);

router.route("/:id")
  .get(getLiveCourseById)
  .put(requirePermission("manage_live"), updateLiveCourse)
  .delete(requirePermission("manage_live"), deleteLiveCourse);

router.route("/:id/content")
  .post(requirePermission("manage_live"), addLiveCourseContent);

router.route("/:id/content/:contentId")
  .put(requirePermission("manage_live"), updateLiveCourseContent)
  .delete(requirePermission("manage_live"), deleteLiveCourseContent);

export default router;
