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
    <div>
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
        <meta name="twitter:image" content="https://codementees.com/default-blog.jpg" />
      </Helmet>

      <aside aria-label="Recent Posts" className="mx-auto mt-2 max-w-screen-xl py-1">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          {/* Heading */}
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-white md:mb-6 lg:text-3xl">
              Most Recent Blogs
            </h2>
          </div>

          {/* Blog Posts List */}
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            {posts.map((post) => (
              <article key={post._id} className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                <Link to={`/blogs/${post._id}`} className="group shrink-0 relative block h-56 w-full self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                  <img
                    src={post.image || "https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"}
                    loading="lazy"
                    alt={post.title}
                    className="group-hover:scale-110 absolute inset-0 h-full w-full object-cover object-center transition duration-200"
                  />
                </Link>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-gray-400">{new Date(post.createdAt).toDateString()}</span>
                  <h2 className="text-xl font-bold text-white">
                    <Link to={`/blogs/${post._id}`} className="active:text-rose-600 transition duration-100 hover:text-rose-500">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) + "..." }} />
                  <div>
                    <Link to={`/blogs/${post._id}`} className="active:text-rose-700 font-semibold text-white transition duration-100 hover:text-rose-600">
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Blog;
