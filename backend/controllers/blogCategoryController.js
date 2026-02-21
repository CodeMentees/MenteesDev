import BlogCategory from "../models/blogCategory.js";
import asyncHandler from "express-async-handler";

/**
 * @swagger
 * tags:
 *   name: BlogCategory
 *   description: API for managing blog categories
 */

/**
 * @swagger
 * /api/blog-categories:
 *   get:
 *     summary: Get all blog categories
 *     tags: [BlogCategory]
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BlogCategory'
 *                 message:
 *                   type: string
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await BlogCategory.find();
  res.status(200).json({ data: categories, message: "Categories fetched successfully" });
});

/**
 * @swagger
 * /api/blog-categories/{id}:
 *   get:
 *     summary: Get a single blog category by ID
 *     tags: [BlogCategory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/BlogCategory'
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found
 */
const getCategory = asyncHandler(async (req, res) => {
  const category = await BlogCategory.findById(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  res.status(200).json({ data: category, message: "Category fetched successfully" });
});

/**
 * @swagger
 * /api/blog-categories:
 *   post:
 *     summary: Create a new blog category
 *     tags: [BlogCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/BlogCategory'
 *                 message:
 *                   type: string
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }
  const category = new BlogCategory({ name });
  const createdCategory = await category.save();
  res.status(201).json({ data: createdCategory, message: "Category created successfully" });
});

/**
 * @swagger
 * /api/blog-categories/{id}:
 *   put:
 *     summary: Update an existing blog category
 *     tags: [BlogCategory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/BlogCategory'
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found
 */
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await BlogCategory.findByIdAndUpdate(req.params.id, { name }, { new: true });

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({ data: category, message: "Category updated successfully" });
});

/**
 * @swagger
 * /api/blog-categories/{id}:
 *   delete:
 *     summary: Delete a blog category
 *     tags: [BlogCategory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await BlogCategory.findByIdAndDelete(req.params.id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({ data: null, message: "Category deleted successfully" });
});

export { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
