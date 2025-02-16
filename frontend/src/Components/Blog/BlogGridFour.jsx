import React,{useState,useEffect} from 'react'
import { fetchLatestBlogs } from '../../api/blogApi';

function BlogGridFour() {

    const [latestBlogs, setLatestBlogs] = useState({ blogs: [], currentPages: "", totalPages: "" });
    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const blogs = await fetchLatestBlogs();
                setLatestBlogs({ blogs: blogs.blogs, currentPages: blogs.currentPages, totalPages: blogs.totalPages });
            } catch (error) {
                console.error("Error fetching latest blogs:", error);
            }
        };

        fetchLatest();
    }, []);


    if (!latestBlogs) {
        return <>Loading....</>;
    }
    return (

        <>
            {/* Related Articles */}
            <aside aria-label="Related articles" className="py-8 lg:py-24 bg-gray-50 dark:bg-gray-800">
                <div className="px-4 mx-auto max-w-screen-xl">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                        Related articles
                    </h2>
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
                                <h2 className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                                    <a href={`/blog/${latest._id}`}>{latest.title}</a>
                                </h2>
                                <p
                                    className="mb-4 text-gray-500 dark:text-gray-400"
                                    dangerouslySetInnerHTML={{ __html: latest.content.substring(0, 100) + "..." }}
                                ></p>

                                <a
                                    href={`/blog/${latest._id}`}
                                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                                >
                                    Read More
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default BlogGridFour