import SchoolCourse from "../models/schoolCourse.js";
import asyncHandler from "express-async-handler";

// @desc    Get all school courses
// @route   GET /api/school-courses
// @access  Public
const getSchoolCourses = asyncHandler(async (req, res) => {
    const courses = await SchoolCourse.find({});
    res.json({ data: courses });
});

// @desc    Get single school course
// @route   GET /api/school-courses/:id
// @access  Public
const getSchoolCourseById = asyncHandler(async (req, res) => {
    const course = await SchoolCourse.findById(req.params.id);
    if (course) {
        res.json({ data: course });
    } else {
        res.status(404);
        throw new Error("School Course not found");
    }
});

// @desc    Create a school course
// @route   POST /api/school-courses
// @access  Private/Admin
const createSchoolCourse = asyncHandler(async (req, res) => {
    const { title, description, level, duration, contactHours, language, category, units, syllabus } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const unitsParsed = typeof units === 'string' ? JSON.parse(units) : units;
    const syllabusParsed = typeof syllabus === 'string' ? JSON.parse(syllabus) : syllabus;

    const course = new SchoolCourse({
        title,
        description,
        image,
        level,
        duration,
        contactHours,
        language,
        category,
        units: unitsParsed,
        syllabus: syllabusParsed,
    });

    const createdCourse = await course.save();
    res.status(201).json({ data: createdCourse });
});

// @desc    Update a school course
// @route   PUT /api/school-courses/:id
// @access  Private/Admin
const updateSchoolCourse = asyncHandler(async (req, res) => {
    const { title, description, level, duration, contactHours, language, category, units, syllabus } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const course = await SchoolCourse.findById(req.params.id);

    if (course) {
        course.title = title || course.title;
        course.description = description || course.description;
        course.image = image || course.image;
        course.level = level || course.level;
        course.duration = duration || course.duration;
        course.contactHours = contactHours || course.contactHours;
        course.language = language || course.language;
        course.category = category || course.category;
        course.units = units ? (typeof units === 'string' ? JSON.parse(units) : units) : course.units;
        course.syllabus = syllabus ? (typeof syllabus === 'string' ? JSON.parse(syllabus) : syllabus) : course.syllabus;

        const updatedCourse = await course.save();
        res.json({ data: updatedCourse });
    } else {
        res.status(404);
        throw new Error("School Course not found");
    }
});

// @desc    Delete a school course
// @route   DELETE /api/school-courses/:id
// @access  Private/Admin
const deleteSchoolCourse = asyncHandler(async (req, res) => {
    const course = await SchoolCourse.findById(req.params.id);

    if (course) {
        await course.deleteOne();
        res.json({ message: "School Course removed" });
    } else {
        res.status(404);
        throw new Error("School Course not found");
    }
});

export {
    getSchoolCourses,
    getSchoolCourseById,
    createSchoolCourse,
    updateSchoolCourse,
    deleteSchoolCourse,
};
