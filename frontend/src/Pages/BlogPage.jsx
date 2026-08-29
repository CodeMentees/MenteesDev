import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCopy, FaCheck } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useBlog } from "../api/blogApi";
import SEOHead from "../seo/SEOHead";
import { useDynamicSEO } from "../seo/useDynamicSEO";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import BlogPromoSidebar from "../Components/Blog/BlogPromoSidebar";
import Loading from "../Components/Helpers/Loading";
import Toast from "../Components/UI/Toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const rehypeCodeTabs = () => {
  return (tree) => {
    if (!tree.children) return;
    const newChildren = [];
    let currentGroup = [];

    const flushGroup = () => {
      if (currentGroup.length > 1) {
        const languages = currentGroup.map(preNode => {
          const codeNode = preNode.children?.find(c => c.tagName === 'code');
          let lang = 'text';
          if (codeNode && codeNode.properties && codeNode.properties.className) {
            const match = codeNode.properties.className.find(c => String(c).startsWith('language-'));
            if (match) lang = String(match).replace('language-', '');
          }
          if (codeNode) {
            codeNode.properties = codeNode.properties || {};
            codeNode.properties['data-intab'] = "true";
          }
          return lang;
        });

        newChildren.push({
          type: 'element',
          tagName: 'code-tabs',
          properties: { 'data-languages': languages.join(',') },
          children: currentGroup
        });
      } else if (currentGroup.length === 1) {
        newChildren.push(currentGroup[0]);
      }
      currentGroup = [];
    };

    tree.children.forEach((node) => {
      if (node.type === 'element' && node.tagName === 'pre') {
        currentGroup.push(node);
      } else if (node.type === 'text' && /^\s*$/.test(node.value)) {
        if (currentGroup.length === 0) {
          newChildren.push(node);
        }
      } else {
        flushGroup();
        newChildren.push(node);
      }
    });

    flushGroup();
    tree.children = newChildren;
  };
};

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

  // Auth guard removed per user request for temporary public access

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
    <main className="min-h-screen bg-white antialiased w-full">
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />

      <SEOHead path="/blogs/:id" {...seoProps} />

      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-6 xl:px-12 py-12 flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-16 items-start justify-between">
        {/* Left Sidebar */}
        <div className="hidden xl:block w-64 shrink-0 sticky top-24 self-start">
            <BlogPromoSidebar />
        </div>

        {/* Main Content */}
        <article className="w-full relative flex-1 min-w-0">
              <header className="mb-12">
                <div className="flex items-center space-x-2 text-sm text-pink-600 font-bold mb-6 uppercase tracking-widest bg-pink-50 w-fit px-4 py-1.5 rounded-full">
                  <span>Article</span>
                  <span>•</span>
                  <span className="text-gray-600">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
                  {blog.title}
                </h1>

                {blog.image && (
                  <div className="rounded-[2rem] overflow-hidden shadow-2xl mb-14 aspect-[21/9] border border-gray-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
              </header>

              <section className="prose max-w-none article-content prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-a:text-pink-600 hover:prose-a:text-pink-500 prose-img:rounded-2xl prose-img:shadow-xl prose-blockquote:border-l-4 prose-blockquote:border-pink-500 prose-blockquote:bg-pink-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-700 prose-blockquote:italic">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]} 
                  rehypePlugins={[rehypeRaw, rehypeCodeTabs]}
                  components={{
                    pre: ({children}) => <>{children}</>,
                    'code-tabs': ({node, children, ...props}) => {
                      const [activeTab, setActiveTab] = useState(0);
                      const langs = (props['data-languages'] || '').split(',');
                      const childArray = React.Children.toArray(children).filter(child => React.isValidElement(child));

                      return (
                        <div className="rounded-xl overflow-hidden shadow-lg my-8 border border-gray-200/20 bg-[#1e1e1e]">
                          <div className="flex bg-[#2d2d2d] border-b border-[#3d3d3d] overflow-x-auto scrollbar-hide items-center relative h-12">
                            <div className="absolute left-4 flex gap-1.5 z-10">
                              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                            </div>
                            <div className="flex pl-20 w-full h-full">
                              {langs.map((lang, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveTab(idx)}
                                  className={`px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors border-b-2 whitespace-nowrap focus:outline-none ${activeTab === idx ? 'text-white border-pink-500 bg-[#1e1e1e]' : 'text-gray-400 border-transparent hover:text-gray-200 hover:bg-[#3d3d3d]'}`}
                                >
                                  {lang === 'text' ? `Snippet ${idx + 1}` : lang}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="code-tab-content bg-[#1a1b26]">
                            {childArray[activeTab]}
                          </div>
                        </div>
                      );
                    },
                    code({node, inline, className, children, ...props}) {
                      const match = /language-(\w+)/.exec(className || '');
                      const extractText = (child) => {
                        if (typeof child === 'string') return child;
                        if (Array.isArray(child)) return child.map(extractText).join('');
                        if (child && child.type === 'br') return '\n';
                        if (child && child.props && child.props.children) return extractText(child.props.children);
                        return '';
                      };
                      const rawText = extractText(children);
                      let codeText = rawText.replace(/\n$/, '').replace(/^`+|`+$/g, '').trim();
                      const isBlock = match || codeText.includes('\n') || codeText.length > 60;
                      const inTab = node.properties?.['data-intab'] === 'true' || props['data-intab'] === 'true';
                      
                      const CopyButton = ({ text }) => {
                        const [copied, setCopied] = useState(false);
                        const handleCopy = () => {
                          navigator.clipboard.writeText(text);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        };
                        return (
                          <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-gray-600 text-gray-400 hover:text-white rounded-md transition-colors flex items-center gap-1.5 text-xs font-medium bg-black/20"
                            title="Copy code"
                          >
                            {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                            {copied ? 'Copied' : 'Copy'}
                          </button>
                        );
                      };

                      return (!inline && isBlock) ? (
                        inTab ? (
                          <div className="relative group">
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                              <CopyButton text={codeText} />
                            </div>
                            <SyntaxHighlighter
                              children={codeText}
                              style={vscDarkPlus}
                              language={match ? match[1] : 'text'}
                              PreTag="div"
                              className="!m-0 !p-5 !bg-[#1e1e1e] text-sm overflow-x-auto"
                              {...props}
                            />
                          </div>
                        ) : (
                          <div className="rounded-xl overflow-hidden shadow-lg my-8 border border-gray-200/20 bg-[#1e1e1e]">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3d3d3d]">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                </div>
                                {match && (
                                  <span className="ml-2 text-xs font-mono font-medium text-gray-400 uppercase tracking-wider">
                                    {match[1]}
                                  </span>
                                )}
                              </div>
                              <CopyButton text={codeText} />
                            </div>
                            <SyntaxHighlighter
                              children={codeText}
                              style={vscDarkPlus}
                              language={match ? match[1] : 'text'}
                              PreTag="div"
                              className="!m-0 !p-5 !bg-[#1e1e1e] text-sm overflow-x-auto"
                              {...props}
                            />
                          </div>
                        )
                      ) : (
                        <code className={`${className || ''} bg-gray-100 text-pink-600 dark:bg-gray-800 dark:text-pink-400 border border-gray-200 dark:border-gray-700 px-1.5 py-0.5 rounded-md font-mono text-sm break-words`.trim()} {...props}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
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

            {/* Right Sidebar - Ads */}
            <aside className="hidden lg:block w-72 shrink-0 sticky top-24 self-start">

              {/* Explore Programs Ad */}
              <div className="bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100 rounded-2xl p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-[0_8px_30px_rgb(236,72,153,0.1)] transition-all duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-400/20 rounded-full blur-xl -mr-10 -mt-10 pointer-events-none group-hover:bg-pink-400/30 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-400/20 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none"></div>
                
                <span className="relative z-10 text-[10px] font-black text-pink-600 uppercase tracking-widest mb-4 block">Explore Programs</span>
                
                <h4 className="relative z-10 font-bold text-gray-900 text-lg mb-2 leading-tight">Accelerate Your Tech Career</h4>
                <p className="relative z-10 text-xs text-gray-600 mb-6 px-2">Join our exclusive cohort to crack top product companies.</p>
                
                <Link
                    to="/courses"
                    className="relative z-10 inline-block w-full py-3 bg-white border border-pink-200 hover:border-pink-400 text-pink-600 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 rounded-xl font-bold text-xs shadow-sm transition-all duration-300"
                >
                    View Details
                </Link>
              </div>
            </aside>

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
