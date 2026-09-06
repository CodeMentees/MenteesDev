import { Router } from "express";
import { trackVisitor, getVisitorStats } from "../controllers/visitorController.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";

const router = Router();

// Tracking is public (called on every page load)
router.post("/track", trackVisitor);
// Stats are displayed in the public Footer, so it must be public
router.get("/stats", getVisitorStats);

export default router;
