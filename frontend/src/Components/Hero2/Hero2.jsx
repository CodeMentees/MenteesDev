import React from 'react'
import { catlaptop, childrenlaptop, discussion, girlwithbooks, gradebook, integration, laptopnews, rectangle, rectangle21, teacher, testimonials, truefalse, vcall } from '../../assets/img'
import InfoCard from '../Card/InfoCard'
import SectionHeader from '../Header/SectionHeader'
function Hero2() {
    return (
        <div>
            <div className="mt-28">
                <SectionHeader
                    title="What is"
                    highlight="CodeMentees ?"
                    description="CodeMentees  is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes, and exams; monitor due dates; grade results and provide students with feedback all in one place."
                />
                <div
                    data-aos="fade-up"
                    className="flex flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-6 lg:space-x-10 mt-7"
                >
                    <InfoCard
                        image={rectangle}
                        title="FOR INSTRUCTORS"
                        buttonText="Start a class today"
                        buttonStyle="border"
                    />
                    <InfoCard
                        image={rectangle21}
                        title="FOR STUDENTS"
                        buttonText="Enter access code"
                        buttonStyle="bg-blue-500"
                    />

                </div>
            </div>
            <div className="sm:flex items-center sm:space-x-8 mt-36">
                <div data-aos="fade-right" className="sm:w-1/2 relative">
                    <div className="bg-yellow-500 rounded-full absolute w-12 h-12 z-0 -left-4 -top-3 animate-pulse" />
                    <h1 className="font-semibold text-2xl relative z-50 text-darken lg:pr-10">
                        Everything you can do in a physical classroom,{" "}
                        <span className="text-yellow-500">you can do with CodeMentees </span>
                    </h1>
                    <p className="py-5 lg:pr-32">
                        CodeMentees ’s school management software helps traditional and online
                        schools manage scheduling, attendance, payments and virtual classrooms
                        all in one secure cloud-based system.
                    </p>
                    <a href="" className="underline">
                        Learn More
                    </a>
                </div>
                <div data-aos="fade-left" className="sm:w-1/2 relative mt-10 sm:mt-0">
                    <div
                        style={{ background: "#23BDEE" }}
                        className="floating w-24 h-24 absolute rounded-lg z-0 -top-3 -left-3"
                    />
                    <img
                        className="rounded-xl z-40 relative"
                        src={teacher}
                        alt=""
                    />
                    <button className="bg-white w-14 h-14 rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out z-50">
                        <svg
                            className="w-5 h-5 ml-1"
                            viewBox="0 0 24 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M22.5751 12.8097C23.2212 13.1983 23.2212 14.135 22.5751 14.5236L1.51538 27.1891C0.848878 27.5899 5.91205e-07 27.1099 6.25202e-07 26.3321L1.73245e-06 1.00123C1.76645e-06 0.223477 0.848877 -0.256572 1.51538 0.14427L22.5751 12.8097Z"
                                fill="#23BDEE"
                            />
                        </svg>
                    </button>
                    <div className="bg-yellow-500 w-40 h-40 floating absolute rounded-lg z-10 -bottom-3 -right-3" />
                </div>
            </div>
            <div className="md:flex mt-40 md:space-x-10 items-start">
                <div data-aos="fade-down" className="md:w-7/12 relative">
                    <div
                        style={{ background: "#33EFA0" }}
                        className="w-32 h-32 rounded-full absolute z-0 left-4 -top-12 animate-pulse"
                    />
                    <div
                        style={{ background: "#33D9EF" }}
                        className="w-5 h-5 rounded-full absolute z-0 left-36 -top-12 animate-ping"
                    />
                    <img className="relative z-50 floating" src={vcall} alt="" />
                    <div
                        style={{ background: "#5B61EB" }}
                        className="w-36 h-36 rounded-full absolute z-0 right-16 -bottom-1 animate-pulse"
                    />
                    <div
                        style={{ background: "#F56666" }}
                        className="w-5 h-5 rounded-full absolute z-0 right-52 bottom-1 animate-ping"
                    />
                </div>
                <div data-aos="fade-down" className="md:w-5/12 mt-20 md:mt-0 text-gray-500">
                    <h1 className="text-2xl font-semibold text-darken lg:pr-40">
                        A <span className="text-yellow-500">user interface</span> designed for
                        the classroom
                    </h1>
                    <div className="flex items-center space-x-5 my-5">
                        <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 27 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect width="11.8182" height="11.8182" rx={2} fill="#2F327D" />
                                <rect
                                    y="14.1816"
                                    width="11.8182"
                                    height="11.8182"
                                    rx={2}
                                    fill="#2F327D"
                                />
                                <rect
                                    x="14.7727"
                                    width="11.8182"
                                    height="11.8182"
                                    rx={2}
                                    fill="#2F327D"
                                />
                                <rect
                                    x="14.7727"
                                    y="14.1816"
                                    width="11.8182"
                                    height="11.8182"
                                    rx={2}
                                    fill="#F48C06"
                                />
                            </svg>
                        </div>
                        <p>
                            Teachers don’t get lost in the grid view and have a dedicated Podium
                            space.
                        </p>
                    </div>
                    <div className="flex items-center space-x-5 my-5">
                        <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 28 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect x={8} y={6} width={20} height={20} rx={2} fill="#2F327D" />
                                <rect width="21.2245" height="21.2245" rx={2} fill="#F48C06" />
                            </svg>
                        </div>
                        <p>TA’s and presenters can be moved to the front of the class.</p>
                    </div>
                    <div className="flex items-center space-x-5 my-5">
                        <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 30 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.5 11.375C6.15469 11.375 7.5 9.91758 7.5 8.125C7.5 6.33242 6.15469 4.875 4.5 4.875C2.84531 4.875 1.5 6.33242 1.5 8.125C1.5 9.91758 2.84531 11.375 4.5 11.375ZM25.5 11.375C27.1547 11.375 28.5 9.91758 28.5 8.125C28.5 6.33242 27.1547 4.875 25.5 4.875C23.8453 4.875 22.5 6.33242 22.5 8.125C22.5 9.91758 23.8453 11.375 25.5 11.375ZM27 13H24C23.175 13 22.4297 13.3605 21.8859 13.9445C23.775 15.0668 25.1156 17.093 25.4062 19.5H28.5C29.3297 19.5 30 18.7738 30 17.875V16.25C30 14.4574 28.6547 13 27 13ZM15 13C17.9016 13 20.25 10.4559 20.25 7.3125C20.25 4.16914 17.9016 1.625 15 1.625C12.0984 1.625 9.75 4.16914 9.75 7.3125C9.75 10.4559 12.0984 13 15 13ZM18.6 14.625H18.2109C17.2359 15.1328 16.1531 15.4375 15 15.4375C13.8469 15.4375 12.7688 15.1328 11.7891 14.625H11.4C8.41875 14.625 6 17.2453 6 20.475V21.9375C6 23.2832 7.00781 24.375 8.25 24.375H21.75C22.9922 24.375 24 23.2832 24 21.9375V20.475C24 17.2453 21.5812 14.625 18.6 14.625ZM8.11406 13.9445C7.57031 13.3605 6.825 13 6 13H3C1.34531 13 0 14.4574 0 16.25V17.875C0 18.7738 0.670312 19.5 1.5 19.5H4.58906C4.88438 17.093 6.225 15.0668 8.11406 13.9445Z"
                                    fill="#2F327D"
                                />
                            </svg>
                        </div>
                        <p>Teachers can easily see all students and class data at one time.</p>
                    </div>
                </div>
            </div>
            {/* Tools For Teachers And Learners */}
            <div className="flex flex-col md:flex-row items-center md:space-x-10 mt-16">
                <div data-aos="fade-right" className="md:w-1/2 lg:pl-14">
                    <h1 className="text-darken font-semibold text-3xl lg:pr-56">
                        <span className="text-yellow-500">Tools</span> For Teachers And Learners
                    </h1>
                    <p className="text-gray-500 my-4 lg:pr-32">
                        Class has a dynamic set of teaching tools built to be deployed and used
                        during class. Teachers can handout assignments in real-time for students
                        to complete and submit.
                    </p>
                </div>
                <img
                    data-aos="fade-left"
                    className="md:w-1/2"
                    src={girlwithbooks}
                />
            </div>
            {/* Assessments, Quizzes, Tests */}
            <div className="mt-20 flex flex-col-reverse md:flex-row items-center md:space-x-10">
                <div data-aos="fade-right" className="md:w-6/12">
                    <img className="md:w-11/12" src={truefalse} />
                </div>
                <div
                    data-aos="fade-left"
                    className="md:w-6/12 md:transform md:-translate-y-20"
                >
                    <h1 className="font-semibold text-darken text-3xl lg:pr-64">
                        Assessments, <span className="text-yellow-500">Quizzes</span>, Tests
                    </h1>
                    <p className="text-gray-500 my-5 lg:pr-52">
                        Easily launch live assignments, quizzes, and tests. Student results are
                        automatically entered in the online gradebook.
                    </p>
                </div>
            </div>
            {/* Class Management Tools for Educators */}
            <div className="flex flex-col md:flex-row items-center mt-12">
                <div data-aos="fade-right" className="md:w-5/12">
                    <h1 className="text-darken font-semibold text-3xl leading-tight lg:pr-32">
                        <span className="text-yellow-500">Class Management</span> Tools for
                        Educators
                    </h1>
                    <p className="my-5 lg:pr-14">
                        Class provides tools to help run and manage the class such as Class
                        Roster, Attendance, and more. With the Gradebook, teachers can review
                        and grade tests and quizzes in real-time.
                    </p>
                </div>
                <img data-aos="fade-left" className="md:w-7/12" src={gradebook} />
            </div>
            {/* One-on-One Discussions */}
            <div className="mt-24 flex flex-col-reverse md:flex-row items-center md:space-x-10">
                <div data-aos="fade-right" className="md:w-7/12">
                    <img className="md:w-11/12" src={discussion} />
                </div>
                <div
                    data-aos="fade-left"
                    className="md:w-5/12 md:transform md:-translate-y-6"
                >
                    <h1 className="font-semibold text-darken text-3xl lg:pr-64">
                        One-on-One <span className="text-yellow-500">Discussions</span>
                    </h1>
                    <p className="text-gray-500 my-5 lg:pr-24">
                        Teachers and teacher assistants can talk with students privately without
                        leaving the Zoom environment.
                    </p>
                </div>
            </div>
            <button
                data-aos="flip-up"
                className="px-5 py-3 border border-yellow-500 text-yellow-500 font-medium my-14 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out rounded-full mx-auto block"
            >
                See more features
            </button>
            {/* INTEGRATIONS */}
            <div className="mt-24 flex flex-col md:flex-row items-start md:space-x-10">
                <div data-aos="zoom-in-right" className="md:w-6/12">
                    <img className="md:w-8/12 mx-auto" src={integration} />
                </div>
                <div data-aos="zoom-in-left" className="md:w-6/12">
                    <div className="flex items-center space-x-20 mb-5">
                        <span className="border border-gray-300 w-14 absolute" />
                        <h1 className="text-gray-400 tracking-widest text-sm">INTEGRATIONS</h1>
                    </div>
                    <h1 className="font-semibold text-darken text-2xl lg:pr-40">
                        200+ educational tools and platform{" "}
                        <span className="text-yellow-500">integrations</span>
                    </h1>
                    <p className="text-gray-500 my-5 lg:pr-20">
                        Schoology has every tool your classroom needs and comes pre-integrated
                        with more than 200+ tools, student information systems (SIS), and
                        education platforms.
                    </p>
                    <button className="px-5 py-3 border border-yellow-500 text-yellow-500 font-medium my-4 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out rounded-full">
                        See All Integrations
                    </button>
                </div>
            </div>
            {/* TESTIMONIAL */}
            <div className="mt-24 flex flex-col-reverse md:flex-row items-start md:space-x-10">
                <div data-aos="zoom-in-right" className="md:w-5/12">
                    <div className="flex items-center space-x-20 mb-5">
                        <span className="border border-gray-300 w-14 absolute" />
                        <h1 className="text-gray-400 tracking-widest text-sm">TESTIMONIAL</h1>
                    </div>
                    <h1 className="font-semibold text-darken text-2xl lg:pr-40">
                        What They Say?
                    </h1>
                    <p className="text-gray-500 my-5 lg:pr-36">
                        CodeMentees  has got more than 100k positive ratings from our users around
                        the world.
                    </p>
                    <p className="text-gray-500 my-5 lg:pr-36">
                        Some of the students and teachers were greatly helped by the CodeMentees .
                    </p>
                    <p className="text-gray-500 my-5 lg:pr-36">
                        Are you too? Please give your assessment
                    </p>
                    <button className="flex items-center space-x-3 pl-3 border-b border-l border-t border-yellow-500 text-yellow-500 font-medium my-4 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out rounded-full">
                        <span>Write your assessment</span>
                        <div className="border border-yellow-500 h-14 w-14 rounded-full flex items-center justify-center">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 26 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.2929L19.3431 0.928934C18.9526 0.538409 18.3195 0.538409 17.9289 0.928934C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM-8.74228e-08 9L25 9L25 7L8.74228e-08 7L-8.74228e-08 9Z"
                                    fill="#F48C06"
                                />
                            </svg>
                        </div>
                    </button>
                </div>
                <div data-aos="zoom-in-left" className="md:w-7/12">
                    <img className="md:w-10/12 mx-auto" src={testimonials} />
                </div>
            </div>


            {/* news section  */}

            <>
                <div data-aos="zoom-in" className="mt-16 text-center">
                    <h1 className="text-darken text-2xl font-semibold">
                        Latest News and Resources
                    </h1>
                    <p className="text-gray-500 my-5">
                        See the developments that have occurred to CodeMentees s in the world
                    </p>
                </div>
                <div
                    data-aos="zoom-in-up"
                    className="my-14 flex flex-col lg:flex-row lg:space-x-20"
                >
                    <div className="lg:w-6/12">
                        <img className="w-full mb-6" src={laptopnews} />
                        <span className="bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full">
                            NEWS
                        </span>
                        <h1 className="text-gray-800 font-semibold my-3 text-xl">
                            Class adds $30 million to its balance sheet for a Zoom-friendly edtech
                            solution
                        </h1>
                        <p className="text-gray-500 mb-3">
                            Class, launched less than a year ago by Blackboard co-founder Michael
                            Chasen, integrates exclusively...
                        </p>
                        <a href="" className="underline">
                            Read more
                        </a>
                    </div>
                    <div className="lg:w-7/12 flex flex-col justify-between mt-12 space-y-5 lg:space-y-0 lg:mt-0">
                        <div className="flex space-x-5">
                            <div className="w-4/12">
                                <div className="relative">
                                    <img className="rounded-xl w-full" src={childrenlaptop} />
                                    <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full hidden sm:block">
                                        PRESS RELEASE
                                    </span>
                                </div>
                            </div>
                            <div className="w-8/12">
                                <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                                    Class Technologies Inc. Closes $30 Million Series A Financing to
                                    Meet High Demand
                                </h1>
                                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md">
                                    Class Technologies Inc., the company that created Class,...
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-5">
                            <div className="w-4/12">
                                <div className="relative">
                                    <img className="rounded-xl w-full" src="img/girl-laptop.png" />
                                    <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full hidden sm:block">
                                        NEWS
                                    </span>
                                </div>
                            </div>
                            <div className="w-8/12">
                                <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                                    Zoom’s earliest investors are betting millions on a better Zoom for
                                    schools
                                </h1>
                                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md">
                                    Zoom was never created to be a consumer product. Nonetheless, the...
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-5">
                            <div className="w-4/12">
                                <div className="relative">
                                    <img className="rounded-xl w-full" src={catlaptop} />
                                    <span className="absolute bottom-2 right-2 bg-yellow-300 text-darken font-semibold px-4 py-px text-sm rounded-full hidden sm:block">
                                        NEWS
                                    </span>
                                </div>
                            </div>
                            <div className="w-8/12">
                                <h1 className="text-gray-800 text-sm sm:text-lg font-semibold">
                                    Former Blackboard CEO Raises $16M to Bring LMS Features to Zoom
                                    Classrooms
                                </h1>
                                <p className="text-gray-500 my-2 sm:my-4 text-xs sm:text-md">
                                    This year, investors have reaped big financial returns from betting
                                    on Zoom...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>


        </div>
    )
}

export default Hero2