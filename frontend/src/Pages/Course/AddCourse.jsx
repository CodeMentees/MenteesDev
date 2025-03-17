import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCourse, fetchCourse, fetchCourses, updateCourse } from "../../api/courseApi";
import { fetchBlogCategories } from "../../api/blogCategoryApi";

function AddCourse() {
  const { id } = useParams();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const [courseData, setCourseData] = useState({
    name: "",
    image: "",
    tags: ["Online"],
    price: "",
    category: "",
    description: "",
    modules: [{ icon: "", title: "" }],
    details: [{ label: "", content: [{ title: "", description: "" }] }],
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    initFlowbite();
    fetchCategories();
    if (id) fetchCourseDetails();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const data = await fetchBlogCategories()
      setCategories(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const fetchCourseDetails = async () => {
    const data =  await fetchCourse(id)
    setCourseData(data)
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if(id){
      updateCourse(id,courseData)
    }
    else{
      createCourse(courseData)
    }
  };

  return (
    <section className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
      {toast.visible && (
        <div
          className={`fixed top-5 right-5 p-4 text-sm font-medium rounded-lg shadow-md ${
            toast.type === "error" ? "text-red-400 bg-gray-800 border border-red-500" : "text-green-400 bg-gray-800 border border-green-500"
          }`}
        >
          {toast.message}
        </div>
      )}
      <div className="py-2 px-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-100">
          {id ? "Update Course" : "Create a Course"}
        </h2>
        <form className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={courseData.name}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 text-white p-2 w-full rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={courseData.image}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 text-white p-2 w-full rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={courseData.price}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 text-white p-2 w-full rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={courseData.description}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 text-white p-2 w-full rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          ></textarea>
          <select
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="border border-gray-700 bg-gray-800 text-white p-2 w-full rounded-lg focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </form>
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-dark-btn text-black font-semibold rounded-lg hover:bg-yellow-400 transition w-full"
        >
          {id ? "Update Course" : "Create Course"}
        </button>
      </div>
    </section>
  );
}

export default AddCourse;
