import { Router } from "express";
import { createQuery, deleteQuery, getQuery, getQueries, updateQuery } from "../controllers/queryController.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";
import { ipBlockMiddleware } from "../middlewares/ipBlockMiddleware.js";

const router = Router();

// Define routes
router.post("/",ipBlockMiddleware, createQuery);
router.use(requirePermission("manage_queries"))
router.get("/", getQueries);
router.get("/:id", getQuery);
router.put("/:id", updateQuery);
router.delete("/:id", deleteQuery);

export default router;
