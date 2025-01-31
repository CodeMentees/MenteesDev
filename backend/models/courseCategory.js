import mongoose from "mongoose";

const courseCategorySchema = new mongoose.Schema({
    name: String,
    image: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Reference to Course model
});

const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);

export default CourseCategory;