import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseSubject/CourseCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import { fetchCourseByCategory } from '../../api/courseApi';
import Loading from '../Helpers/Loading';

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
        AOS.init();
        if (categoryData?.length > 0) {
            fetchCourseData(categoryData[0]._id);
        }
    }, [categoryData]);

    return (
        <section className="bg-dark-box container max-w-6xl mx-auto p-4 lg:p-12 my-10">
            <div data-aos="fade-left" className="mx-auto max-w-screen-xl">
                <h2 className="mb-4 lg:text-3xl tracking-tight font-extrabold text-dark-h">
                    Courses based on subjects
                </h2>
                <p className="mb-4 text-white">
                    Learn and grow as a developer with our result-oriented pedagogy and project-based learning.
                </p>

                <div>
                    <div className="border-b border-gray-700">
                        <ul className="flex flex-nowrap overflow-x-auto gap-8 -mb-px text-sm font-medium text-center text-gray-400">
                            {categoryData?.map((tab) => (
                                <li key={tab._id} className="me-2">
                                    <button
                                        onClick={() => fetchCourseData(tab._id)}
                                        className={`m items-center justify-center flex p-1 lg:p-4 border-b-2 ${
                                            activeTab === tab._id
                                                ? "border-blue-500 text-blue-600"
                                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                            } rounded-t-lg group`}
                                    >
                                        <img
                                            src={tab.image}
                                            alt={tab.name}
                                            className="w-6 text-dark-text h-6 mr-2"
                                        />
                                        <p className="mt-2">{tab.name}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4">
                        {loading ? (
                            <Loading />
                        ) : courseData.length > 0 ? (
                            <div
                                data-aos="flip-up"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {courseData.map((course) => (
                                    <CourseCard key={course._id} course={course} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center mt-4">No courses found.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CourseSection;
