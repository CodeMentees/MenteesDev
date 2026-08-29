import express from "express";
import {
  createLead,
  getLeads,
  deleteLead,
  updateLeadStatus,
} from "../controllers/schoolCodingLeadController.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", isAuthenticated, requirePermission("manage_queries"), getLeads);
router.delete("/:id", isAuthenticated, requirePermission("manage_queries"), deleteLead);
router.patch("/:id/status", isAuthenticated, requirePermission("manage_queries"), updateLeadStatus);

export default router;
