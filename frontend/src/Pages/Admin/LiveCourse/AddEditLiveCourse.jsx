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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "rgb(var(--dash-bg))" }}>
      {toast.visible && (
        <div className={`fixed z-50 top-5 right-5 p-4 rounded-lg shadow-md ${toast.type === "error" ? "bg-red-700 text-red-200" : "bg-green-700 text-green-200"}`}>
          {toast.message}
        </div>
      )}

      <div className="max-w-3xl mx-auto rounded-3xl shadow-xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
        <div className="px-8 py-6" style={{ backgroundColor: "rgb(var(--accent))" }}>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              {isEditing ? "✏️ Edit Live Course" : "➕ Add Live Course"}
            </h2>
        </div>

        {isLoading && !courseData.name && isEditing ? (
          <div className="text-center py-10" style={{ color: "rgb(var(--text-secondary))" }}>Loading course data...</div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Course Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  value={courseData.name}
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                  placeholder="e.g. Master React in 30 Days"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Description</label>
                <textarea
                  name="description"
                  required
                  onChange={handleChange}
                  value={courseData.description}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                  placeholder="Course description..."
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Image URL</label>
                <input
                  type="url"
                  name="image"
                  required
                  onChange={handleChange}
                  value={courseData.image}
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Meeting Link (Google Meet / Jio Meet)</label>
                <input
                  type="url"
                  name="meetLink"
                  onChange={handleChange}
                  value={courseData.meetLink}
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Next Schedule Time</label>
                <input
                  type="datetime-local"
                  name="schedule"
                  onChange={handleChange}
                  value={courseData.schedule}
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "rgb(var(--text-secondary))" }}>Course Category</label>
                <select
                  name="courseType"
                  value={courseData.courseType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
                  style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
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

            <div className="flex gap-4 pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 py-4 text-white font-bold rounded-xl transition-all transform active:scale-95 disabled:opacity-50 shadow-lg"
                style={{ backgroundColor: "rgb(var(--accent))" }}
              >
                {isLoading ? "Saving..." : (isEditing ? "Update Course" : "Create Course")}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/live-courses")}
                className="flex-1 py-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-xl transition-all shadow-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddEditLiveCourse;
