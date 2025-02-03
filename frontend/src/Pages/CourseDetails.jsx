import React, { useCallback, useEffect, useRef, useState } from "react";
import generatePdf from "../utils/genrateCoursePdf";
import axios from "axios";
import { useParams } from "react-router-dom";
import QueryForm from "../Components/Forms/QueryForm";


function CourseDetails() {
    const [activeTab, setActiveTab] = useState(1); // Default to the first tab
    const [details, setDetails] = useState();
    const { courseId } = useParams({});

    // Refs for each content section
    const sectionRefs = useRef([]);

    const handleTabClick = useCallback((id) => {
        setActiveTab(id);
        const section = document.getElementById(`tab-${id}`);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    useEffect(() => {
        if (courseId) {
            axios
                .get(`/api/course/${courseId}`)
                .then((response) => {
                    const fetchedDetails = response.data.data;
                    console.log("opa", fetchedDetails)
                    setDetails(fetchedDetails); // Use the fetched details if available
                })
                .catch((err) => {
                    console.log(err)
                    setError("Failed to fetch course details.");
                });
        }
    }, [courseId]);


    // IntersectionObserver to detect which section is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id.split("-")[1]; // Extract tab ID from section ID
                        setActiveTab(Number(id)); // Update active tab state
                    }
                });
            },
            {
                root: document.querySelector(".content-container"), // Observe within the scrollable container
                rootMargin: "-50px 0px -50px 0px", // Expand the detection area slightly
                threshold: 0.1, // Trigger when 10% of the section is visible
            }
        );

        // Observe each section
        sectionRefs.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        // Cleanup observer on unmount
        return () => {
            sectionRefs.current.forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);

    return (
        (details) ?
            <>
                <QueryForm courseName={details.name} />
                <div className="min-h-64 dark:bg-blue-700 relative">
                    <div className=" grid grid-cols-2 lg:grid-cols-6 ">
                        <div className="max-w-3xl p-4 lg:pl-8 col-span-4 h-80 mx-auto relative  py-8 my-8 dark:bg-blue-700">
                            <img
                                className="inline"
                                style={{ height: "64px" }}
                                src="/images/c-sharp.png"
                                alt={"jjjjjjjj"}
                            />
                            <h1 className="text-xl inline mx-2 font-bold text-gray-800 dark:text-white mb-4">
                                {details.name}
                            </h1>
                            <p className="text-gray-600 lg:border-l px-2 my-8 text-sm mb-6 dark:text-white">
                                {details.description}
                            </p>
                            <button
                                data-modal-target="crud-modal"
                                data-modal-toggle="crud-modal"
                                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                Choose Batch
                            </button>
                            <div className="lg:absolute h-sm lg:h-12 py-8  -bottom-6 container max-w-screen-sm lg:ml-4  bg-white-700 dark:bg-gray-700">
                                <div className="grid grid-cols-1 bottom-1 lg:absolute grid-cols-4  md:grid-cols-4 gap-3 text-center">
                                    <div className="text-center">
                                        <div className="text-xs lg:text-sm  text-white-600 dark:text-white">
                                            350+
                                        </div>
                                        <div className="text-gray-600 text-xs lg:text-sm text-white-600 dark:text-white">
                                            problems
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-xs lg:text-sm  text-white-600 dark:text-white">6</div>
                                        <div className="text-white-600 text-xs lg:text-sm dark:text-white">
                                            Live projects
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <div className="text-xs lg:text-sm text-white-600 dark:text-white">4/6</div>
                                        <div className="text-white-600 text-xs lg:text-sm dark:text-white">
                                            Duration
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs lg:text-sm text-white-600 dark:text-white">
                                            Classroom | Live | Online
                                        </div>
                                        <div className="text-white-600 text-xs dark:text-white ">
                                            Mode of Delivery
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col  lg:absolute right-0 mx-10  col-span-2 p-6 mt-8 mx-left max-w-sm text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
                            <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                                Starting from
                            </p>
                            <div className="flex justify-center items-baseline my-4">
                                <span className="mr-2 text-xl font-extrabold">₹5000</span>
                                <span className="text-gray-500 dark:text-gray-400">/month</span>
                            </div>
                            {/* List */}
                            <ul role="list" className="mb-8 space-y-4 text-left">
                                <p>Key Highlight</p>

                                {details.features.map((feature) => {
                                    return <>
                                        <li className="flex items-center space-x-3">
                                            {/* Icon */}
                                            <svg
                                                className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span>{feature}</span>
                                        </li></>
                                })}
                            </ul>
                            <a
                                href="#"
                                data-modal-target="crud-modal"
                                data-modal-toggle="crud-modal"
                                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
                            >
                                Choose Batch
                            </a>
                        </div>
                    </div>
                </div >
                <div className="dark:bg-gray-800 pt-32 ">
                    <div className="container mx-auto max-w-6xl dark:bg-gray-900 px-4 py-4 mx-auto flex  justify-between align-center">
                        <div className="">
                            <i className="fa-solid fa-book inline text-white"></i>
                            <p className="text-xl text-white inline ">Syllabus</p>
                        </div>

                        <button onClick={() => generatePdf(details.details)} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 border-2 border-transparent hover:border-red-500">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                Download Syllabus
                            </span>
                        </button>

                    </div>
                    <div className="md:flex container mx-auto max-w-6xl ">
                        {/* Tabs */}
                        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                            {details.details.map((tab) => (
                                <li key={tab.id}>
                                    <button
                                        onClick={() => handleTabClick(tab.id)}
                                        className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${activeTab === tab.id
                                            ? "text-white bg-blue-700 dark: bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600" // Active tab style
                                            : "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white" // Inactive tab style
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Content Sections */}
                        <div
                            className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full overflow-y-auto max-h-[500px] content-container  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-red-100
  [&::-webkit-scrollbar-thumb]:bg-red-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-pink-500"
                        >
                            {details.details.map((tab, index) => (
                                <div
                                    key={tab.id}
                                    id={`tab-${tab.id}`}
                                    ref={(el) => (sectionRefs.current[index] = el)} // Assign ref to each section
                                    className="mb-8"
                                >
                                    <h2 className="text-xl font-bold mb-4">{tab.label}</h2>
                                    <ul>
                                        {tab.content.map((item, index) => (
                                            <li key={index} className="mb-4">
                                                <strong>{item.title}</strong>
                                                <br />
                                                {item.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
            : <>Loading.......</>
    );
}

export default CourseDetails;
