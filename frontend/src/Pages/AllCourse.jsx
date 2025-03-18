import React, { useState } from 'react';
import CourseCard from '../Components/Card/CourseCard';
import { useEffect } from 'react';
import { fetchCourseByCategory} from "../api/courseApi"
import Loading from '../Components/Helpers/Loading';
import { fetchCategories } from '../api/categoryApi';

function AllCourse() {
    const [activeTab, setActiveTab] = useState(); // Set the first tab as active by default
    const [activeTabData, setActiveTabData] = useState();


    const handleTabClick = async(tabId, name, description, image) => {
        setActiveTab(tabId);
        setActiveTabData({ name: name, description: description, image: image })
        const fetchedCourse =  await fetchCourseByCategory(tabId)
        setCourses(fetchedCourse)
    };

    const [tabs, setTabs] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchCategories()
            setTabs(data)
            let activeTabData = data[0];
            setActiveTab(activeTabData._id)
            setActiveTabData({ name: activeTabData.name, description: activeTabData.description, image: activeTabData.image })
            if (activeTabData._id) {
                const fetchedCourse = await fetchCourseByCategory(activeTabData._id)
                setCourses(fetchedCourse)
            }
        }
        fetchData()
    }, [])

    return (
        (activeTabData) ?
            <div className='container max-w-6xl mx-auto p-4 my-10'>
                <div className="md:flex">
                    {/* Tab List */}
                    <ul className="flex-column space-y space-y-2 text-sm font-medium text-gray-400 md:me-4 mb-4 md:mb-0">
                        {tabs.map((tab) => (
                            <li key={tab._id}>
                                <a
                                    href="#"
                                    className={`inline-flex items-center px-4 py-3 rounded-lg w-full lg:w-64 ${activeTab === tab._id
                                        ? 'text-white bg-blue-600'
                                        : 'bg-gray-800 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    onClick={() => handleTabClick(tab._id, tab.name, tab.description, tab.image)}
                                    aria-current={activeTab === tab._id ? 'page' : undefined}
                                >
                                    <img src={tab.image} alt="" className='h-10'/>
                                    {tab.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Tab Content */}
                    <div className="py-2 px-3 lg:p-6  text-medium text-gray-400 bg-gray-800 rounded-lg w-full">
                        <CourseCard category={activeTabData} courses={courses} />
                    </div>
                </div>
            </div>
            : <Loading/>
    );
}

export default AllCourse;