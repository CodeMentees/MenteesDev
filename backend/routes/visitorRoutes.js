import { Router } from "express";
import { trackVisitor, getVisitorStats } from "../controllers/visitorController.js";
import { noCache } from "../middlewares/cacheMiddleware.js";

const router = Router();

// Tracking is public (called on every page load)
router.post("/track", trackVisitor);
// Stats are displayed in the public Footer, so it must be public and never cached
router.get("/stats", noCache, getVisitorStats);

export default router;
