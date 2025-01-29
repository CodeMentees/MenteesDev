import React from 'react'

function BlogGridFour() {

    const blogs = [
        {
            title: 'A thorough guide to C++ for Beginners',
            image: 'https://cdn.pixabay.com/photo/2017/03/04/12/15/programming-2115930_640.jpg',
            readTime: '3 min read',
            link: '#',
        },
        {
            title: "A beginner's guide to the skills you learn in CP",
            image: 'https://cdn.pixabay.com/photo/2017/03/04/12/15/programming-2115930_640.jpg',

            readTime: '3 min read',
            link: '#',
        },
        {
            title: 'Rising demand for Data science professionals in India',
            image: 'https://cdn.pixabay.com/photo/2017/03/04/12/15/programming-2115930_640.jpg',

            readTime: '4 min read',
            link: '#',
        },
        {
            title: 'Scope for Android developers now & in the upcoming years',
            image: 'https://cdn.pixabay.com/photo/2017/03/04/12/15/programming-2115930_640.jpg',

            readTime: '3 min read',
            link: '#',
        },
    ];
    return (

            <section className=" container max-w-6xl mx-auto py-12 px-4 lg:px-8">
                <h2 className="text-3xl text-center font-semibold mb-8">
                    Latest from the <span className="text-[#FF5722]">Blog</span>
                </h2>
                <div data-aos="flip-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {blogs.map((blog, index) => (
                        <div key={index} className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                            <img
                                src={blog.image}
                                alt={`Blog ${index + 1}`}
                                className="w-full h-32 lg:h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-sm lg:text-lg text-gray-800 dark:text-gray-100">{blog.title}</h3>
                                <p className="text-[#999] text-xs mt-2">{blog.readTime}</p>
                                <a href={blog.link} className="text-[#FF5722] text-xs mt-2 block">
                                    Read more &gt;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <a href="#" className="text-[#FF5722] text-lg font-semibold">
                        Read all blogs &gt;
                    </a>
                </div>
            </section>
    )
}

export default BlogGridFour