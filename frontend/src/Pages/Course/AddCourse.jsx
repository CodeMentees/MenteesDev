import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourse } from "../../api/courseApi";
import Toast from "../../Components/UI/Toast";
import { BookOpen, Tag, DollarSign, List, Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


function AddCourse() {
  const { createCourse, fetchCourse, updateCourse } = useCourse();
  const { fetchCategories: getCourseCategories } = useCategoryAPI();
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgb(var(--dash-bg))" }}>
      <Toast visible={toast.visible} message={toast.message} />
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/admin/courses")}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to list
        </button>

        <div className="rounded-3xl shadow-xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
          <div className="px-8 py-6" style={{ backgroundColor: "rgb(var(--accent))" }}>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <BookOpen />
              {id ? "Update Course" : "Create a Course"}
            </h2>
          </div>

          <form className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <BookOpen size={16} className="text-blue-500" />
                Course Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Full Stack Web Development"
                value={courseData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <ImageIcon size={16} className="text-purple-500" />
                Course Cover Image
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={courseData.image}
                  onChange={handleChange}
                  className="flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                />
                <label className="cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-xl flex items-center justify-center transition-colors font-semibold shadow-lg">
                  Upload File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <DollarSign size={16} className="text-green-500" />
                  Price (Optional)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 4999"
                  value={courseData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <List size={16} className="text-orange-500" />
                  Category
                </label>
                <select
                  name="category"
                  value={courseData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Tag size={16} className="text-pink-500" />
                Description
              </label>
              <textarea
                name="description"
                placeholder="Write a brief overview of the course..."
                value={courseData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 py-4 text-white font-bold rounded-xl transition-all transform active:scale-95 shadow-lg"
                style={{ backgroundColor: "rgb(var(--accent))" }}
              >
                <Save size={20} />
                {id ? "Update Course" : "Create Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
