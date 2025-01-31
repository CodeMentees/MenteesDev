import React, { useEffect, useState } from 'react'
import { CSharp } from '../../assets/mainPage';
import CourseCard from '../CourseSubject/CourseCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import coursesData from "../../JSON/courseData.json"


function CourseSection() {
    useEffect(() => {
        AOS.init();
    }, [])
    const [activeTab, setActiveTab] = useState(0);


    // Tab navigation data
    const tabs = [
        { id: 0, label: "Competitive Programming", image: CSharp },
        { id: 1, label: "Interview Preparation", image: CSharp },
    ];
    return (
        <section className="bg-white dark:bg-gray-900  container max-w-6xl mx-auto">
            <div data-aos="fade-left" className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Courses based on subjects</h2>
                <p class="mb-4 dark:text-white">Learn and grow as a developer with our Result oriented pedagogy and project based learning..</p>

                <div>
                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <ul className="flex flex-nowrap overflow-x-auto gap-8 -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                            {tabs.map((tab) => (
                                <li key={tab.id}  className="me-2">
                                    <button
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`m items-center justify-center p-4 border-b-2 ${activeTab === tab.id
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                            } rounded-t-lg group`}
                                    >
                                        <img src={tab.image} alt={tab.label} className="w-6 h-6 mr-2" />
                                        <p className="mt-2">{tab.label}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-4">
                        {/* Render the courses based on activeTab */}
                        {activeTab === 0 && (
                            <div data-aos="flip-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {coursesData[0].courses.map((course) => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>
                        )}

                        {activeTab === 1 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {coursesData[1].courses.map((course) => (
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