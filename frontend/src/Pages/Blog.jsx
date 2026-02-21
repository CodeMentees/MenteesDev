import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Loading from "../Components/Helpers/Loading";
import { useBlog } from "../api/blogApi";

function Blog() {
  const { fetchLatestBlogs } = useBlog();
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    const postsData = await fetchLatestBlogs(1, 10);
    if (postsData) {
      setPosts(postsData.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (posts.length === 0) {
    return <Loading />;
  }

  return (
    <div className="bg-white min-h-screen py-16">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Latest Blog Posts | Codementees</title>
        <meta name="description" content="Read the latest articles on coding, development, and technology trends at Codementees." />
        <meta name="keywords" content="coding, programming, technology, development, blogs" />
        <meta property="og:title" content="Latest Blog Posts | Codementees" />
        <meta property="og:description" content="Discover insightful articles on coding, web development, and tech trends." />
        <meta property="og:image" content="https://codementees.com/default-blog.jpg" />
        <meta property="og:url" content="https://codementees.com/blogs" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Latest Blog Posts | Codementees" />
        <meta name="twitter:description" content="Read insightful blogs on coding, tech, and development." />
        <meta name="twitter:image" content="/images/default-blog.png" />
      </Helmet>

      <div className="max-w-screen-xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Insights & Guides
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Explore the latest in software engineering, architecture, and development culture.
          </p>
          <div className="w-24 h-1.5 bg-pink-500 mx-auto mt-8 rounded-full shadow-lg shadow-pink-100"></div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-12 sm:grid-cols-2">
          {posts.map((post) => (
            <article key={post._id} className="group flex flex-col items-center gap-6 md:flex-row">
              <Link
                to={`/blogs/${post._id}`}
                className="shrink-0 relative block h-64 w-full md:h-48 md:w-48 lg:h-56 lg:w-56 overflow-hidden rounded-3xl bg-gray-100 shadow-xl transition-transform duration-500 group-hover:-translate-y-2"
              >
                <img
                  src={post.image ?? "/images/default-blog.png"}
                  loading="lazy"
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>

              <div className="flex flex-col flex-1">
                <div className="flex items-center space-x-3 text-xs font-bold text-pink-500 uppercase tracking-widest mb-3">
                  <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>

                <h2 className="text-2xl font-extrabold text-gray-900 mb-3 leading-tight group-hover:text-pink-600 transition-colors">
                  <Link to={`/blogs/${post._id}`}>
                    {post.title}
                  </Link>
                </h2>

                <p
                  className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content.substring(0, 120) + "..." }}
                />

                <div>
                  <Link
                    to={`/blogs/${post._id}`}
                    className="inline-flex items-center text-sm font-black text-gray-900 group-hover:text-pink-600 transition-colors"
                  >
                    READ ARTICLE
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
