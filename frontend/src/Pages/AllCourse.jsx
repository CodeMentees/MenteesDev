import React, { useState } from 'react';
import CourseCard from '../Components/Card/CourseCard';
import { CSharp } from '../assets/mainPage';
import tabData from '../JSON/tabData.json'
import { useEffect } from 'react';

function AllCourse() {
    const [activeTab, setActiveTab] = useState("679c7813e9ec18bbfae2716a"); // Set the first tab as active by default

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const [tabs, setTabs] = useState([]);
    const [courses, setCourses] = useState([]);


    const fetchCourse = async () => {
        try {
            const response = await fetch('/api/course', {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            })
            if (response.ok) { 
                const data = await response.json()
                console.log("my  is ",data)
                setCourses(data.data)
            } else {
                console.error('Failed to fetch data:', response.statusText)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/category", {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json"
                    }
                })
                if (response.ok) { // Check if response is successful
                    const data = await response.json() // Parse the JSON response
                    console.log(data.data) // Log the fetched data
                    setTabs(data.data)
                } else {
                    console.error('Failed to fetch data:', response.statusText)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData() // Call the async function
        fetchCourse()
    }, [])

    return (
        <div className='container max-w-6xl mx-auto p-4 my-10'>
            <div className="md:flex">
                {/* Tab List */}
                <ul className="flex-column space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                    {tabs.map((tab) => (
                        <li key={tab._id}>
                            <a
                                href="#"
                                className={`inline-flex items-center px-4 py-3 rounded-lg w-64 ${activeTab === tab._id
                                        ? 'text-white bg-blue-700 dark:bg-blue-600'
                                        : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
                                    }`}
                                onClick={() => handleTabClick(tab._id)}
                                aria-current={activeTab === tab._id ? 'page' : undefined}
                            >
                                {tab.name}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Tab Content */}
                <div className="p-6 bg-gray-500 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                    {courses.map((course) => (
                        activeTab === course.category._id && (
                            <div key={course._id}>
                                <h4>{course.name}</h4>
                                <CourseCard course={course} />
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AllCourse;