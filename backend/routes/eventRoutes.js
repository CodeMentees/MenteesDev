import express from "express";
import isAdmin from '../middlewares/isAdmin.js';
import {
  addEvent,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();
router.use(isAdmin)
router.post("/", addEvent);
router.get("/:id", getEvent);
router.get("/", getAllEvents);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
