import React from 'react';
import {Link  } from "react-router-dom"
function CourseCard({ course }) {
    return (
        <div className="w-full max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {course.tags && course.tags.map((tag, index) => (
                <span key={index} className={`bg-${tag.bgColor}-100 text-${tag.textColor}-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-${tag.bgColor}-900 dark:text-${tag.textColor}-300`}>
                    {tag.label}
                </span>
            ))}

            <div className="items-baseline text-gray-900 dark:text-white">
                <img className='mt-2' style={{ height: "40px" }} src={course.image} alt={course.name} />
                <span className="text-lg font-semibold">{course.name}</span>
            </div>

            <ul role="list" className="space-y-5 my-7">
                {course.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        <svg
                            className="shrink-0 w-4 h-4 text-blue-700 dark:text-blue-500"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                        <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>

            <Link to={`/course-details/${course._id}`}
                type="button"
                className="text-white bg-yellow-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
            >
                Show Details
            </Link>
        </div>
    )
}

export default CourseCard;
