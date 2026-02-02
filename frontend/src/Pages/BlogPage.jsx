import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useBlog } from "../api/blogApi";
import { useBlogCategory } from "../api/blogCategoryApi";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import Loading from "../Components/Helpers/Loading";

function BlogPage() {
  const { fetchBlog } = useBlog();
  const { fetchBlogCategories } = useBlogCategory();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogData, categoriesData] = await Promise.all([
          fetchBlog(id),
          fetchBlogCategories(),
        ]);
        setBlog(blogData.data);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Error fetching blog or categories:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!blog) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen bg-white antialiased">
      {/* ✅ SEO with Helmet */}
      <Helmet>
        <title>{blog.title} | Codementees</title>
        <meta name="description" content={blog.content.substring(0, 150)} />
        <meta name="keywords" content="blog, coding, development, technology" />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content.substring(0, 150)} />
        <meta property="og:image" content={blog.image || "https://codementees.com/default-blog.jpg"} />
        <meta property="og:url" content={`https://codementees.com/blogs/${id}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-12 px-6 py-12">
        {/* ✅ Left Sidebar: Categories Navigation */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 pl-9">
              Browse Categories
            </h3>
            <div className="max-h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar pr-2">
              <nav className="flex flex-col space-y-1">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${selectedCategory === category.name
                      ? "bg-pink-50 text-pink-600 border border-pink-100"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-200 ${selectedCategory === category.name ? "bg-pink-500 scale-100" : "bg-transparent scale-0"
                      }`} />
                    {category.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl text-white shadow-xl shadow-pink-200">
              <h4 className="font-bold mb-2">Want to level up?</h4>
              <p className="text-xs text-pink-100 mb-4 leading-relaxed">Join our expert-led sessions and master development.</p>
              <Link to="/contact" className="w-full py-2 bg-white text-pink-600 rounded-lg text-xs font-bold hover:bg-pink-50 transition block text-center">
                Start Learning
              </Link>
            </div>
          </div>
        </aside>

        {/* ✅ Main Content Area */}
        <div className="flex-1 max-w-4xl mx-auto w-full">
          <article className="w-full">
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

            <section className="article-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
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
