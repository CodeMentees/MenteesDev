import { Router } from "express";
import { requirePermission } from "../middlewares/rbacMiddleware.js";
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
router.use(requirePermission("manage_careers"));
router.post("/bulk", bulkDeleteJobs);
router.post("/", createJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
