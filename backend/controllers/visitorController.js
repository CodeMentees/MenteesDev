import asyncHandler from "express-async-handler";
import Visitor from "../models/visitorModel.js";
import { randomUUID } from "crypto";

// @desc    Track a new visitor for today (session/IP-based deduplication)
// @route   POST /api/visitors/track
// @access  Public
const trackVisitor = asyncHandler(async (req, res) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // 1. Resolve visitor identity: prefer our session cookie, fallback to IP
  let visitorId = req.cookies?._vid;
  const isNewSession = !visitorId;

  if (isNewSession) {
    // Generate a new unique visitor ID
    visitorId = randomUUID();
  }

  // 2. Safely add this visitorId and increment count
  // First, ensure the document exists for today to avoid upsert conflicts with $ne
  await Visitor.updateOne(
    { date: today },
    { $setOnInsert: { count: 0, visitors: [] } },
    { upsert: true }
  );

  // Then, only add the visitor and increment if they aren't already in the array
  await Visitor.updateOne(
    { date: today, visitors: { $ne: visitorId } },
    {
      $addToSet: { visitors: visitorId },
      $inc: { count: 1 },
    }
  );

  // 3. Set / refresh the session cookie (httpOnly, 24h, SameSite=Lax)
  res.cookie("_vid", visitorId, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ success: true, message: "Visitor tracked" });
});

// @desc    Get visitor stats
// @route   GET /api/visitors/stats
// @access  Public
const getVisitorStats = asyncHandler(async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  const todayRecord = await Visitor.findOne({ date: today });
  const todayCount = todayRecord ? todayRecord.count : 0;

  const totalRecord = await Visitor.aggregate([
    { $group: { _id: null, total: { $sum: "$count" } } },
  ]);
  const totalCount = totalRecord.length > 0 ? totalRecord[0].total : 0;

  res.status(200).json({
    success: true,
    data: {
      todayVisitors: todayCount,
      totalVisitors: totalCount,
    },
  });
});

export { trackVisitor, getVisitorStats };
