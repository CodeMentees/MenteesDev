import express from "express";
import multer from "multer";
import { requirePermission } from "../middlewares/rbacMiddleware.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";
import { 
  applyForCareer, 
  getCareerApplications, 
  updateCareerApplication, 
  deleteCareerApplication,
  bulkDeleteCareerApplications,
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  getMyCareerApplications
} from "../controllers/careerController.js";

const router = express.Router();

import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads", "resumes");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `Resume_${uniqueSuffix}_${file.originalname.replace(/\s+/g, "_")}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Public Routes
router.get("/", getCareers);
router.post("/apply", upload.single("resume"), applyForCareer);

// Protected Routes (User)
router.get("/my-applications", isAuthenticated, getMyCareerApplications);

// Admin protected routes
router.use(requirePermission("manage_careers"));

// Career CRUD (Admin)
router.post("/", createCareer);
router.put("/:id", updateCareer);
router.delete("/:id", deleteCareer);

// Career Applications Management (Admin)
router.get("/applications", getCareerApplications);
router.put("/applications/:id", updateCareerApplication);
router.delete("/applications/:id", deleteCareerApplication);
router.post("/applications/bulk", bulkDeleteCareerApplications);

export default router;
