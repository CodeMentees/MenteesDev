import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseSubject/CourseCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import { fetchCourseByCategory } from '../../api/courseApi';
import { SkeletonGrid } from '../UI/LoadingSpinner';

function CourseSection() {
    const [activeTab, setActiveTab] = useState(0);
    const [courseData, setCourseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const categoryData = useSelector((state) => state.category.value);
    
    const fetchCourseData = async (categoryId) => {
        setActiveTab(categoryId);
        setLoading(true);
        try {
            const course = await fetchCourseByCategory(categoryId);
            setCourseData(course.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
        setLoading(false);
    };
    
    useEffect(() => {
        AOS.init({ once: false, mirror: true });
        if (categoryData?.length > 0) {
            fetchCourseData(categoryData[0]._id);
        }
    }, [categoryData]);

    return (
        <section className="py-24 px-6 relative" style={{ background: "rgb(4,4,8)" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end gap-4 mb-12">
                    <div className="flex-1">
                        <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-3">Courses</p>
                        <h2 className="text-4xl md:text-5xl font-black text-white">
                            Learn by subject
                        </h2>
                    </div>
                    <p className="lg:max-w-sm text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                        Result-oriented pedagogy and project-based learning — pick your track and start building.
                    </p>
                </div>

                <div>
                    {/* Pill tabs */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {categoryData?.map((tab) => (
                            <button
                                key={tab._id}
                                onClick={() => fetchCourseData(tab._id)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                                style={{
                                    background: activeTab === tab._id ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)",
                                    border: activeTab === tab._id ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.08)",
                                    color: activeTab === tab._id ? "#fb923c" : "rgba(255,255,255,0.5)",
                                }}
                            >
                                <img src={tab.image} alt={tab.name} className="w-5 h-5" />
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4">
                        {loading ? (
                            <SkeletonGrid count={3} />
                        ) : courseData.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courseData.map((course) => (
                                    <CourseCard key={course._id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center mt-4" style={{ color: "rgba(255,255,255,0.35)" }}>No courses found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CourseSection;
