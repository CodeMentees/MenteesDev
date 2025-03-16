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
  try {
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
  } catch (error) {
    res.status(400).json({ data: null, message: error.message });
  }
});

export { createCategory };
