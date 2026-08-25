import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useBlog } from "../../api/blogApi";
import Loading from "../Helpers/Loading";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function BlogGridFour() {
  const { fetchLatestBlogs } = useBlog();
  const navigate = useNavigate();
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestBlogs.blogs.slice(0, 4).map((latest) => (
              <motion.article
                key={latest._id}
                layoutId={`blog-card-${latest._id}`}
                className="group flex flex-col rounded-2xl overflow-hidden cursor-pointer h-full relative"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div 
                  className="block h-44 overflow-hidden relative"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSelectedId(latest._id);
                  }}
                >
                  <motion.img
                    layoutId={`blog-image-${latest._id}`}
                    src={latest.image || "https://placehold.co/300x200?text=No+Image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={latest.title || "Blog Image"}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-bold bg-pink-600/90 px-4 py-2 rounded-full backdrop-blur-sm shadow-lg flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Quick Preview
                    </span>
                  </div>
                </div>

                <div 
                  className="p-5 flex flex-col flex-grow"
                  onClick={() => navigate(`/blogs/${latest._id}`)}
                >
                  <motion.h3 layoutId={`blog-title-${latest._id}`} className="text-sm font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-pink-400 transition-colors">
                    {latest.title}
                  </motion.h3>
                  <motion.p layoutId={`blog-content-${latest._id}`} className="text-xs mb-4 line-clamp-2 flex-grow leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {(() => {
                       const text = latest.content?.replace(/<[^>]+>/g, ' ').replace(/[#_*~`>]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/!\[([^\]]*)\]\([^)]+\)/g, '').replace(/\s+/g, ' ').trim() || "";
                       return text.substring(0, 100) + "...";
                    })()}
                  </motion.p>
                  
                  <span
                    className="text-xs font-semibold transition-colors mt-auto flex items-center gap-1 group-hover:text-pink-400"
                    style={{ color: "#fb923c" }}
                  >
                    Read Article 
                    <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {createPortal(
          <AnimatePresence>
            {selectedId && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedId(null)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />
                
                <div className="relative w-full max-w-xl max-h-[85vh] flex justify-center pointer-events-none">
                  {latestBlogs.blogs.filter(b => b._id === selectedId).slice(0, 4).map(blog => (
                    <motion.div
                      key={blog._id}
                      layoutId={`blog-card-${blog._id}`}
                      className="flex flex-col rounded-3xl overflow-hidden shadow-2xl relative w-full bg-[#0a0a0f] pointer-events-auto border border-white/10"
                    >
                      <button
                        onClick={() => setSelectedId(null)}
                        className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                        title="Close"
                      >
                        ✕
                      </button>
                      
                      <motion.div className="w-full h-56 relative shrink-0">
                        <motion.img
                          layoutId={`blog-image-${blog._id}`}
                          src={blog.image || "https://placehold.co/800x400?text=No+Image"}
                          className="w-full h-full object-cover"
                          alt={blog.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                      </motion.div>
                      
                      <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 -mt-6">
                        <p className="text-[10px] font-bold tracking-widest uppercase mb-2 text-orange-400">Preview</p>
                        <motion.h3 layoutId={`blog-title-${blog._id}`} className="text-xl md:text-2xl font-black text-white mb-3 leading-tight">
                          {blog.title}
                        </motion.h3>
                        <motion.div layoutId={`blog-content-${blog._id}`} className="text-sm leading-relaxed mb-6 overflow-y-auto pr-2 line-clamp-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                          {(() => {
                             const text = blog.content?.replace(/<[^>]+>/g, ' ').replace(/[#_*~`>]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/!\[([^\]]*)\]\([^)]+\)/g, '').replace(/\s+/g, ' ').trim() || "";
                             return text.substring(0, 300) + "...";
                          })()}
                        </motion.div>
                        
                        <div className="mt-auto pt-4 flex gap-3 border-t border-white/5">
                          <Link
                            to={`/blogs/${blog._id}`}
                            className="px-6 py-2.5 rounded-lg text-sm font-bold transition hover:opacity-90 flex-1 text-center shadow-lg shadow-purple-500/20"
                            style={{ background: "linear-gradient(135deg, #7c3aed, #db2777)", color: "white" }}
                          >
                            Read Full Article
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/blogs" className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>See All Articles →</Link>
        </div>
      </div>
    </section>
  );
}

export default BlogGridFour;
