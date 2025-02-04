import React, { useState } from 'react';
import CourseCard from '../Components/Card/CourseCard';
import { useEffect } from 'react';
import {fetchCourse} from "../api/courseApi"

function AllCourse() {
    const [activeTab, setActiveTab] = useState(); // Set the first tab as active by default
    const [activeTabData, setActiveTabData] = useState();


    const handleTabClick = async(tabId, name, description, image) => {
        setActiveTab(tabId);
        setActiveTabData({ name: name, description: description, image: image })
        const fetchedCourse =  await fetchCourse(tabId)
        setCourses(fetchedCourse)
    };

    const [tabs, setTabs] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/category", {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json"
                    }
                })
                const data = await response.json() // Parse the JSON response
                setTabs(data.data)
                let activeTabData = data.data[0];
                setActiveTab(activeTabData._id)
                setActiveTabData({ name: activeTabData.name, description: activeTabData.description, image: activeTabData.image })
                if (activeTabData._id) {
                    const fetchedCourse = await fetchCourse(activeTabData._id)
                    setCourses(fetchedCourse)
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    return (
        (activeTabData) ?
            <div className='container max-w-6xl mx-auto p-4 my-10'>
                <div className="md:flex">
                    {/* Tab List */}
                    <ul className="flex-column space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                        {tabs.map((tab) => (
                            <li key={tab._id}>
                                <a
                                    href="#"
                                    className={`inline-flex items-center px-4 py-3 rounded-lg w-full lg:w-64 ${activeTab === tab._id
                                        ? 'text-white bg-blue-700 dark:bg-blue-600'
                                        : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
                                        }`}
                                    onClick={() => handleTabClick(tab._id, tab.name, tab.description, tab.image)}
                                    aria-current={activeTab === tab._id ? 'page' : undefined}
                                >
                                    {tab.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Tab Content */}
                    <div className="py-2 px-3 lg:p-6 bg-gray-500 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
                        <CourseCard category={activeTabData} courses={courses} />
                    </div>
                </div>
            </div>
            : <>Loading....</>
    );
}

export default AllCourse;