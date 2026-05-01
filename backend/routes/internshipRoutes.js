import express from "express";
import multer from "multer";
import { 
  applyForInternship, 
  getInternships, 
  updateInternship, 
  deleteInternship 
} from "../controllers/internshipController.js";

const router = express.Router();

// Configure multer for memory storage since we upload directly to Cloudinary
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

router.post("/apply", upload.single("resume"), applyForInternship);
router.get("/", getInternships);
router.put("/:id", updateInternship);
router.delete("/:id", deleteInternship);

export default router;
