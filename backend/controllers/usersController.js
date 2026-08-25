import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// 🛡️ Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// 🛠️ Validate Email Format
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 */
const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate Input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password before saving
    const hashedPassword = await hashPassword(password);

    // Create User
    const user = new User({ name, email, password: hashedPassword });
    const createdUser = await user.save();

    // Return user data with token
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Soft delete a user
 */
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Protection: Prevent admin from deleting themselves
    if (req.userId && req.userId.toString() === user._id.toString()) {
      return res.status(400).json({ message: "Action denied: You cannot delete your own admin account." });
    }

    // Hard delete: remove user from database
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: `User ${user.name} deleted permanently` });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(400).json({ message: error.message || "An error occurred while deleting the user" });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user details by ID
 */
const getUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user details
 */
const updateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.isFullAccess !== undefined) {
      user.isFullAccess = req.body.isFullAccess;
    }

    // Hash new password if provided
    if (req.body.password) {
      user.password = await hashPassword(req.body.password);
    }

    const updatedUser = await user.save();
    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users with pagination
 */
const getUsers = asyncHandler(async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    // Exclude passwords from response
    const users = await User.find({})
      .select("-password")
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({});

    res.json({
      data: users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/users/bulk:
 *   post:
 *     summary: Bulk delete users
 *     tags: [Users]
 */
const bulkDeleteUsers = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: "No user IDs provided" });
  }

  // Prevent deleting self if admin
  if (req.userId && ids.includes(req.userId.toString())) {
    return res.status(400).json({ message: "Action denied: You cannot delete your own admin account in bulk." });
  }

  try {
    await User.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Users deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to delete users" });
  }
});

/**
 * @swagger
 * /api/users/growth:
 *   get:
 *     summary: Get user growth over the last 7 days
 *     tags: [Users]
 */
const getUserGrowth = asyncHandler(async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const users = await User.find({
      createdAt: { $gte: sevenDaysAgo, $lte: today },
    }).select("createdAt");

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const growthData = {};

    // Initialize array of last 7 days
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dayName = days[d.getDay()];
      growthData[dayName] = 0;
    }

    // Populate data
    users.forEach((user) => {
      const d = new Date(user.createdAt);
      const dayName = days[d.getDay()];
      if (growthData[dayName] !== undefined) {
        growthData[dayName]++;
      }
    });

    const result = Object.keys(growthData).map(key => ({
      name: key,
      users: growthData[key],
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { createUser, deleteUser, getUser, getUsers, updateUser, bulkDeleteUsers, getUserGrowth };
