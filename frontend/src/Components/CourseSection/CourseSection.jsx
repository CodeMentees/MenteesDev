import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseSubject/CourseCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux';
import { fetchCourse } from '../../api/courseApi';

function CourseSection() {
    const [activeTab, setActiveTab] = useState(0);
    const [courseData, setCourseData] = useState();
    const categoryData = useSelector((state) => state.category.value);

    const fetchCourseData = async (categoryId) => {
        setActiveTab(categoryId)
        const course = await fetchCourse(categoryId);
        console.log("data is ",course)
        setCourseData(course);
    };

    useEffect(() => {
        AOS.init(); // Initialize AOS outside the conditional block

        if (categoryData && categoryData[0]?._id) {
            console.log(categoryData[0]._id)
            fetchCourseData(categoryData[0]._id);
        }
    }, [categoryData]); // Add categoryData as a dependency

    if(!courseData){
        return <>Loading...</>
    }

    return (
        <section className="bg-white dark:bg-gray-900  container max-w-6xl mx-auto">
            <div data-aos="fade-left" className="py-8 px-6 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <h2 className="mb-4 lg:text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">Courses based on subjects</h2>
                <p className="mb-4 dark:text-white">Learn and grow as a developer with our Result oriented pedagogy and project based learning..</p>

                <div>
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <ul className="flex flex-nowrap overflow-x-auto gap-8 -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            {categoryData.map((tab) => (
                                <li key={tab._id} className="me-2">
                                    <button
                                        onClick={() => fetchCourseData(tab._id)}
                                        className={`m items-center justify-center flex  p-1 lg:p-4 border-b-2 ${activeTab === tab._id
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                            } rounded-t-lg group`}
                                    >
                                        <img src={tab.image} alt={tab.name} className="w-6 h-6 mr-2" />
                                        <p className="mt-2">{tab.name}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4">
                        {/* Render the courses based on activeTab */}
                        {!activeTab == 0 && (
                            <div data-aos="flip-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courseData.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section >
    )
}

export default CourseSection