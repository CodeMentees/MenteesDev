import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  createCourse,
  getMyCourses,
  deleteCourse
} from "../../services/courseService";
import EditCourseModal from "../../components/EditCourseModal";

export default function MentorDashboard() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
    techStack: "",
    includes: "",
    price: "",
  });

  const [courses, setCourses] = useState([]);

  const [coursesLoading, setCoursesLoading] = useState(false);

  const [error, setError] = useState("");

  const [editingCourse, setEditingCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      setCoursesLoading(true);
      const res = await getMyCourses();
      setCourses(res.courses || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch courses");
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      fetchCourses();
    } catch (err) {
      setError(err.message || "Failed to delete course");
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
  };

  const handleCloseEditModal = () => {
    setEditingCourse(null);
  };

  const handleSaveEdit = () => {
    fetchCourses();
    setEditingCourse(null);
  };

  const { user, loading: authLoading } = useAuth();
  useEffect(() => {
    if (!authLoading && user) {
      fetchCourses();
    }
  }, [authLoading, user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createCourse({
        title: form.title.trim(),
        description: form.description.trim(),
        duration: form.duration.trim(),
        level: form.level,
        techStack: form.techStack.split(",").map((item) => item.trim()).filter(Boolean),
        includes: form.includes.split(",").map((item) => item.trim()).filter(Boolean),
        price: Number(form.price)
      });

      setForm({
        title: "",
        description: "",
        duration: "",
        level: "",
        techStack: "",
        includes: "",
        price: ""
      });

      fetchCourses();
    } catch (err) {
      setError(err.message || "Course creation failed");
    }
  };

  return (

    <div className="space-y-8 fade-in">

      {/* CREATE FORM */}
      <div className="panel">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Create Onboarding Path</h1>
          <span className="badge-soft">Manager Tools</span>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input
            name="title"
            placeholder="Path Title"
            className="input"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Path Description"
            className="input md:col-span-2"
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="duration"
            placeholder="Duration (e.g. 8 weeks)"
            className="input"
            value={form.duration}
            onChange={handleChange}
            required
          />

          <select
            name="level"
            className="input"
            value={form.level}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Level
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <input
            name="techStack"
            placeholder="Tech Stack (comma separated)"
            className="input"
            value={form.techStack}
            onChange={handleChange}
            required
          />

          <input
            name="includes"
            placeholder="Includes (comma separated)"
            className="input"
            value={form.includes}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            className="input"
            value={form.price}
            onChange={handleChange}
            required
          />

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="dash-btn">
              Create Path
            </button>
          </div>
        </form>
      </div>

      {/* MY COURSES */}
      <div className="panel">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">My Onboarding Paths</h2>
          <span className="text-xs text-muted">💡 Admin publishes paths</span>
        </div>

        {coursesLoading ? (
          <div className="py-8 text-sm text-muted">Loading onboarding paths...</div>
        ) : courses.length === 0 ? (
          <p>No onboarding paths created yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="dash-card flex flex-col gap-4">
                <h3 className="font-semibold mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-muted mb-3">
                  {course.description}
                </p>
                <div className="text-xs text-muted mb-3">
                  Rs {course.price}
                </div>

                <div className="text-xs mb-4">
                  Status: {course.isPublished ? "Published" : "Draft"}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="btn btn-primary text-sm flex-1"
                  >
                    Edit Content
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course._id)}
                    className="btn btn-secondary text-sm px-4"
                  >
                    Delete
                  </button>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={handleCloseEditModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}