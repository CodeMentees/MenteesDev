import express from "express";
import multer from "multer";
import isAdmin from "../middlewares/isAdmin.js";
import { sendBulkMail } from "../controllers/bulkMailController.js";

const router = express.Router();

const SIZE_25MB = 25 * 1024 * 1024;
const SIZE_100MB = 100 * 1024 * 1024; // Accept large files — compression happens in controller

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: SIZE_100MB },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed as attachments."), false);
    }
  },
});

// Wrap multer so its errors return clean JSON
const uploadMiddleware = (req, res, next) => {
  upload.single("brochure")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "PDF is too large. Maximum upload size is 100 MB (will be compressed to ≤ 25 MB before sending).",
        });
      }
      return res.status(400).json({
        success: false,
        message: err.message || "File upload error.",
      });
    }
    next();
  });
};

router.post("/send", isAdmin, uploadMiddleware, sendBulkMail);

export default router;
