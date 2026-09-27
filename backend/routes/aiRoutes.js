import express from "express";
import {
  generateCourse,
  saveCourse,
  getBlogQueue,
  addToBlogQueue,
  deleteFromBlogQueue,
  triggerBlogPublishNow,
} from "../controllers/aiController.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";

const router = express.Router();

// Course AI Endpoints
router.post("/generate-course", isAuthenticated, generateCourse);
router.post("/save-course", isAuthenticated, saveCourse);

// Blog Queue AI Endpoints
router.get("/blog-queue", isAuthenticated, getBlogQueue);
router.post("/blog-queue", isAuthenticated, addToBlogQueue);
router.delete("/blog-queue/:id", isAuthenticated, deleteFromBlogQueue);
router.post("/blog-queue/trigger-now", isAuthenticated, triggerBlogPublishNow);

export default router;
