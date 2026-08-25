import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Loading from "../Components/Helpers/Loading";
import { useBlog } from "../api/blogApi";
import BlogSidebar from "../Components/Blog/BlogSidebar";
import BlogPromoSidebar from "../Components/Blog/BlogPromoSidebar";
import BlogAuthModal from "../Components/Blog/BlogAuthModal";

function Blog() {
  const { fetchLatestBlogs } = useBlog();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const category = searchParams.get("category");

  // Close overlay on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const postsData = await fetchLatestBlogs(1, 10, category || "");
      if (postsData) {
        setPosts(postsData.data || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const handleCategoryClick = (catName) => {
    if (catName) {
      setSearchParams({ category: catName });
    } else {
      setSearchParams({});
    }
  };

  // Intercept blog clicks — show modal if not authenticated, otherwise show inline preview
  const handleBlogClick = (e, postId) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setSelectedId(postId);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white min-h-screen py-16">
      <BlogAuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      {/* Helmet for SEO logic remains same... */}
      <Helmet>
        <title>{category ? `${category} Blogs` : "Latest Blog Posts"} | Codementees</title>
        <meta name="description" content="Read our latest articles and insights about coding and technology" />
      </Helmet>

      <div className="w-full max-w-[1920px] mx-auto px-6 xl:px-12">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            {category ? `${category} Insights` : "Insights & Guides"}
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {category
              ? `Exploring the latest in ${category} engineering and development.`
              : "Explore the latest in software engineering, architecture, and development culture."}
          </p>
          <div className="w-24 h-1.5 bg-pink-500 mx-auto mt-8 rounded-full shadow-lg shadow-pink-100"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-24">
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0">
            <BlogSidebar selectedCategory={category} onCategoryClick={handleCategoryClick} />
          </div>

          {/* Blog Posts Grid */}
          <div className="flex-1 w-full flex justify-center lg:justify-start">
            <div className="w-full max-w-3xl">
              {posts.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 text-lg">No blogs found in this category.</p>
                  <button
                    onClick={() => handleCategoryClick(null)}
                    className="mt-4 text-pink-600 font-bold hover:underline"
                  >
                    View all posts
                  </button>
                </div>
              ) : (
                <div className="grid gap-12 xl:grid-cols-2">
                  {posts.map((post) => (
                    <motion.article 
                      key={post._id} 
                      layoutId={`blog-page-card-${post._id}`}
                      className="group flex flex-col items-center gap-6"
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          if (!isAuthenticated) {
                            setShowAuthModal(true);
                          } else {
                            setSelectedId(post._id);
                          }
                        }}
                        className="shrink-0 relative block h-64 w-full overflow-hidden rounded-3xl bg-gray-100 shadow-xl cursor-pointer"
                      >
                        <motion.img
                          layoutId={`blog-page-image-${post._id}`}
                          src={post.image ?? "/images/default-blog.png"}
                          loading="lazy"
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {!isAuthenticated ? (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 text-gray-800 font-bold text-sm px-4 py-2 rounded-full">🔒 Sign in to read</span>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-pink-600/90 text-white font-bold text-sm px-4 py-2 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Quick Preview
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col w-full">
                        <div className="flex items-center space-x-3 text-xs font-bold text-pink-500 uppercase tracking-widest mb-3">
                          <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          {post.categories && post.categories.length > 0 && (
                            <>
                              <span>•</span>
                              <span>{post.categories[0]}</span>
                            </>
                          )}
                        </div>

                        <motion.h2 layoutId={`blog-page-title-${post._id}`} className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-pink-600 transition-colors">
                          <button onClick={() => navigate(`/blogs/${post._id}`)} className="text-left hover:text-pink-600 transition-colors">
                            {post.title}
                          </button>
                        </motion.h2>

                        <motion.div
                          layoutId={`blog-page-content-${post._id}`}
                          className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed"
                        >
                          {(() => {
                             const text = post.content?.replace(/<[^>]+>/g, ' ').replace(/[#_*~`>]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/!\[([^\]]*)\]\([^)]+\)/g, '').replace(/\s+/g, ' ').trim() || "";
                             return text.substring(0, 150) + "...";
                          })()}
                        </motion.div>

                        <div>
                          <button
                            onClick={() => navigate(`/blogs/${post._id}`)}
                            className="inline-flex items-center text-sm font-black text-gray-900 group-hover:text-pink-600 transition-colors"
                          >
                            READ ARTICLE
                            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ✅ Right Sidebar: Promo */}
          <div className="hidden xl:block shrink-0 sticky top-28 self-start">
            <BlogPromoSidebar />
          </div>
        </div>
      </div>

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
                {posts.filter(p => p._id === selectedId).map(post => (
                  <motion.div
                    key={post._id}
                    layoutId={`blog-page-card-${post._id}`}
                    className="flex flex-col rounded-3xl overflow-hidden shadow-2xl relative w-full bg-white pointer-events-auto border border-gray-100"
                  >
                    <button
                      onClick={() => setSelectedId(null)}
                      className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors"
                      title="Close"
                    >
                      ✕
                    </button>
                    
                    {/* Image */}
                    <motion.div className="w-full h-56 md:h-64 relative shrink-0">
                      <motion.img
                        layoutId={`blog-page-image-${post._id}`}
                        src={post.image || "/images/default-blog.png"}
                        className="w-full h-full object-cover"
                        alt={post.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10 -mt-8">
                      <p className="text-xs font-bold tracking-widest uppercase mb-3 text-pink-500 bg-white/80 w-max px-3 py-1 rounded-full backdrop-blur-md">Preview</p>
                      <motion.h3 layoutId={`blog-page-title-${post._id}`} className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
                        {post.title}
                      </motion.h3>
                      <motion.div layoutId={`blog-page-content-${post._id}`} className="text-sm md:text-base leading-relaxed mb-6 overflow-y-auto pr-2 text-gray-600 line-clamp-4">
                        {(() => {
                           const text = post.content?.replace(/<[^>]+>/g, ' ').replace(/[#_*~`>]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/!\[([^\]]*)\]\([^)]+\)/g, '').replace(/\s+/g, ' ').trim() || "";
                           return text.substring(0, 300) + "...";
                        })()}
                      </motion.div>
                      
                      <div className="mt-auto pt-4 flex gap-3 border-t border-gray-100">
                        <button
                          onClick={() => navigate(`/blogs/${post._id}`)}
                          className="px-6 py-2.5 rounded-xl text-sm font-bold transition hover:opacity-90 flex-1 text-center bg-pink-600 text-white shadow-lg shadow-pink-200"
                        >
                          Read Full Article
                        </button>
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
    </div>
  );
}

export default Blog;
