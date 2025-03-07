import Course from "../models/course.js";
import CourseCategory from "../models/courseCategory.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Create Course
const createCourse = asyncHandler(async (req, res) => {
  const { name, image, category, description, module, price } = req.body;

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

// Get Single Course
const getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate("category");

  if (!course) {
    res.status(404).json({ data: null, message: "Course not found" });
    return;
  }

  res.json({ data: course, message: "Course fetched successfully" });
});

// Get All Courses
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find().populate("category").limit(10);
  res.json({ data: courses, message: "Courses fetched successfully" });
});

// Update Course
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

// Delete Course
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    res.status(404).json({ data: null, message: "Course not found" });
    return;
  }

  await course.deleteOne();
  res.json({ data: null, message: "Course deleted successfully" });
});

// Get Course Category
const getCourseCategory = asyncHandler(async (req, res) => {
  const coursesCategory = await CourseCategory.find({}).limit(10);
  res.json({
    data: coursesCategory,
    message: "Courses category fetched successfully",
  });
});

// Update Course Details
const updateCourseDetails = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const { details, features } = req.body;

  const updatedCourse = await Course.findByIdAndUpdate(
    courseId,
    { $set: { details, features } },
    { new: true, runValidators: true }
  );

  if (!updatedCourse) {
    res.status(404).json({ message: "Course not found" });
    return;
  }

  res.status(200).json(updatedCourse);
});

// Get Courses By Category
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
