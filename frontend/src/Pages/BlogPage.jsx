import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../api/blogApi";
import BlogGridFour from "../Components/Blog/BlogGridFour";
import Loading from "../Components/Helpers/Loading";

function BlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const blogData = await fetchBlog(id);
                setBlog(blogData);
            } catch (error) {
                console.error("Error fetching blog:", error);
            }
        };

        fetchData();
    }, [id]);


    if (!blog) {
        return <Loading/>;
    }

    return (
        <>
            <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
                <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
                    <article className="mx-auto w-full max-w-2xl">
                        <header className="mb-4 lg:mb-6">
                            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                                {blog.title}
                            </h1>
                        </header>
                        <section>
                            <p className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </section>
                    </article>
                </div>
            </main>

            <BlogGridFour />
        </>
    );
}

export default BlogPage;
