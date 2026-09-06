import express from "express";
import { requirePermission } from '../middlewares/rbacMiddleware.js';
import { cachePublic } from '../middlewares/cacheMiddleware.js';
import {
  addEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { getEventGallery } from "../controllers/eventGalleryController.js";

const router = express.Router();
router.get("/gallery", cachePublic(60, 300), getEventGallery);
router.get("/:id", cachePublic(120, 600), getEvent);
router.get("/", cachePublic(60, 300), getAllEvents);
router.use(requirePermission("manage_content"))
router.post("/", addEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
