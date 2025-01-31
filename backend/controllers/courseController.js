import Course from "../models/course.js";
import CourseCategory from "../models/courseCategory.js";
import asyncHandler from "express-async-handler";

// Create Course
const createCourse = asyncHandler(async (req, res) => {
  const couseCat = await new CourseCategory();
  try {
    const { name, image, category, description, module } = req.body;

    const course = new Course({ name, image, category, description, module });
    const createdCourse = await course.save();

    res.status(201).json({
      data: createdCourse,
      message: "Course created successfully",
    });
  } catch (error) {
    res.status(400).json({ data: null, message: error.message });
  }
});

// Get Single Course
const getCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("category");

    if (!course) {
      res.status(404).json({ data: null, message: "Course not found" });
      return;
    }

    res.json({ data: course, message: "Course fetched successfully" });
  } catch (error) {
    res.status(400).json({ data: null, message: error.message });
  }
});

// Get All Courses
const getCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find().populate("category").limit(10);
    res.json({ data: courses, message: "Courses fetched successfully" });
  } catch (error) {
    res.status(400).json({ data: null, message: error.message });
  }
});

// Update Course
const updateCourse = asyncHandler(async (req, res) => {
  try {
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

    const updatedCourse = await course.save();
    res.json({ data: updatedCourse, message: "Course updated successfully" });
  } catch (error) {
    res.status(400).json({ data: null, message: error.message });
  }
});

// Delete Course
const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      res.status(404).json({ data: null, message: "Course not found" });
      return;
    }

    await course.deleteOne();
    res.json({ data: null, message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ data: null, message: error.message });
  }
});

const getCourseCategory = asyncHandler(async (req, res) => {
  try {
    console.log("opssss")
    const coursesCategory = await CourseCategory.find({}).limit(10);
    res.json({
      data: coursesCategory,
      message: "Courses category fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ data: null, message: error.message });
  }
});

const updateCourseDetails = async (req, res) => {
  const { courseId } = req.params;
  const { details } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $set: { details } },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createCourse,
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  getCourseCategory,
  updateCourseDetails
};
