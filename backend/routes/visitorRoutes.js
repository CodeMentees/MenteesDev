import { Router } from "express";
import { trackVisitor, getVisitorStats } from "../controllers/visitorController.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";

const router = Router();

// Tracking is public (called on every page load)
router.post("/track", trackVisitor);
// Stats are internal admin data — require manage_site permission
router.get("/stats", requirePermission("manage_site"), getVisitorStats);

export default router;
