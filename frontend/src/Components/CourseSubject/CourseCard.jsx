import React, { useRef, useEffect } from 'react';
import { Link } from "react-router-dom";

function CourseCard({ course, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        observer.unobserve(el); // animate ONCE only — fixes repeat animation bug
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col h-full rounded-2xl p-5 group"
      style={{
        background: "rgb(var(--surface))",
        border: "1px solid rgba(var(--border))",
        opacity: 0,
        transform: "translateY(20px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, border-color 0.25s ease, box-shadow 0.25s ease`,
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
      {/* Header: image + name */}
      <div className="flex items-center gap-3 mb-4">
        {course.image && (
          <img
            className="h-10 w-10 object-contain rounded-lg"
            style={{ background: "rgba(249,115,22,0.08)", padding: "6px" }}
            src={course.image}
            alt={course.name}
            loading="lazy"
          />
        )}
        <h3
          className="text-base font-bold leading-snug transition-colors duration-200"
          style={{ color: "rgb(var(--text-primary))" }}
        >
          {course.name}
        </h3>
      </div>

      {/* Tags */}
      {course.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag">
              {typeof tag === "string" ? tag : tag.label}
            </span>
          ))}
        </div>
      )}

      {/* Feature list */}
      {course.features?.length > 0 && (
        <ul className="space-y-2 mb-5 flex-1">
          {course.features.slice(0, 4).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm"
              style={{ color: "rgb(var(--text-secondary))" }}>
              <svg
                className="shrink-0 w-4 h-4 mt-0.5"
                style={{ color: "rgb(249,115,22)" }}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Divider */}
      <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />

      {/* CTA */}
      <Link
        to={`/courses/${course._id}`}
        className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200"
        style={{ color: "rgb(249,115,22)" }}
      >
        <span>Show Details</span>
        <span className="group-hover:translate-x-1.5 transition-transform duration-200 inline-block">→</span>
      </Link>
    </div>
  );
}

export default CourseCard;
