import { initFlowbite } from 'flowbite';
import React, { useEffect, useState } from 'react';
import { useCategoryAPI } from '../../api/categoryApi';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from "../../Components/UI/Toast"
import { FaArrowLeft, FaSave } from 'react-icons/fa';

function AddCourseCategory() {
    const { createCategory, updateCategory, fetchCategory } = useCategoryAPI();
    const { id } = useParams();
    const navigate = useNavigate();
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const [isLoading, setIsLoading] = useState(false);
    const [categoryData, setCategoryData] = useState({
        name: '',
        image: '',
        description: ''
    });

    const fetchCategoryData = async () => {
        try {
            const res = await fetchCategory(id);
            if (res && res.data) {
                setCategoryData(res.data);
            }
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    useEffect(() => {
        initFlowbite();
        if (id) {
            fetchCategoryData();
        }
    }, [id]);

    const handleChange = (e) => {
        setCategoryData({
            ...categoryData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Remove MongoDB internal fields that cause update errors
            const { _id, __v, ...cleanedData } = categoryData;

            if (id) {
                await updateCategory(id, cleanedData);
            } else {
                await createCategory(cleanedData);
            }

            setToast({ visible: true, message: id ? "Category updated successfully" : "Category created successfully", type: "success" });

            setTimeout(() => {
                setToast({ visible: false, message: "", type: "success" });
                navigate('/admin/categories');
            }, 1500);
        } catch (error) {
            setToast({ visible: true, message: error.message || "An error occurred", type: "error" });
            setTimeout(() => setToast({ visible: false, message: "", type: "error" }), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen p-6" style={{ backgroundColor: "rgb(var(--dash-bg))" }}>
            <Toast visible={toast.visible} message={toast.message} type={toast.type} />
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate('/admin/categories')}
                    className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 mb-6 transition-colors"
                >
                    <FaArrowLeft className="mr-2" /> Back to Categories
                </button>

                <div className="rounded-2xl shadow-xl p-8 border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 flex items-center">
                        <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 p-3 rounded-xl mr-4">
                            {id ? "✏️" : "➕"}
                        </span>
                        {id ? "Update" : "Create"} Course Category
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-1">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="e.g. Web Development"
                                    value={categoryData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                                    style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    required
                                    placeholder="https://example.com/image.png"
                                    value={categoryData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border transition-all outline-none"
                                    style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    placeholder="Tell more about this category..."
                                    value={categoryData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border transition-all outline-none resize-none"
                                    style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                                ></textarea>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-primary-500/30 transform transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                ) : (
                                    <FaSave className="mr-2" />
                                )}
                                {id ? "Update" : "Create"} Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AddCourseCategory;
