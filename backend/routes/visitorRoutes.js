import { Router } from "express";
import { trackVisitor, getVisitorStats } from "../controllers/visitorController.js";

const router = Router();

router.post("/track", trackVisitor);
router.get("/stats", getVisitorStats);

export default router;
