import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const category = searchParams.get("category");

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

  // Intercept blog clicks — show modal if not authenticated
  const handleBlogClick = (e, postId) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowAuthModal(true);
    } else {
      navigate(`/blogs/${postId}`);
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
                    <article key={post._id} className="group flex flex-col items-center gap-6">
                      <div
                        onClick={(e) => handleBlogClick(e, post._id)}
                        className="shrink-0 relative block h-64 w-full overflow-hidden rounded-3xl bg-gray-100 shadow-xl transition-transform duration-500 group-hover:-translate-y-2 cursor-pointer"
                      >
                        <img
                          src={post.image ?? "/images/default-blog.png"}
                          loading="lazy"
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {!isAuthenticated && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 text-gray-800 font-bold text-sm px-4 py-2 rounded-full">🔒 Sign in to read</span>
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

                        <h2 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-pink-600 transition-colors">
                          <button onClick={(e) => handleBlogClick(e, post._id)} className="text-left hover:text-pink-600 transition-colors">
                            {post.title}
                          </button>
                        </h2>

                        <p
                          className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: post.content.substring(0, 120) + "..." }}
                        />

                        <div>
                          <button
                            onClick={(e) => handleBlogClick(e, post._id)}
                            className="inline-flex items-center text-sm font-black text-gray-900 group-hover:text-pink-600 transition-colors"
                          >
                            READ ARTICLE
                            <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </article>
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
    </div>
  );
}

export default Blog;
