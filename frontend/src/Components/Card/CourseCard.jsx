import React from 'react';
import {Link} from "react-router-dom"
function CourseCard({ category,courses }) {
    return (
        <div className='container dark:bg-black-500'>
        
            <div className="max-w-4xl mx-auto  p-4 rounded-lg shadow-lg">
                <img className='inline' style={{ height: "32px" }} src={category.image} alt={category.name} />
                <h1 className="text-xl inline mx-2 font-bold text-gray-800 dark:text-white mb-4">{category.name}</h1>
                <p className="text-gray-600 text-sm mb-6 dark:text-white">{category.description}</p>

                <div className="gap-3 flex flex-wrap flex-row">
                    {courses.map((course, index) => (
                        <Link  to={`/course-details/${course._id}`}>
                        <div key={index} className="bg-blue-50 p-6 w-80 rounded-lg flex gap-2">
                            <img className='inline' style={{ height: "32px" }} src={course.image} alt={course.name} />
                            <div>
                                <h2 className="text-sm font-semibold text-blue-800 mb-2">{course.name}</h2>
                                <div className='flex gap-2 '>
                                    {course.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="bg-red-100 px-3 text-green-800 text-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Confused on which course to choose?</h2>
                    <div className="flex space-x-4">
                        <a href="#" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Explore all Classroom courses</a>
                        <a href="#" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">Explore all Online guided learning courses</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;