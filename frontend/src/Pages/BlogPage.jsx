import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useBlog } from "../api/blogApi";
import SEOHead from "../seo/SEOHead";
import { useDynamicSEO } from "../seo/useDynamicSEO";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import Loading from "../Components/Helpers/Loading";
import BlogSidebar from "../Components/Blog/BlogSidebar";
import Toast from "../Components/UI/Toast";
import BlogPromoSidebar from "../Components/Blog/BlogPromoSidebar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function BlogPage() {
  const { fetchBlog, likeBlog, addComment, deleteComment } = useBlog();
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  // Like and Comment state
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  // Guard: redirect to login if not signed in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/blogs/${id}` } });
    }
  }, [isAuthenticated, navigate, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogData = await fetchBlog(id);
        setBlog(blogData.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchData();
  }, [id]);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "" }), 3000);
  };

  const handleCategoryClick = (catName) => {
    if (catName) {
      navigate(`/blogs?category=${catName}`);
    } else {
      navigate("/blogs");
    }
  };

  const handleLike = async () => {
    if (!user) {
      showToast("Please login to like this post", "error");
      return;
    }
    try {
      const response = await likeBlog(id);
      setBlog({ ...blog, likes: response.data });
    } catch (error) {
      showToast("Failed to like post", "error");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      showToast("Please login to comment", "error");
      return;
    }
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await addComment(id, commentText);
      setBlog({ ...blog, comments: response.data });
      setCommentText("");
      showToast("Comment added", "success");
    } catch (error) {
      showToast("Failed to add comment", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const response = await deleteComment(id, commentId);
      setBlog({ ...blog, comments: response.data });
      showToast("Comment deleted", "success");
    } catch (error) {
      showToast("Failed to delete comment", "error");
    }
  };

  const seoProps = useDynamicSEO('blog', blog);

  if (!blog) {
    return <Loading />;
  }

  const isLiked = user && blog.likes?.includes(user._id);
  const likeCount = blog.likes?.length || 0;

  return (
    <main className="min-h-screen bg-white antialiased overflow-x-hidden w-full">
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      <SEOHead path="/blogs/:id" {...seoProps} />

      <div className="w-full max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-8 xl:gap-24 px-6 xl:px-12 py-12">
        {/* ✅ Left Sidebar: Categories Navigation */}
        <div className="w-full lg:w-64 shrink-0">
          <BlogSidebar
            selectedCategory={blog.categories && blog.categories[0]}
            onCategoryClick={handleCategoryClick}
          />
        </div>

        {/* ✅ Main Content Area */}
        <div className="flex-1 w-full flex justify-center lg:justify-start">
          <div className="w-full max-w-3xl">
            <article className="w-full relative">
              <header className="mb-12">
                <div className="flex items-center space-x-2 text-sm text-pink-500 font-semibold mb-4 uppercase tracking-wider">
                  <span>Article</span>
                  <span>•</span>
                  <span className="text-gray-500">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-8">
                  {blog.title}
                </h1>

                {blog.image && (
                  <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 aspect-[21/9]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </header>

              <section className="prose prose-lg max-w-none article-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {blog.content}
                </ReactMarkdown>
              </section>

              {/* ✅ Floating Like Button */}
              <div className="mt-12 py-6 border-t border-gray-100 flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-md ${isLiked
                    ? "bg-pink-50 text-pink-600 border border-pink-200 shadow-pink-100 hover:bg-pink-100"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                    }`}
                >
                  {isLiked ? <FaHeart className="text-pink-500 text-xl" /> : <FaRegHeart className="text-gray-400 text-xl" />}
                  <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                </button>
              </div>

              {/* ✅ Comments Section */}
              <section className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  Comments ({blog.comments?.length || 0})
                </h3>

                {/* Add Comment Form */}
                <form onSubmit={handleAddComment} className="mb-10">
                  <div className="relative">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={user ? "Share your thoughts..." : "Please login to comment"}
                      disabled={!user || isSubmitting}
                      className="w-full p-4 pb-12 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none min-h-[120px]"
                    ></textarea>
                    <div className="absolute bottom-3 right-3">
                      <button
                        type="submit"
                        disabled={!user || isSubmitting || !commentText.trim()}
                        className="px-6 py-2 bg-pink-600 text-white font-bold rounded-xl hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Posting..." : "Post Comment"}
                      </button>
                    </div>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {!blog.comments || blog.comments.length === 0 ? (
                    <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
                  ) : (
                    blog.comments.map((comment) => (
                      <div key={comment._id} className="flex gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold shrink-0">
                          {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900">{comment.user?.name || "Anonymous User"}</h4>
                            <span className="text-xs text-gray-400">
                              {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p>
                        </div>
                        {user?.isAdmin && (
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-gray-400 hover:text-red-500 transition p-2 h-fit shrink-0"
                            title="Delete Comment"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </section>
            </article>

            <footer className="mt-16 pt-12 border-t border-gray-100">
              <div className="bg-gray-50 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-pink-500 rounded-2xl shrink-0 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-pink-100">
                  CM
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">Codementees Team</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Expert developers sharing insights and guides to help you master modern technology and engineering practices.</p>
                </div>
              </div>
            </footer>
          </div>
        </div>

        {/* ✅ Right Sidebar: Promo */}
        <div className="hidden xl:block shrink-0 sticky top-28 self-start">
          <BlogPromoSidebar />
        </div>
      </div>

      <div className="bg-gray-50 py-24 mt-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Suggested for you</h3>
          <BlogGridFour />
        </div>
      </div>
    </main>
  );
}

export default BlogPage;
