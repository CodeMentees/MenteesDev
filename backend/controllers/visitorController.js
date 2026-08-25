import asyncHandler from "express-async-handler";
import Visitor from "../models/visitorModel.js";

// @desc    Track a new visitor for today
// @route   POST /api/visitors/track
// @access  Public
const trackVisitor = asyncHandler(async (req, res) => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  // Increment today's count, create if it doesn't exist
  await Visitor.findOneAndUpdate(
    { date: today },
    { $inc: { count: 1 } },
    { upsert: true, new: true }
  );

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
