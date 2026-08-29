import mongoose from "mongoose";

const unitSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const syllabusSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const schoolCourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    contactHours: { type: String, required: true },
    language: { type: String, required: true },
    category: { type: String, required: true },
    units: [unitSchema],
    syllabus: [syllabusSchema],
}, {
    timestamps: true
});

const SchoolCourse = mongoose.model("SchoolCourse", schoolCourseSchema);

export default SchoolCourse;
