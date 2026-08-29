import LiveCourse from "../models/liveCourse.js";
import asyncHandler from "express-async-handler";

// @desc    Get all live courses
// @route   GET /api/live-courses
// @access  Public
const getLiveCourses = asyncHandler(async (req, res) => {
  const courses = await LiveCourse.find({});
  res.json(courses);
});

// @desc    Get live course by ID
// @route   GET /api/live-courses/:id
// @access  Public
const getLiveCourseById = asyncHandler(async (req, res) => {
  const course = await LiveCourse.findById(req.params.id);
  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error("Live Course not found");
  }
});

// @desc    Create a live course
// @route   POST /api/live-courses
// @access  Private/Admin
const createLiveCourse = asyncHandler(async (req, res) => {
  const { name, description, image, meetLink, schedule, isPremium, courseType } = req.body;

  const course = new LiveCourse({
    name,
    description,
    image,
    meetLink,
    schedule,
    isPremium,
    courseType: courseType || "live",
    content: [],
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

// @desc    Update a live course
// @route   PUT /api/live-courses/:id
// @access  Private/Admin
const updateLiveCourse = asyncHandler(async (req, res) => {
  const { name, description, image, meetLink, schedule, isPremium, liveStatus, courseType } = req.body;

  const course = await LiveCourse.findById(req.params.id);

  if (course) {
    course.name = name || course.name;
    course.description = description || course.description;
    course.image = image || course.image;
    course.meetLink = meetLink !== undefined ? meetLink : course.meetLink;
    course.schedule = schedule || course.schedule;
    course.isPremium = isPremium !== undefined ? isPremium : course.isPremium;
    course.liveStatus = liveStatus !== undefined ? liveStatus : course.liveStatus;
    course.courseType = courseType || course.courseType;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Live Course not found");
  }
});

// @desc    Delete a live course
// @route   DELETE /api/live-courses/:id
// @access  Private/Admin
const deleteLiveCourse = asyncHandler(async (req, res) => {
  const course = await LiveCourse.findById(req.params.id);

  if (course) {
    await LiveCourse.findByIdAndDelete(req.params.id);
    res.json({ message: "Live Course removed" });
  } else {
    res.status(404);
    throw new Error("Live Course not found");
  }
});

// @desc    Add content to live course
// @route   POST /api/live-courses/:id/content
// @access  Private/Admin
const addLiveCourseContent = asyncHandler(async (req, res) => {
  const { title, url, isPublic, contentType } = req.body;
  const course = await LiveCourse.findById(req.params.id);

  if (course) {
    const newContent = { title, url, isPublic, contentType };
    course.content.push(newContent);
    await course.save();
    res.status(201).json(course);
  } else {
    res.status(404);
    throw new Error("Live Course not found");
  }
});

// @desc    Update content in live course
// @route   PUT /api/live-courses/:id/content/:contentId
// @access  Private/Admin
const updateLiveCourseContent = asyncHandler(async (req, res) => {
  const { title, url, isPublic, contentType } = req.body;
  const course = await LiveCourse.findById(req.params.id);

  if (course) {
    const contentIndex = course.content.findIndex(
      (c) => c._id.toString() === req.params.contentId
    );

    if (contentIndex !== -1) {
      course.content[contentIndex].title = title || course.content[contentIndex].title;
      course.content[contentIndex].url = url || course.content[contentIndex].url;
      course.content[contentIndex].isPublic = isPublic !== undefined ? isPublic : course.content[contentIndex].isPublic;
      course.content[contentIndex].contentType = contentType || course.content[contentIndex].contentType;

      await course.save();
      res.json(course);
    } else {
      res.status(404);
      throw new Error("Content not found");
    }
  } else {
    res.status(404);
    throw new Error("Live Course not found");
  }
});

// @desc    Delete content from live course
// @route   DELETE /api/live-courses/:id/content/:contentId
// @access  Private/Admin
const deleteLiveCourseContent = asyncHandler(async (req, res) => {
  const course = await LiveCourse.findById(req.params.id);

  if (course) {
    course.content = course.content.filter(
      (c) => c._id.toString() !== req.params.contentId
    );
    await course.save();
    res.json({ message: "Content removed" });
  } else {
    res.status(404);
    throw new Error("Live Course not found");
  }
});

export {
  getLiveCourses,
  getLiveCourseById,
  createLiveCourse,
  updateLiveCourse,
  deleteLiveCourse,
  addLiveCourseContent,
  updateLiveCourseContent,
  deleteLiveCourseContent,
};
