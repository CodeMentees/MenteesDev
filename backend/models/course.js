import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price :{type : Number, default:500},
  features:{type : [String],default:["Hello"]},
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
      id: mongoose.Schema.Types.ObjectId,
      label: {
        type: String,
        required: true,
      },
      content: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
