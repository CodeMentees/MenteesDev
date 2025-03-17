import Course from "../models/course.js";
import CourseCategory from "../models/courseCategory.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: API for managing courses
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
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
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               module:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid input data
 */
const createCourse = asyncHandler(async (req, res) => {
  const { name, image, category, description, module, price } = req.body;

  if (!name || !category) {
    res.status(400);
    throw new Error("Name and category are required");
  }

  const course = new Course({
    name,
    image,
    category,
    description,
    module,
    price,
  });

  const createdCourse = await course.save();

  res.status(201).json({
    data: createdCourse,
    message: "Course created successfully",
  });
});

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a single course by ID
 *     tags: [Course]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course fetched successfully
 *       404:
 *         description: Course not found
 */
const getCourse = asyncHandler(async (req, res) => {
  console.log(req.params.id)
  const course = await Course.findById(req.params.id).populate("category");
  if (!course) {
    res.status(404).json({ data: null, message: "Course not found" });
    return;
  }

  res.json({ data: course, message: "Course fetched successfully" });
});

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses with pagination
 *     tags: [Course]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of courses per page
 *     responses:
 *       200:
 *         description: Courses fetched successfully
 */

const getCourses = asyncHandler(async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    // Fetch paginated courses
    const courses = await Course.find()
      .populate("category")
      .skip(skip)
      .limit(limit);

    // Get total courses count
    const totalCourses = await Course.countDocuments();

    res.json({
      data: courses,
      currentPage: page,
      totalPages: Math.ceil(totalCourses / limit),
      totalCourses,
      message: "Courses fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update an existing course
 *     tags: [Course]
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
 *               image:
 *                 type: string
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               module:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404).json({ data: null, message: "Course not found" });
    return;
  }

  course.name = req.body.name || course.name;
  course.image = req.body.image || course.image;
  course.category = req.body.category || course.category;
  course.description = req.body.description || course.description;
  course.module = req.body.module || course.module;
  course.price = req.body.price || course.price;

  const updatedCourse = await course.save();
  res.json({ data: updatedCourse, message: "Course updated successfully" });
});

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Course]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404).json({ data: null, message: "Course not found" });
    return;
  }

  await course.deleteOne();
  res.json({ data: null, message: "Course deleted successfully" });
});

/**
 * @swagger
 * /api/course-categories:
 *   get:
 *     summary: Get all course categories
 *     tags: [CourseCategory]
 *     responses:
 *       200:
 *         description: Course categories fetched successfully
 */
const getCourseCategory = asyncHandler(async (req, res) => {
  const coursesCategory = await CourseCategory.find({}).limit(10);
  res.json({
    data: coursesCategory,
    message: "Courses category fetched successfully",
  });
});

/**
 * @swagger
 * /api/courses/{courseId}/details:
 *   put:
 *     summary: Update course details
 *     tags: [Course]
 *     parameters:
 *       - name: courseId
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
 *               details:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Course details updated successfully
 *       404:
 *         description: Course not found
 */
const updateCourseDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { details, features } = req.body;
  const updatedCourse = await Course.findByIdAndUpdate(
    id,
    { $set: { details, features } },
    { new: true, runValidators: true }
  );

  if (!updatedCourse) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  res.status(200).json(updatedCourse);
});

/**
 * @swagger
 * /api/courses/category/{categoryId}:
 *   get:
 *     summary: Get courses by category
 *     tags: [Course]
 *     parameters:
 *       - name: categoryId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Courses fetched successfully
 */
const getCoursesByCategory = asyncHandler(async (req, res) => {
  let { categoryId } = req.params;
  const courses = await Course.find({
    category: new mongoose.Types.ObjectId(categoryId),
  })
    .populate("category")
    .limit(10);

  res.json({ data: courses, message: "Courses fetched successfully" });
});

export {
  createCourse,
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getCourseCategory,
  updateCourseDetails,
  getCoursesByCategory,
};
