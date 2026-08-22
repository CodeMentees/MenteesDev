import { useState, useEffect } from "react";
import { coursesData } from "../data/coursesData";
import { getCourses } from "../services/courseService";
import CourseCard from "../components/CourseCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";

const CATEGORIES = ["All", "Technical", "HR", "Security", "Culture", "Product"];

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        const list = data?.courses?.length > 0 ? data.courses : coursesData;
        setCourses(list);
        setFiltered(list);
      } catch {
        setCourses(coursesData);
        setFiltered(coursesData);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;
    if (activeCategory !== "All") {
      result = result.filter(c =>
        c.category?.toLowerCase() === activeCategory.toLowerCase() ||
        c.techStack?.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()))
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.title?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [activeCategory, search, courses]);

  return (
    <div style={{ background: "rgb(var(--bg))", minHeight: "100vh" }}>
      {/* Page header */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: "rgba(var(--border))" }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "rgb(249,115,22)" }}>
              Onboarding Library
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: "rgb(var(--text-primary))" }}>Onboarding Paths</h1>
            <p className="text-base" style={{ color: "rgb(var(--text-secondary))", maxWidth: "32rem" }}>
              Structured training modules and knowledge bases to ramp up new hires fast.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search onboarding paths..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 max-w-xs text-sm"
            style={{ background: "rgb(14,14,14)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "0.625rem", padding: "0.6rem 0.875rem" }}
          />
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={activeCategory === cat
                  ? { background: "rgb(249,115,22)", color: "#fff", border: "1px solid rgb(249,115,22)" }
                  : { background: "rgb(14,14,14)", border: "1px solid rgba(255,255,255,0.1)", color: "rgb(140,140,140)" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <p className="text-xs mb-6 font-medium" style={{ color: "rgb(90,90,90)" }}>
          {loading ? "Loading..." : `${filtered.length} path${filtered.length !== 1 ? "s" : ""} available`}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No paths found</h3>
            <p className="text-sm mb-4" style={{ color: "rgb(100,100,100)" }}>
              Try a different search term or category.
            </p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="btn btn-secondary text-sm">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((course, idx) => (
              <motion.div
                key={course.id || course._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
