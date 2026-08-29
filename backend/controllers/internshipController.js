import InternshipApplication from "../models/internshipApplication.js";
import asyncHandler from "express-async-handler";
import { cloudinary } from "../config/cloudinaryConfig.js";
import stream from "stream";

/**
 * Helper to upload a file buffer to Cloudinary
 */
const uploadToCloudinary = (fileObject) => {
  return new Promise((resolve, reject) => {
    // Determine resource_type. PDFs and documents are usually "raw" or "auto"
    // Cloudinary prefers "raw" for PDFs when retaining original file extensions etc.,
    // or "image" if they want to render it, but "auto" is safest.
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "Interns",
        resource_type: "auto",
        public_id: `Resume_${Date.now()}_${fileObject.originalname.replace(/[^a-zA-Z0-9]/g, '_')}`,
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
 * /api/internships/apply:
 *   post:
 *     summary: Apply for Summer Internship
 *     tags: [Internships]
 */
export const applyForInternship = asyncHandler(async (req, res) => {
  try {
    const { name, email, phone, college, techStack } = req.body;
    
    if (!name || !email || !phone || !college || !techStack) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    let resumeDriveLink = "";

    // If there is a file attached (resume), upload it to Cloudinary
    console.log("req.file exists?", !!req.file);
    if (req.file) {
      console.log("req.file details:", req.file.originalname, req.file.mimetype, req.file.size);
      try {
        const link = await uploadToCloudinary(req.file);
        console.log("Uploaded link:", link);
        if (link) {
          resumeDriveLink = link;
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
        // Continue saving application even if resume fails
      }
    }

    // Save text data to MongoDB
    const application = new InternshipApplication({
      name,
      email,
      phone,
      college,
      techStack,
      resumeDriveLink, // Reusing the same field name for DB backwards compatibility, though it's now a Cloudinary link
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
 * /api/internships:
 *   get:
 *     summary: Get all internship applications
 *     tags: [Internships]
 */
export const getInternships = asyncHandler(async (req, res) => {
  try {
    const applications = await InternshipApplication.find().sort({ createdAt: -1 });
    res.json({ data: applications, message: "Applications retrieved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch applications." });
  }
});

/**
 * @swagger
 * /api/internships/{id}:
 *   put:
 *     summary: Update an internship application
 *     tags: [Internships]
 */
export const updateInternship = asyncHandler(async (req, res) => {
  try {
    const { name, phone, college, techStack } = req.body;
    const application = await InternshipApplication.findById(req.params.id);

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
 * /api/internships/{id}:
 *   delete:
 *     summary: Delete an internship application
 *     tags: [Internships]
 */
export const deleteInternship = asyncHandler(async (req, res) => {
  try {
    const application = await InternshipApplication.findById(req.params.id);

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
 * /api/internships/bulk:
 *   post:
 *     summary: Bulk delete internship applications
 *     tags: [Internships]
 */
export const bulkDeleteInternships = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: "No application IDs provided" });
  }

  try {
    await InternshipApplication.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, message: "Applications deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete applications" });
  }
});
