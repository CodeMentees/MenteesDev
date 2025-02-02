import CourseCategory from "../models/courseCategory.js";
import asyncHandler from "express-async-handler";

// Create Course
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name, image, description } = req.body;

    const category = new CourseCategory({ name, image, description });
    const createdCategory = await category.save();

    res.status(201).json({
      data: createdCategory,
      message: "Category created successfully",
    });
  } catch (error) {
    res.status(400).json({ data: null, message: error.message });
  }
});

export {
    createCategory,
  };