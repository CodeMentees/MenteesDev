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
  const { name, category, description, modules, details, tags, price, seo } = req.body;
  let image = req.file ? req.file.path : req.body.image;

  // Defensive check for image field
  if (image && typeof image === 'object' && Object.keys(image).length === 0) {
    image = "";
  }

  if (!name || !category || !image) {
    res.status(400);
    throw new Error("Name, category, and image are required");
  }

  const modulesParsed = typeof modules === 'string' ? JSON.parse(modules) : modules;
  const detailsParsed = typeof details === 'string' ? JSON.parse(details) : details;
  const tagsParsed = typeof tags === 'string' ? JSON.parse(tags) : tags;

  const course = new Course({
    name,
    image,
    category,
    description,
    modules: modulesParsed,
    details: detailsParsed,
    tags: tagsParsed,
    price,
    seo: typeof seo === 'string' ? JSON.parse(seo) : seo,
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
  course.image = req.file ? req.file.path : (req.body.image || course.image);
  course.category = req.body.category || course.category;
  course.description = req.body.description || course.description;
  course.modules = req.body.modules ? (typeof req.body.modules === 'string' ? JSON.parse(req.body.modules) : req.body.modules) : course.modules;
  course.details = req.body.details ? (typeof req.body.details === 'string' ? JSON.parse(req.body.details) : req.body.details) : course.details;
  course.tags = req.body.tags ? (typeof req.body.tags === 'string' ? JSON.parse(req.body.tags) : req.body.tags) : course.tags;
  course.price = req.body.price || course.price;
  if (req.body.seo) course.seo = typeof req.body.seo === 'string' ? JSON.parse(req.body.seo) : req.body.seo;

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
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    await course.deleteOne();
    res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to delete course" });
  }
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

  res.status(200).json({ success: true, data: updatedCourse, message: "Course details updated successfully" });
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
const bulkDeleteCourses = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ message: "Invalid payload" });
  }
  await Course.deleteMany({ _id: { $in: ids } });
  res.json({ message: "Courses deleted successfully" });
});

export {
  createCourse,
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  updateCourseDetails,
  getCoursesByCategory,
  bulkDeleteCourses,
};
