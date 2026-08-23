import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourse } from "../../api/courseApi";
import { useCategoryAPI } from "../../api/categoryApi";
import Toast from "../../Components/UI/Toast";


function AddCourse() {
  const { createCourse, fetchCourse, updateCourse } = useCourse();
  const { fetchCategories: getCourseCategories } = useCategoryAPI();
  const { id } = useParams();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const [courseData, setCourseData] = useState({
    name: "",
    image: "",
    tags: ["Online"],
    price: "",
    category: "",
    description: "",
    modules: [],
    details: [],
  });
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    initFlowbite();
    fetchCategoriesData();
    if (id) fetchCourseDetails();
  }, [id]);

  const fetchCategoriesData = async () => {
    try {
      const resp = await getCourseCategories()
      setCategories(resp.categories);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const fetchCourseDetails = async () => {
    const data = await fetchCourse(id)
    setCourseData(data)
  };

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setCourseData({ ...courseData, image: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.keys(courseData).forEach(key => {
      if (['modules', 'details', 'tags'].includes(key)) {
        formData.append(key, JSON.stringify(courseData[key]));
      } else if (key === 'image') {
        if (imageFile) {
          formData.append('image', imageFile);
        } else {
          formData.append('image', courseData.image);
        }
      } else {
        formData.append(key, courseData[key]);
      }
    });

    try {
      if (id) {
        let updated = await updateCourse(id, formData)
        if (updated) {
          setToast({ visible: true, message: "Course Updated Successfully", type: "success" });
        }
      } else {
        await createCourse(formData)
        setToast({ visible: true, message: "Course Created Successfully", type: "success" });
      }
    } catch (error) {
      console.error("Error saving course:", error);
      setToast({ visible: true, message: "Error saving course", type: "danger" });
    }
  };

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <Toast visible={toast.visible} message={toast.message} />
      <div
        className="rounded-2xl p-8"
        style={{
          background: "rgb(var(--dash-panel))",
          border: "1px solid rgba(var(--dash-border))",
        }}
      >
        <h2 className="mb-6 text-2xl font-bold" style={{ color: "rgb(var(--dash-ink))" }}>
          {id ? "Update Course" : "Create a Course"}
        </h2>
        <form className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={courseData.name}
            onChange={handleChange}
            className="border rounded-lg p-2.5 w-full text-sm focus:ring-2 focus:outline-none"
            style={{
              background: "rgba(var(--dash-border), 0.3)",
              borderColor: "rgba(var(--dash-border))",
              color: "rgb(var(--dash-ink))",
            }}
          />
          <div className="flex gap-2">
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={courseData.image}
              onChange={handleChange}
            className="flex-1 border rounded-lg p-2.5 text-sm focus:ring-2 focus:outline-none"
            style={{
              background: "rgba(var(--dash-border), 0.3)",
              borderColor: "rgba(var(--dash-border))",
              color: "rgb(var(--dash-ink))",
            }}
            />
            <label className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center justify-center transition-colors font-semibold">
              Upload
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={courseData.price}
            onChange={handleChange}
            className="border rounded-lg p-2.5 w-full text-sm focus:ring-2 focus:outline-none"
            style={{
              background: "rgba(var(--dash-border), 0.3)",
              borderColor: "rgba(var(--dash-border))",
              color: "rgb(var(--dash-ink))",
            }}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={courseData.description}
            onChange={handleChange}
            className="border rounded-lg p-2.5 w-full text-sm focus:ring-2 focus:outline-none"
            style={{
              background: "rgba(var(--dash-border), 0.3)",
              borderColor: "rgba(var(--dash-border))",
              color: "rgb(var(--dash-ink))",
            }}
          ></textarea>
          <select
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="border rounded-lg p-2.5 w-full text-sm focus:ring-2 focus:outline-none"
            style={{
              background: "rgba(var(--dash-border), 0.3)",
              borderColor: "rgba(var(--dash-border))",
              color: "rgb(var(--dash-ink))",
            }}
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
          className="mt-5 px-6 py-3 font-bold rounded-xl text-white w-full transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}
        >
          {id ? "Update Course" : "Create Course"}
        </button>
      </div>
    </section>
  );
}

export default AddCourse;
