import express from "express";
import {
  gettests,
  gettestById,
  createtest,
  updatetest,
  deletetest,
} from "../controllers/testController.js";

const router = express.Router();
router.get("/", gettests);
router.get("/:id", gettestById);
router.post("/", createtest);
router.put("/:id", updatetest);
router.delete("/:id", deletetest);

export default router;
