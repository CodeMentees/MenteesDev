import React, { useState, useEffect } from "react";
import { useBlog } from "../../api/blogApi";
import Loading from "../Helpers/Loading";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function BlogGridFour() {
  const { fetchLatestBlogs } = useBlog(); // ✅ Extract function from hook
  const [latestBlogs, setLatestBlogs] = useState({
    blogs: [],
    currentPages: "",
    totalPages: "",
  });
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  // Close overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const blogs = await fetchLatestBlogs();
        setLatestBlogs({
          blogs: blogs.data || [],
          currentPages: blogs.currentPages,
          totalPages: blogs.totalPages,
        });
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-24 px-6 relative" style={{ background: "rgb(4,4,8)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-3 text-orange-400">Blog</p>
            <h2 className="text-4xl md:text-5xl font-black text-white">From the Blog</h2>
          </div>
          <Link
            to="/blogs"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:scale-105"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
          >
            See All →
          </Link>
        </div>

        {latestBlogs.blogs.length === 0 ? (
          <p className="text-center" style={{ color: "rgba(255,255,255,0.35)" }}>No blogs available.</p>
        ) : (
          <AnimatePresence mode="wait">
            {!selectedId ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {latestBlogs.blogs.map((latest) => (
              <motion.article
                key={latest._id}
                layoutId={`blog-card-${latest._id}`}
                onClick={() => setSelectedId(latest._id)}
                className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div layoutId={`blog-image-${latest._id}`} className="block h-44 overflow-hidden">
                  <motion.img
                    src={latest.image || "https://placehold.co/300x200?text=No+Image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={latest.title || "Blog Image"}
                  />
                </motion.div>
                <div className="p-5 flex flex-col flex-grow">
                  <motion.h3 layoutId={`blog-title-${latest._id}`} className="text-sm font-bold text-white mb-2 line-clamp-2 leading-snug">
                    {latest.title}
                  </motion.h3>
                  <motion.p layoutId={`blog-content-${latest._id}`} className="text-xs mb-4 line-clamp-2 flex-grow leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {latest.content?.replace(/<[^>]+>/g, "").substring(0, 100)}...
                  </motion.p>
                  <span
                    className="text-xs font-semibold transition-colors"
                    style={{ color: "#fb923c" }}
                  >
                    Preview Article →
                  </span>
                </div>
              </motion.article>
            ))}
          </motion.div>
            ) : (
              <motion.div 
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex justify-center"
              >
                {latestBlogs.blogs.filter(b => b._id === selectedId).map(blog => (
                  <motion.div
                    key={blog._id}
                    layoutId={`blog-card-${blog._id}`}
                    className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl relative w-full max-w-5xl"
                    style={{ background: "rgb(15,15,20)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {/* Left: Image */}
                    <motion.div layoutId={`blog-image-${blog._id}`} className="w-full md:w-1/2 h-64 md:h-auto relative shrink-0">
                      <motion.img
                        src={blog.image || "https://placehold.co/800x400?text=No+Image"}
                        className="w-full h-full object-cover"
                        alt={blog.title || "Blog Image"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0f0f14] to-transparent" />
                    </motion.div>
                    
                    {/* Right: Content */}
                    <div className="p-8 md:p-10 flex flex-col flex-grow relative z-10 w-full md:w-1/2">
                      <button
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        title="Close Preview"
                      >
                        ✕
                      </button>
                      <p className="text-xs font-bold tracking-widest uppercase mb-3 text-orange-400">Preview</p>
                      <motion.h3 layoutId={`blog-title-${blog._id}`} className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                        {blog.title}
                      </motion.h3>
                      <motion.div layoutId={`blog-content-${blog._id}`} className="text-sm md:text-base mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                        <div dangerouslySetInnerHTML={{ __html: blog.content?.substring(0, 300) + "..." }} />
                      </motion.div>
                      
                      <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => setSelectedId(null)}
                          className="px-6 py-3 rounded-full text-sm font-bold transition hover:bg-white/5 border border-white/10 flex-1 text-center text-white"
                        >
                          Go Back
                        </button>
                        <Link
                          to={`/blogs/${blog._id}`}
                          className="px-6 py-3 rounded-full text-sm font-bold transition hover:opacity-90 flex-1 text-center"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)", color: "white" }}
                        >
                          Read Full Article
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/blogs" className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>See All Articles →</Link>
        </div>
      </div>
    </section>
  );
}

export default BlogGridFour;
