import express from "express";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin.js";
import { 
  applyForInternship, 
  getInternships, 
  updateInternship, 
  deleteInternship,
  bulkDeleteInternships
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

// Admin protected routes
router.use(isAdmin);
router.post("/bulk", bulkDeleteInternships);
router.get("/", getInternships);
router.put("/:id", updateInternship);
router.delete("/:id", deleteInternship);

export default router;
