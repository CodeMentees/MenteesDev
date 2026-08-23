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
            {latestBlogs.blogs.map((latest) => (
              <article key={latest._id}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <Link to={`/blogs/${latest._id}`} className="block h-44 overflow-hidden">
                  <img
                    src={latest.image || "https://placehold.co/300x200?text=No+Image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={latest.title || "Blog Image"}
                  />
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 leading-snug">
                    <Link to={`/blogs/${latest._id}`}>{latest.title}</Link>
                  </h3>
                  <p className="text-xs mb-4 line-clamp-2 flex-grow leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {latest.content?.replace(/<[^>]+>/g, "").substring(0, 100)}...
                  </p>
                  <Link
                    to={`/blogs/${latest._id}`}
                    className="text-xs font-semibold transition-colors"
                    style={{ color: "#fb923c" }}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link to="/blogs" className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.5)" }}>See All Articles →</Link>
        </div>
      </div>
    </section>
  );
}

export default BlogGridFour;
