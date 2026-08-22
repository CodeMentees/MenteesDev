import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 500 },
  features: { type: [String], default: ["Hello"] },
  tags: {
    type: [String],
    enum: ["Online", "Live", "Classroom"],
    default: ["Online"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseCategory",
    required: true,
  },
  description: String,
  modules: [
    {
      icon: String,
      title: String,
    },
  ],
  details: [
    {
      id: {
        type: String,
        required: false,
      },
      label: {
        type: String,
        required: false,
      },
      content: [
        {
          title: {
            type: String,
            required: false,
          },
          description: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String }
  }
});

courseSchema.index({ name: 1 });
courseSchema.index({ category: 1 });

const Course = mongoose.model("Course", courseSchema);

export default Course;
