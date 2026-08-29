import express from "express";
import {
  createLead,
  getLeads,
  deleteLead,
  updateLeadStatus,
} from "../controllers/schoolCodingLeadController.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", isAuthenticated, isAdmin, getLeads);
router.delete("/:id", isAuthenticated, isAdmin, deleteLead);
router.patch("/:id/status", isAuthenticated, isAdmin, updateLeadStatus);

export default router;
