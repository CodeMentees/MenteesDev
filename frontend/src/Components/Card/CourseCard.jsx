import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/** Color-coded level badge */
const levelColors = {
  Beginner:     { bg: "rgba(34,197,94,0.1)",  text: "rgb(34,197,94)",  border: "rgba(34,197,94,0.22)" },
  Intermediate: { bg: "rgba(249,115,22,0.1)", text: "rgb(249,115,22)", border: "rgba(249,115,22,0.22)" },
  Advanced:     { bg: "rgba(239,68,68,0.1)",  text: "rgb(239,68,68)",  border: "rgba(239,68,68,0.22)" },
};

function CourseCard({ category, courses }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleEnrollClick = (courseId) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      navigate(`/courses/${courseId}`);
    }
  };

  return (
    <div className="mb-10">
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <img
          className="h-8 w-8 object-contain"
          src={category.image}
          alt={category.name}
          loading="lazy"
        />
        <div>
          <h2 className="text-xl font-bold text-white">{category.name}</h2>
          {category.description && (
            <p className="text-sm mt-0.5" style={{ color: "rgb(var(--text-secondary))" }}>
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course, index) => {
          const level = course.level || "Beginner";
          const colors = levelColors[level] || levelColors.Beginner;

          return (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 100}
              className="flex flex-col h-full rounded-2xl p-5 group"
              style={{
                background: "rgb(var(--surface))",
                border: "1px solid rgba(var(--border))",
                transition: "border-color 0.25s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(249,115,22,0.1), 0 2px 8px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(var(--border))";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Course image */}
              {course.image && (
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4">
                  <Link to={`/courses/${course._id}`}>
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
                    />
                  </Link>
                </div>
              )}

              {/* Level badge + duration */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                >
                  {level}
                </span>
                {course.duration && (
                  <span className="text-xs font-medium" style={{ color: "rgb(100,100,100)" }}>
                    ⏱ {course.duration}
                  </span>
                )}
              </div>

              {/* Title */}
              <Link to={`/courses/${course._id}`}>
                <h3
                  className="text-base font-bold leading-snug mb-2 transition-colors duration-200 hover:text-orange-400"
                  style={{ color: "rgb(var(--text-primary))" }}
                >
                  {course.name}
                </h3>
              </Link>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-4 flex-1"
                style={{
                  color: "rgb(var(--text-secondary))",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {course.description ?? "No description available"}
              </p>

              {/* Instructor */}
              {course.instructor && (
                <p className="text-xs mb-3" style={{ color: "rgb(100,100,100)" }}>
                  👤 {course.instructor}
                </p>
              )}

              {/* Tech tags */}
              {course.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.slice(0, 4).map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                  {course.tags.length > 4 && (
                    <span className="tag">+{course.tags.length - 4} more</span>
                  )}
                </div>
              )}

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* CTA row */}
              <div className="flex items-center justify-between">
                <Link
                  to={`/courses/${course._id}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200"
                  style={{ color: "rgb(249,115,22)" }}
                >
                  <span>View Course</span>
                  <span className="group-hover:translate-x-1.5 transition-transform duration-200 inline-block">
                    →
                  </span>
                </Link>
                <button
                  onClick={() => handleEnrollClick(course._id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    background: "rgba(249,115,22,0.12)",
                    color: "rgb(249,115,22)",
                    border: "1px solid rgba(249,115,22,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgb(249,115,22)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(249,115,22,0.12)";
                    e.currentTarget.style.color = "rgb(249,115,22)";
                  }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseCard;