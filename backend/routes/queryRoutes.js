import { Router } from "express";
import { createQuery, deleteQuery, getQuery, getQueries, updateQuery } from "../controllers/queryController.js";
import isAdmin from "../middlewares/isAdmin.js";
import { ipBlockMiddleware } from "../middlewares/ipBlockMiddleware.js";

const router = Router();

// Define routes
router.post("/",ipBlockMiddleware, createQuery);
router.use(isAdmin)
router.get("/", getQueries);
router.get("/:id", getQuery);
router.put("/:id", updateQuery);
router.delete("/:id", deleteQuery);

export default router;
