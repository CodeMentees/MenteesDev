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

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
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
