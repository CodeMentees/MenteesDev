import React, { useState, useEffect } from "react";
import { useBlog } from "../../api/blogApi"; // ✅ Correct import
import Loading from "../Helpers/Loading";
import { Link } from "react-router-dom";

function BlogGridFour() {
  const { fetchLatestBlogs } = useBlog(); // ✅ Extract function from hook
  const [latestBlogs, setLatestBlogs] = useState({
    blogs: [],
    currentPages: "",
    totalPages: "",
  });
  const [loading, setLoading] = useState(true);

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
    <div className="bg-dark-box container max-w-6xl h-full mx-auto p-4 lg:p-12 my-10">
      <h2 className="mb-8 text-left lg:text-3xl tracking-tight font-extrabold text-dark-h">
        Related Articles
      </h2>

      {latestBlogs.blogs.length === 0 ? (
        <p className="text-center text-gray-400">No blogs available.</p>
      ) : (
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {latestBlogs.blogs.map((latest) => (
            <article key={latest._id} className="max-w-xs">
              <Link to={`/blogs/${latest._id}`}>
                <img
                  src={latest.image || "https://placehold.co/300x200?text=No+Image"}
                  className="mb-5 rounded-lg w-full h-48 object-cover"
                  alt={latest.title || "Blog Image"}
                />
              </Link>
              <h2 className="mb-2 text-lg font-bold leading-tight text-white">
                <Link to={`/blogs/${latest._id}`}>{latest.title}</Link>
              </h2>
              <p
                className="mb-4 text-dark-accent"
                dangerouslySetInnerHTML={{
                  __html: latest.content.substring(0, 100) + "...",
                }}
              ></p>

              <Link
                to={`/blogs/${latest._id}`}
                className="inline-flex items-center font-medium underline underline-offset-4 text-dark-btn hover:no-underline"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <Link className="text-dark-accent text-xl hover:underline" to="/blogs">
          See All
        </Link>
      </div>
    </div>
  );
}

export default BlogGridFour;
