import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBlogCategory } from "../../api/blogCategoryApi";

const BlogSidebar = ({ selectedCategory, onCategoryClick }) => {
    const { fetchBlogCategories } = useBlogCategory();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetchBlogCategories();
                setCategories(response.data || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        loadCategories();
    }, []);

    return (
        <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-24">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 pl-9">
                    Browse Categories
                </h3>
                <div className="max-h-[calc(100vh-400px)] overflow-y-auto custom-scrollbar pr-2">
                    <nav className="flex flex-col space-y-1">
                        <button
                            onClick={() => onCategoryClick(null)}
                            className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${!selectedCategory
                                ? "bg-pink-50 text-pink-600 border border-pink-100"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-200 ${!selectedCategory ? "bg-pink-500 scale-100" : "bg-transparent scale-0"
                                }`} />
                            All Posts
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category._id}
                                onClick={() => onCategoryClick(category.name)}
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
    );
};

export default BlogSidebar;
