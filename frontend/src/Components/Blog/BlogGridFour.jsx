import React, { useState, useEffect } from "react";
import { fetchLatestBlogs } from "../../api/blogApi";
import Loading from "../Helpers/Loading";

function BlogGridFour() {
  const [latestBlogs, setLatestBlogs] = useState({
    blogs: [],
    currentPages: "",
    totalPages: "",
  });
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const blogs = await fetchLatestBlogs();
        setLatestBlogs({
          blogs: blogs.blogs,
          currentPages: blogs.currentPages,
          totalPages: blogs.totalPages,
        });
      } catch (error) {
        console.error("Error fetching latest blogs:", error);
      }
    };

    fetchLatest();
  }, []);

  if (!latestBlogs) {
    return <Loading />;
  }
  return (
    <div className="bg-dark-box container max-w-6xl mx-auto p-4 lg:p-12 my-10 aos-init aos-animate">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
        Related articles
      </h2>
      {/* Related Articles */}

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {latestBlogs.blogs.map((latest) => (
          <article key={latest.id} className="max-w-xs">
            <a href={`/blog/${latest._id}`}>
              <img
                src={latest.image || "https://via.placeholder.com/300"}
                className="mb-5 rounded-lg"
                alt={latest.title}
              />
            </a>
            <h2 className="mb-2 text-lg font-bold leading-tight text-gray-900 dark:text-white">
              <a href={`/blog/${latest._id}`}>{latest.title}</a>
            </h2>
            <p
              className="mb-4 text-dark-accent"
              dangerouslySetInnerHTML={{
                __html: latest.content.substring(0, 100) + "...",
              }}
            ></p>

            <a
              href={`/blog/${latest._id}`}
              className="inline-flex items-center font-medium underline underline-offset-4 text-dark-btn hover:no-underline"
            >
              Read More
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogGridFour;
