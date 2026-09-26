import CareerApplication from "../models/careerApplication.js";
import Career from "../models/career.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { cloudinary } from "../config/cloudinaryConfig.js";
import stream from "stream";

/**
 * Helper to upload a file buffer to Cloudinary
 */
const uploadToCloudinary = (fileObject) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "Careers",
        resource_type: "image",
        format: "jpg", // Force conversion to JPG image to bypass raw PDF delivery blocks
        public_id: `Resume_${Date.now()}_${fileObject.originalname.replace(/\s+/g, '_')}`,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    bufferStream.pipe(uploadStream);
  });
};

/**
 * @swagger
 * /api/careers:
 *   get:
 *     summary: Get all careers
 *     tags: [Careers]
 */
export const getCareers = asyncHandler(async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json({ data: careers, message: "Careers retrieved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch careers." });
  }
});

/**
 * @swagger
 * /api/careers:
 *   post:
 *     summary: Create a new career
 *     tags: [Careers]
 */
export const createCareer = asyncHandler(async (req, res) => {
  try {
    const { title, icon, description, color, isActive, stipend, preferredBackground, jobType } = req.body;
    
    if (!title || !icon || !description) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const career = new Career({
      title,
      icon,
      description,
      color: color || "from-blue-500 to-cyan-400",
      isActive: isActive !== undefined ? isActive : true,
      stipend: stipend || "",
      preferredBackground: preferredBackground || "",
      jobType: jobType || "Internship",
    });

    await career.save();

    res.status(201).json({
      message: "Career created successfully!",
      data: career,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create career." });
  }
});

/**
 * @swagger
 * /api/careers/{id}:
 *   put:
 *     summary: Update a career
 *     tags: [Careers]
 */
export const updateCareer = asyncHandler(async (req, res) => {
  try {
    const { title, icon, description, color, isActive, stipend, preferredBackground, jobType } = req.body;
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({ message: "Career not found" });
    }

    career.title = title || career.title;
    career.icon = icon || career.icon;
    career.description = description || career.description;
    career.color = color || career.color;
    career.stipend = stipend !== undefined ? stipend : career.stipend;
    career.preferredBackground = preferredBackground !== undefined ? preferredBackground : career.preferredBackground;
    career.jobType = jobType || career.jobType;
    if (isActive !== undefined) career.isActive = isActive;

    const updatedCareer = await career.save();
    res.json({ message: "Career updated successfully", data: updatedCareer });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update career." });
  }
});

/**
 * @swagger
 * /api/careers/{id}:
 *   delete:
 *     summary: Delete a career
 *     tags: [Careers]
 */
export const deleteCareer = asyncHandler(async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({ message: "Career not found" });
    }

    await career.deleteOne();
    res.json({ message: "Career removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete career." });
  }
});

/**
 * @swagger
 * /api/careers/apply:
 *   post:
 *     summary: Apply for Career
 *     tags: [Careers]
 */
export const applyForCareer = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, college, techStack } = req.body;
    
    if (!name || !email || !phone || !college || !techStack) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    let resumeDriveLink = "";

    if (req.file) {
      try {
        const link = await uploadToCloudinary(req.file);
        if (link) {
          resumeDriveLink = link;
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
      }
    }

    const application = new CareerApplication({
      name,
      email,
      phone,
      college,
      techStack,
      resumeDriveLink,
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully!",
      data: application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to submit application." });
  }
});

/**
 * @swagger
 * /api/careers/applications:
 *   get:
 *     summary: Get all career applications
 *     tags: [Careers]
 */

export const getCareerApplications = asyncHandler(async (req, res) => {
  try {
    const applications = await CareerApplication.find().sort({ createdAt: -1 });
    res.json({ data: applications, message: "Applications retrieved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch applications." });
  }
});

/**
 * @swagger
 * /api/careers/applications/{id}:
 *   put:
 *     summary: Update a career application
 *     tags: [Careers]
 */
export const updateCareerApplication = asyncHandler(async (req, res) => {
  try {
    const { name, phone, college, techStack } = req.body;
    const application = await CareerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.name = name || application.name;
    application.phone = phone || application.phone;
    application.college = college || application.college;
    application.techStack = techStack || application.techStack;

    const updatedApplication = await application.save();
    res.json({ message: "Application updated successfully", data: updatedApplication });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to update application." });
  }
});

/**
 * @swagger
 * /api/careers/applications/{id}:
 *   delete:
 *     summary: Delete a career application
 *     tags: [Careers]
 */
export const deleteCareerApplication = asyncHandler(async (req, res) => {
  try {
    const application = await CareerApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.deleteOne();
    res.json({ message: "Application removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete application." });
  }
});

/**
 * @swagger
 * /api/careers/applications/bulk:
 *   post:
 *     summary: Bulk delete career applications
 *     tags: [Careers]
 */
export const bulkDeleteCareerApplications = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: "No application IDs provided" });
  }

  try {
    await CareerApplication.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: "Applications deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete applications" });
  }
});

/**
 * @swagger
 * /api/careers/my-applications:
 *   get:
 *     summary: Get logged in user's career applications
 *     tags: [Careers]
 */
export const getMyCareerApplications = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.email) {
      return res.status(401).json({ message: "Not authorized or email not found" });
    }
    const applications = await CareerApplication.find({ email: user.email }).sort({ createdAt: -1 });
    res.json({ data: applications, message: "Applications retrieved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch applications." });
  }
});
