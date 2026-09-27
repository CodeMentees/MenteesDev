import express from "express";
import { generatePlan } from "../controllers/planlyController.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";

const router = express.Router();

// POST /api/planly/generate  — generate a personalized placement prep plan
router.post("/generate", isAuthenticated, generatePlan);

export default router;
