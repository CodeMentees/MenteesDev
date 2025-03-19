import CourseCategory from "../models/courseCategory.js";
import asyncHandler from "express-async-handler";

/**
 * @swagger
 * tags:
 *   name: CourseCategory
 *   description: API for managing course categories
 */

/**
 * @swagger
 * /api/course-categories:
 *   post:
 *     summary: Create a new course category
 *     tags: [CourseCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
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
 *                   $ref: '#/components/schemas/CourseCategory'
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request (e.g., missing required fields)
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }

  const category = new CourseCategory({ name, image, description });
  const createdCategory = await category.save();

  res.status(201).json({
    data: createdCategory,
    message: "Category created successfully",
  });
});

/**
 * @swagger
 * /api/course-categories:
 *   get:
 *     summary: Get all course categories
 *     tags: [CourseCategory]
 *     responses:
 *       200:
 *         description: A list of categories
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await CourseCategory.find();
  res.status(200).json({ categories: categories });
});

/**
 * @swagger
 * /api/course-categories/{id}:
 *   get:
 *     summary: Get a course category by ID
 *     tags: [CourseCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *       404:
 *         description: Category not found
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await CourseCategory.findById(req.params.id);
  if (category) {
    res.status(200).json({ data: category });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

/**
 * @swagger
 * /api/course-categories/{id}:
 *   put:
 *     summary: Update a course category
 *     tags: [CourseCategory]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       404:
 *         description: Category not found
 */
const updateCategory = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body;
  const category = await CourseCategory.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.image = image || category.image;
    category.description = description || category.description;
    const updatedCategory = await category.save();
    res.status(200).json({ data: updatedCategory, message: "Category updated successfully" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

/**
 * @swagger
 * /api/course-categories/{id}:
 *   delete:
 *     summary: Delete a course category
 *     tags: [CourseCategory]
 *     parameters:
 *       - in: path
 *         name: id
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
  const category = await CourseCategory.findById(req.params.id);

  if (category) {
    await category.deleteOne();
    res.status(200).json({ message: "Category deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };
