import { Router } from "express";
import { createQuery, deleteQuery, getQuery, getQueries, updateQuery } from "../controllers/queryController.js";

const router = Router();

// Define routes
router.get("/", getQueries);
router.get("/:id", getQuery);
router.post("/", createQuery);
router.put("/:id", updateQuery);
router.delete("/:id", deleteQuery);

export default router;
