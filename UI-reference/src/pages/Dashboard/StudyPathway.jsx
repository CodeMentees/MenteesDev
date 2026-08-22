import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../../services/courseService";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "../../utils/toast";

export default function StudyPathway() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);
  const [completedItems, setCompletedItems] = useState([]);

  const storageKey = user ? `onboardai_progress_${user._id || user.id}_${id}` : null;

  useEffect(() => { fetchCourse(); }, [id]);

  useEffect(() => {
    if (storageKey) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try { setCompletedItems(JSON.parse(saved)); } catch (e) { /* ignore */ }
      }
    }
  }, [storageKey]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const res = await getCourseById(id);
      if (res?.course) {
        setCourse(res.course);
        if (res.course.content?.length > 0) {
          setActiveItem({ type: "content", data: res.course.content[0] });
        } else if (res.course.syllabus?.length > 0) {
          setActiveItem({ type: "syllabus", data: res.course.syllabus[0] });
        }
      } else {
        toast.error("Could not fetch onboarding pathway details.");
      }
    } catch (err) {
      toast.error(err.message || "Failed to load path");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = (itemId) => {
    if (!storageKey) return;
    let updated;
    if (completedItems.includes(itemId)) {
      updated = completedItems.filter((i) => i !== itemId);
      toast.info("Marked as incomplete");
    } else {
      updated = [...completedItems, itemId];
      toast.success("🎉 Section completed!");
    }
    setCompletedItems(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i);
    if (ytMatch?.[1]) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/i);
    if (vMatch?.[3]) return `https://player.vimeo.com/video/${vMatch[3]}`;
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="w-12 h-12 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(249,115,22,0.2)", borderTopColor: "rgb(249,115,22)" }} />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="panel text-center py-12">
        <h2 className="text-xl font-bold mb-2" style={{ color: "rgb(var(--text-primary))" }}>Pathway Not Found</h2>
        <p className="text-sm mb-4" style={{ color: "rgb(var(--text-secondary))" }}>The requested onboarding path does not exist.</p>
        <button className="btn btn-primary" onClick={() => navigate("/dashboard/student")}>Back to Dashboard</button>
      </div>
    );
  }

  const syllabusItems = course.syllabus || [];
  const contentItems = course.content || [];
  const totalItems = syllabusItems.length + contentItems.length;
  const completedCount = completedItems.filter(
    (cid) => syllabusItems.some((s) => s._id === cid) || contentItems.some((c) => c._id === cid)
  ).length;
  const progressPercent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const itemIcon = (type, subtype) =>
    type === "syllabus" ? "📖" : subtype === "video" ? "🎬" : subtype === "text" ? "📝" : "📎";

  const SidebarItem = ({ type, data }) => {
    const isCompleted = completedItems.includes(data._id);
    const isActive = activeItem?.type === type && activeItem?.data?._id === data._id;
    return (
      <button
        onClick={() => setActiveItem({ type, data })}
        className="w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-2 transition-all text-sm"
        style={{
          background: isActive ? "rgba(249,115,22,0.1)" : "transparent",
          borderLeft: isActive ? "3px solid rgb(249,115,22)" : "3px solid transparent",
          color: isActive ? "rgb(249,115,22)" : "rgb(var(--text-primary))",
          fontWeight: isActive ? 600 : 400,
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(var(--border))"; }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0">{itemIcon(type, data.type)}</span>
          <span className="truncate">{data.title}</span>
        </div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => { e.stopPropagation(); handleToggleComplete(data._id); }}
          className="w-4 h-4 shrink-0 cursor-pointer"
          style={{ accentColor: "rgb(249,115,22)" }}
        />
      </button>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6 fade-in">
      {/* HEADER */}
      <div className="panel p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/dashboard/student")}
            className="text-sm font-bold mb-1.5 block transition-colors"
            style={{ color: "rgb(249,115,22)" }}
          >
            ← Back to My Training
          </button>
          <h1 className="text-xl md:text-2xl font-black" style={{ color: "rgb(var(--text-primary))" }}>{course.title}</h1>
          <p className="text-xs md:text-sm mt-1" style={{ color: "rgb(var(--text-secondary))" }}>
            {course.level} · {course.duration}
          </p>
        </div>
        <div className="w-full md:w-56 shrink-0">
          <div className="flex justify-between text-xs font-bold mb-1.5" style={{ color: "rgb(var(--text-secondary))" }}>
            <span>Progress</span>
            <span style={{ color: progressPercent === 100 ? "rgb(34,197,94)" : "rgb(249,115,22)" }}>
              {progressPercent}% · {completedCount}/{totalItems}
            </span>
          </div>
          <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: "rgba(var(--border))" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: progressPercent === 100 ? "rgb(34,197,94)" : "linear-gradient(90deg, rgb(249,115,22), rgb(234,88,12))",
              }}
            />
          </div>
        </div>
      </div>

      {/* TWO COLUMNS — on mobile: content viewer first, syllabus below */}
      <div className="grid lg:grid-cols-12 gap-4 md:gap-6 items-start">

        {/* ── CONTENT VIEWER — 8 cols, always first ─────────────────── */}
        <div className="lg:col-span-8 order-first">
          {activeItem ? (
            <div className="panel p-4 md:p-6 space-y-5">
              {/* Title row */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-default pb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xl shrink-0">{itemIcon(activeItem.type, activeItem.data.type)}</span>
                    <h2 className="text-base md:text-xl font-bold leading-snug" style={{ color: "rgb(var(--text-primary))" }}>
                      {activeItem.data.title}
                    </h2>
                  </div>
                  <p className="text-xs mt-1 uppercase tracking-wider font-semibold" style={{ color: "rgb(var(--text-secondary))" }}>
                    {activeItem.type === "syllabus" ? "Syllabus Concept" : `Module · ${activeItem.data.type}`}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleComplete(activeItem.data._id)}
                  className="text-xs md:text-sm font-bold px-3 py-2 rounded-xl transition-all shrink-0"
                  style={completedItems.includes(activeItem.data._id)
                    ? { background: "rgba(34,197,94,0.1)", color: "rgb(34,197,94)", border: "1px solid rgba(34,197,94,0.25)" }
                    : { background: "rgba(249,115,22,0.1)", color: "rgb(249,115,22)", border: "1px solid rgba(249,115,22,0.3)" }
                  }
                >
                  {completedItems.includes(activeItem.data._id) ? "✓ Done" : "Mark Done"}
                </button>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "rgb(var(--text-primary))" }}>Description</h3>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "rgb(var(--text-secondary))" }}>
                  {activeItem.data.description || "No description provided."}
                </p>
              </div>

              {/* Content media */}
              {activeItem.type === "content" && (
                <div className="space-y-4">
                  {activeItem.data.type === "video" && activeItem.data.videoUrl && (
                    <div>
                      <h3 className="font-bold text-sm mb-2" style={{ color: "rgb(var(--text-primary))" }}>Video Lesson</h3>
                      {getEmbedUrl(activeItem.data.videoUrl) ? (
                        <div className="relative aspect-video rounded-xl overflow-hidden border" style={{ borderColor: "rgba(var(--border))" }}>
                          <iframe
                            src={getEmbedUrl(activeItem.data.videoUrl)}
                            title={activeItem.data.title}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <a href={activeItem.data.videoUrl} target="_blank" rel="noopener noreferrer"
                          className="btn btn-primary text-sm w-full sm:w-auto">
                          ▶ Watch Lesson
                        </a>
                      )}
                    </div>
                  )}

                  {activeItem.data.type === "resource" && activeItem.data.resourceUrl && (
                    <div className="p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      style={{ background: "rgb(var(--surface))", border: "1px solid rgba(var(--border))" }}>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm flex items-center gap-2" style={{ color: "rgb(249,115,22)" }}>
                          📎 Reference Resource
                        </h4>
                        <p className="text-xs mt-1 truncate" style={{ color: "rgb(var(--text-secondary))" }}>
                          {activeItem.data.resourceUrl}
                        </p>
                      </div>
                      <a href={activeItem.data.resourceUrl} target="_blank" rel="noopener noreferrer"
                        className="btn btn-primary text-sm shrink-0 w-full sm:w-auto">
                        📥 Open Resource
                      </a>
                    </div>
                  )}

                  {activeItem.data.type === "text" && activeItem.data.resourceUrl && (
                    <div>
                      <h3 className="font-bold text-sm mb-1.5" style={{ color: "rgb(var(--text-primary))" }}>Link</h3>
                      <a href={activeItem.data.resourceUrl} target="_blank" rel="noopener noreferrer"
                        className="font-semibold hover:underline break-all text-sm"
                        style={{ color: "rgb(249,115,22)" }}>
                        🔗 {activeItem.data.resourceUrl}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Syllabus topics */}
              {activeItem.type === "syllabus" && activeItem.data.topics?.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm mb-3" style={{ color: "rgb(var(--text-primary))" }}>Key Topics</h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {activeItem.data.topics.map((topic, i) => (
                      <div key={i} className="p-3 rounded-xl flex items-center gap-2.5"
                        style={{ background: "rgb(var(--surface))", border: "1px solid rgba(var(--border))" }}>
                        <span className="shrink-0" style={{ color: "rgb(249,115,22)" }}>✔</span>
                        <span className="text-sm" style={{ color: "rgb(var(--text-primary))" }}>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="panel text-center py-16">
              <span className="text-4xl block mb-3">📚</span>
              <p className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                Select a module from the syllabus below to start studying.
              </p>
            </div>
          )}
        </div>

        {/* ── SYLLABUS SIDEBAR — 4 cols, second on mobile ───────────── */}
        <div className="lg:col-span-4 order-last lg:order-none">
          <div className="panel p-4 space-y-3">
            <h2 className="font-bold text-base border-b border-default pb-2.5" style={{ color: "rgb(var(--text-primary))" }}>
              Pathway Syllabus
            </h2>

            {contentItems.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-[10px] font-black uppercase tracking-widest px-1 mb-1" style={{ color: "rgb(var(--text-secondary))" }}>
                  Training Modules
                </h3>
                {contentItems.map((item) => <SidebarItem key={item._id} type="content" data={item} />)}
              </div>
            )}

            {syllabusItems.length > 0 && (
              <div className="space-y-1 pt-1">
                <h3 className="text-[10px] font-black uppercase tracking-widest px-1 mb-1" style={{ color: "rgb(var(--text-secondary))" }}>
                  Concepts & Guides
                </h3>
                {syllabusItems.map((item) => <SidebarItem key={item._id} type="syllabus" data={item} />)}
              </div>
            )}

            {totalItems === 0 && (
              <p className="text-sm text-center py-4" style={{ color: "rgb(var(--text-secondary))" }}>
                No content added yet.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
