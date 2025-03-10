import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../api/blogApi";
import { fetchBlogCategories } from "../api/blogCategoryApi";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import Loading from "../Components/Helpers/Loading";

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogData = await fetchBlog(id);
        setBlog(blogData);

        const categoriesData = await fetchBlogCategories();
        setCategories(categoriesData);
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
    <main className="pt-8 max-w-6xl mx-auto pb-16 lg:pt-16 lg:pb-24 bg antialiased">
      <div className="flex flex-col lg:flex-row justify-between px-4 mx-auto max-w-screen-xl">
        {/* ✅ Left Side: Blog Content */}
        <article className="w-full lg:w-3/4 lg:pr-8">
          <header className="mb-4 lg:mb-6">
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {blog.title}
            </h1>
          </header>
          <section>
            <p
              className="text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </section>
        </article>

        {/* ✅ Right Sidebar: Categories as Chips */}
        <aside className="w-full lg:w-1/4 mt-8 lg:mt-0">
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📌 Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category._id}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    selectedCategory === category.name
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.name ? null : category.name
                    )
                  }
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <BlogGridFour />
    </main>
  );
}

export default BlogPage;
