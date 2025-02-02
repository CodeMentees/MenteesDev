import mongoose from "mongoose";

const courseCategorySchema = new mongoose.Schema({
    name: String,
    image: String,
    description : String,
});

const CourseCategory = mongoose.model("CourseCategory", courseCategorySchema);

export default CourseCategory;