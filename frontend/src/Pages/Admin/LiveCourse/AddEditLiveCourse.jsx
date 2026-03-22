import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLiveCourseAPI } from "../../../api/liveCourseApi";

function AddEditLiveCourse() {
  const { fetchLiveCourse, createLiveCourse, updateLiveCourse } = useLiveCourseAPI();
  const { id } = useParams();
  const navigate = useNavigate();

  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    image: "",
    meetLink: "",
    schedule: "",
    liveStatus: false,
    isPremium: true,
    courseType: "live",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initFlowbite();
    if (id) {
      setIsEditing(true);
      fetchDetails(id);
    }
  }, [id]);

  const fetchDetails = async (courseId) => {
    setIsLoading(true);
    try {
      const data = await fetchLiveCourse(courseId);
      setCourseData({
        name: data.name || "",
        description: data.description || "",
        image: data.image || "",
        meetLink: data.meetLink || "",
        schedule: data.schedule ? new Date(data.schedule).toISOString().slice(0, 16) : "",
        liveStatus: data.liveStatus || false,
        isPremium: data.isPremium !== undefined ? data.isPremium : true,
        courseType: data.courseType || "live",
      });
    } catch (error) {
      console.error("Error fetching live course:", error);
      setToast({ visible: true, message: "Error fetching course details", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await updateLiveCourse(id, courseData);
      } else {
        await createLiveCourse(courseData);
      }
      setToast({ visible: true, message: isEditing ? "Live Course updated!" : "Live Course created!", type: "success" });
      setTimeout(() => {
        setToast({ visible: false, message: "", type: "success" });
        navigate("/admin/live-courses");
      }, 2000);
    } catch (error) {
      console.error(error);
      setToast({ visible: true, message: error.response?.data?.message || "Algo went wrong!", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-900 text-white min-h-screen p-6">
      {toast.visible && (
        <div className={`fixed z-50 top-5 right-5 p-4 rounded-lg shadow-md ${toast.type === "error" ? "bg-red-700 text-red-200" : "bg-green-700 text-green-200"}`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-6">{isEditing ? "✏️ Edit Live Course" : "➕ Add Live Course"}</h2>

        {isLoading && !courseData.name && isEditing ? (
          <div className="text-center py-10">Loading course data...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Course Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  value={courseData.name}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                  placeholder="e.g. Master React in 30 Days"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  name="description"
                  required
                  onChange={handleChange}
                  value={courseData.description}
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                  placeholder="Course description..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  required
                  onChange={handleChange}
                  value={courseData.image}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-400 mb-2">Meeting Link (Google Meet / Jio Meet)</label>
                <input
                  type="url"
                  name="meetLink"
                  onChange={handleChange}
                  value={courseData.meetLink}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Next Schedule Time</label>
                <input
                  type="datetime-local"
                  name="schedule"
                  onChange={handleChange}
                  value={courseData.schedule}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Course Category</label>
                <select
                  name="courseType"
                  value={courseData.courseType}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                >
                  <option value="live">Live Interactive Class</option>
                  <option value="recorded">Self-Paced (Recorded)</option>
                </select>
              </div>

              <div className="flex flex-col gap-4 justify-center pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="liveStatus"
                    checked={courseData.liveStatus}
                    onChange={handleChange}
                    className="w-5 h-5 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <span className="text-gray-300 font-medium">Currently Live / Active</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPremium"
                    checked={courseData.isPremium}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-300 font-medium">Premium Course (Requires Full Access)</span>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all"
              >
                {isLoading ? "Saving..." : (isEditing ? "Update Course" : "Create Course")}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/live-courses")}
                className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default AddEditLiveCourse;
