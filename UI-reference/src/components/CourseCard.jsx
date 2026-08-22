import { Link, useLocation } from "react-router-dom";
import TechIcon from "../components/TechIcon";
import { techIconMap } from "../utils/techIcons";

const levelColors = {
  Beginner:     { bg: "rgba(34,197,94,0.1)",   text: "rgb(34,197,94)",   border: "rgba(34,197,94,0.2)" },
  Intermediate: { bg: "rgba(249,115,22,0.1)",  text: "rgb(249,115,22)",  border: "rgba(249,115,22,0.2)" },
  Advanced:     { bg: "rgba(239,68,68,0.1)",   text: "rgb(239,68,68)",   border: "rgba(239,68,68,0.2)" },
};

export default function CourseCard({ course }) {
  const location = useLocation();
  const level = course.level || "Beginner";
  const colors = levelColors[level] || levelColors.Beginner;

  return (
    <div className="flex flex-col h-full rounded-2xl p-5 group"
      style={{
        background: "rgb(var(--surface))",
        border: "1px solid rgba(var(--border))",
        transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(249,115,22,0.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(var(--border))";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
          {level}
        </span>
        {course.duration && (
          <span className="text-xs font-medium" style={{ color: "rgb(100,100,100)" }}>
            ⏱ {course.duration}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold leading-snug mb-2 transition-colors duration-200"
        style={{ color: "rgb(var(--text-primary))" }}
        onMouseEnter={e => e.currentTarget.style.color = "rgb(249,115,22)"}
        onMouseLeave={e => e.currentTarget.style.color = "rgb(var(--text-primary))"}>
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "rgb(var(--text-secondary))", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
        {course.description}
      </p>

      {/* Tech tags */}
      {course.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {course.techStack.slice(0, 4).map((tech) => {
            const icon = techIconMap[tech];
            return icon
              ? <TechIcon key={tech} icon={icon} />
              : <span key={tech} className="tag">{tech}</span>;
          })}
          {course.techStack.length > 4 && (
            <span className="tag">+{course.techStack.length - 4} more</span>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.05)" }} />

      {/* CTA */}
      <Link
        to={`/courses/${course.id || course._id}`}
        state={{ backgroundLocation: location }}
        className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors duration-200"
        style={{ color: "rgb(249,115,22)" }}
      >
        <span>View Pathway</span>
        <span className="group-hover:translate-x-1.5 transition-transform duration-200 inline-block">→</span>
      </Link>
    </div>
  );
}
