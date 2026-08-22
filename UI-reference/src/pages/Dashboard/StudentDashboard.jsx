import { useState, useEffect } from "react";
import { getEnrolledCourses } from "../../services/courseService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await getEnrolledCourses();
      setEnrollments(data.enrollments || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper to calculate progress percent
  const getCourseProgress = (course) => {
    if (!user || !course) return 0;
    const syllabusCount = course.syllabus?.length || 0;
    const contentCount = course.content?.length || 0;
    const totalItems = syllabusCount + contentCount;
    if (totalItems === 0) return 0;

    const storageKey = `onboardai_progress_${user._id || user.id}_${course._id}`;
    const saved = localStorage.getItem(storageKey);
    if (!saved) return 0;

    try {
      const completedIds = JSON.parse(saved);
      const matchedCount = completedIds.filter(id => 
        (course.syllabus || []).some(s => s._id === id) ||
        (course.content || []).some(c => c._id === id)
      ).length;
      return Math.round((matchedCount / totalItems) * 100);
    } catch (e) {
      return 0;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "rgba(249,115,22,0.3)", borderTopColor: "rgb(249,115,22)" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <p className="text-red-700 dark:text-red-400 mb-4">Error: {error}</p>
        <button
          onClick={fetchEnrollments}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Training</h1>
          <p className="text-muted">Welcome! Track your onboarding progress and pathways here.</p>
        </div>
        <Link
          to="/courses"
          className="dash-cta"
        >
          Browse Onboarding Paths
        </Link>
      </div>

      {enrollments.length === 0 ? (
        <div className="panel text-center">
          <div className="text-4xl mb-4">Start your ramp-up</div>
          <h2 className="text-xl font-semibold mb-2">
            No Assigned Onboarding Paths
          </h2>
          <p className="text-muted mb-6">
            Begin by enrolling in an onboarding path or training module.
          </p>
          <Link
            to="/courses"
            className="dash-cta inline-flex justify-center"
          >
            Explore Paths →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => {
            const course = enrollment.course;
            if (!course) return null;

            const progress = getCourseProgress(course);

            return (
              <div
                key={enrollment._id}
                className="dash-card overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="p-4" style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.9), rgba(234,88,12,1))" }}>
                    <h3 className="text-lg font-bold mb-1 truncate text-white">{course.title}</h3>
                    <p className="text-sm text-white/80">
                      by {course.createdBy?.name || "Onboarding Lead"}
                    </p>
                  </div>

                  <div className="p-4 space-y-4">
                    <p className="text-muted text-sm line-clamp-3">
                      {course.description}
                    </p>

                    {course.techStack && course.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {course.techStack.slice(0, 3).map((tech) => (
                          <span key={tech} className="tag">{tech}</span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-muted">
                      Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </p>

                    {enrollment.dueDate && (
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          new Date(enrollment.dueDate) < new Date()
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}>
                          {new Date(enrollment.dueDate) < new Date() ? "⚠️ Overdue:" : "📅 Due:"} {new Date(enrollment.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}

                    {enrollment.assignedByAdmin && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(249,115,22,0.1)", color: "rgb(249,115,22)", border: "1px solid rgba(249,115,22,0.2)" }}>
                        ✓ Assigned by HR
                      </span>
                    )}

                    <div>
                      <div className="flex justify-between text-xs mb-1.5" style={{ color: "rgb(var(--dash-muted))" }}>
                        <span>Progress</span>
                        <span className="font-bold" style={{ color: progress === 100 ? "rgb(34,197,94)" : "rgb(249,115,22)" }}>{progress}%</span>
                      </div>
                      <div className="w-full rounded-full h-1.5" style={{ background: "rgba(var(--dash-border))" }}>
                        <div className="h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%`, background: progress === 100 ? "rgb(34,197,94)" : "rgb(249,115,22)" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => navigate(`/dashboard/student/course/${course._id}`)}
                    className="w-full dash-cta text-center block cursor-pointer"
                  >
                    Resume Pathway
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}