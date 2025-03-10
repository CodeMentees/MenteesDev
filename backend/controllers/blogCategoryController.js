import BlogCategory from "../models/blogCategory.js";
import asyncHandler from "express-async-handler";

// Get all blog categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await BlogCategory.find();
  res.status(200).json({ data: categories, message: "Categories fetched successfully" });
});

// Get a single blog category by ID
const getCategory = asyncHandler(async (req, res) => {
  const category = await BlogCategory.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json({ data: category, message: "Category fetched successfully" });
});

// Create a new blog category
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const category = new BlogCategory({ name });
  const createdCategory = await category.save();

  res.status(201).json({
    data: createdCategory,
    message: "Category created successfully",
  });
});

// Update an existing blog category
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await BlogCategory.findByIdAndUpdate(req.params.id, { name }, { new: true });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({
    data: category,
    message: "Category updated successfully",
  });
});

// Delete a blog category
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await BlogCategory.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({
    data: null,
    message: "Category deleted successfully",
  });
});

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
