import rateLimit from "express-rate-limit";
import mongoose from "mongoose";

// Schema for blocked IPs
const blockedIpSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now },
});

const BlockedIp = mongoose.model("BlockedIp", blockedIpSchema);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  handler: async (req, res) => {
    const ip = req.ip;

    // Block the IP permanently by saving it to the database
    try {
      await BlockedIp.create({ ip });
      res.status(429).json({
        success: false,
        message: "Too many requests. Your IP has been blocked.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error while blocking IP.",
      });
    }
  },
});

// Middleware to check if IP is blocked
const checkBlockedIp = async (req, res, next) => {
  const ip = req.ip;

  try {
    const isBlocked = await BlockedIp.findOne({ ip });
    if (isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your IP has been blocked due to excessive requests.",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while checking blocked IPs.",
    });
  }
};

// Combine both middlewares into one reusable middleware
export const ipBlockMiddleware = [checkBlockedIp, limiter];

export default BlockedIp;