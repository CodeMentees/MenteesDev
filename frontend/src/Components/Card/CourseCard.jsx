import React from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function CourseCard({ category, courses }) {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleEnrollClick = (courseId) => {
        if (!isAuthenticated) {
            navigate("/login", { state: { from: location.pathname } });
        } else {
            navigate(`/courses/${courseId}`);
        }
    };

    return (
        <div className='container bg-black-500'>

            <div className="max-w-4xl mx-auto p-0 lg:p-4 rounded-lg shadow-lg">
                <img className='inline text-white' style={{ height: "32px" }} src={category.image} alt={category.name} loading="lazy" />
                <h1 className="text-xl inline mx-2 font-bold text-white mb-4">{category.name}</h1>
                <p className="text-sm mb-6 text-white">{category.description}</p>

                <div className="gap-3 flex flex-wrap flex-col lg:flex-row">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className="group mx-2 mt-10 grid max-w-screen-lg grid-cols-1 space-x-8 overflow-hidden rounded-lg border border-blue-900 shadow-sm shadow-indigo-700   text-white   hover:shadow-md hover:shadow-indigo-800  sm:mx-auto sm:grid-cols-5"
                        >
                            <Link to={`/courses/${course._id}`} className="col-span-2 text-left text-white hover:text-gray-700">
                                <div className="group relative h-full w-full overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.name}
                                        className="h-full w-full p-4 border-none object-cover text-gray-700 transition"
                                        loading="lazy"
                                    />
                                    <span className="absolute top-2  left-2 rounded-full bg-blue-600  px-3 py-1 text-xs font-semibold text-black">
                                        {course.category.name}
                                    </span>
                                    <img
                                        src="/images/AnbWyIjnwNbW9Wz6c_cja.svg"
                                        className="absolute inset-1/2 w-10 max-w-full -translate-x-1/2 -translate-y-1/2 transition group-hover:scale-125"
                                        alt=""
                                        loading="lazy"
                                    />
                                </div>
                            </Link>
                            <div className="col-span-3 flex flex-col space-y-3 pr-8 text-left">
                                <Link to={`/courses/${course._id}`} className="mt-3 overflow-hidden text-2xl font-semibold">
                                    {course.name}
                                </Link>
                                <p className="overflow-hidden text-sm">{course.description ?? "No description available"}</p>
                                <span className="text-sm font-semibold text-dark-h">{course.instructor ?? "Codementees"}</span>
                                <div className="flex flex-col text-gray-700 sm:flex-row">
                                    <div className="flex h-fit space-x-2 text-sm font-medium">
                                        {
                                            course.tags.map((tag) => {
                                                return (

                                                    <div className="rounded-full border-2 border-blue-700 px-2 py-0.5 text-white">
                                                        {tag ?? "Live Class"}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <button
                                        onClick={() => handleEnrollClick(course._id)}
                                        className="my-5 rounded-md px-5 py-2 text-center transition hover:scale-105 bg-dark-btn text-white sm:ml-auto"
                                    >
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Confused on which course to choose?</h2>
                    <div className="flex flex-col lg:flex-row space-x-4 space-y-4 lg:space-y-0">
                        <a href="#" className="bg-blue-500 text-white text-xs px-6  py-2 rounded-lg hover:bg-blue-600">Explore all Classroom courses</a>
                        <a href="#" className="bg-green-500 text-white text-xs px-6  py-2 rounded-lg hover:bg-green-600">Explore all Online guided learning courses</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;