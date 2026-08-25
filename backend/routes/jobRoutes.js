import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import {
  createJob,
  deleteJob,
  getJobs,
  updateJob,
  bulkDeleteJobs,
} from "../controllers/jobController.js";

const router = Router();

// Public routes
router.get("/", getJobs);

// Protected admin routes
router.use(isAdmin);
router.post("/bulk", bulkDeleteJobs);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
