import React, { useCallback, useEffect, useRef, useState } from "react";
import generatePdf from "../utils/genrateCoursePdf";
import axios from "axios";
import { useParams } from "react-router-dom";
import QueryForm from "../Components/Forms/QueryForm";
import Loading from "../Components/Helpers/Loading";
import NoData from "../Components/Helpers/NotData";

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
          setDetails(fetchedDetails); // Use the fetched details if available
        })
        .catch((err) => {
          console.log(err);
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

  return details ? (
    <div className="bg-dark-background pb-10 overflow-x-hidden">
      <QueryForm courseName={details.name} />

      <div className=" flex flex-col lg:flex-row gap-4 p-12 mx-auto justify-center container max-w-6xl bg-dark-background">
        <div className="lg:w-2/3">
          <img
            className="inline"
            style={{ height: "64px" }}
            src="/images/c-sharp.png"
            alt={"image"}
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
            className="text-white mb-4 border-2 border-blue-900 shadow-indigo-700  shadow-sm  hover:bg-blue-900 font-medium rounded-full text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 "
          >
            Choose Batch
          </button>

          <div className="bg-blue-900 py-4 flex justify-around w-full">
            <div className="text-xs lg:text-sm  text-white-600 dark:text-white">
              350+
              <div className="text-gray-600 text-xs lg:text-sm text-white-600 dark:text-white">
                problems
              </div>
            </div>

            <div className="text-xs lg:text-sm  text-white-600 dark:text-white">
              6
              <div className="text-white-600 text-xs lg:text-sm dark:text-white">
                Live projects
              </div>
            </div>

            <div className="text-xs lg:text-sm text-white-600 dark:text-white">
              4/6
              <div className="text-white-600 text-xs lg:text-sm dark:text-white">
                Duration
              </div>
            </div>

            <div className="text-xs lg:text-sm text-white-600 dark:text-white">
              Classroom | Live | Online
              <div className="text-white-600 text-xs dark:text-white ">
                Mode of Delivery
              </div>
            </div>
          </div>
        </div>

        <div className="mx-6 px-6 py-10 lg:w-1/3 text-center bg-dark-primary rounded-lg border-2 border-blue-900 shadow-lg ">
          <p className="text-dark-background sm:text-lg text-left font-[Helvetica_Neue] ">
            Starting from
          </p>
          <div className="flex justify-left items-baseline">
            <span className="mr-2 text-3xl font-extrabold">₹5000</span>
            <span className="text-blue-900">/month</span>
          </div>
          {/* List */}
          <ul role="list" className="mb-8 space-y-4 text-left">
            <p className="bold font-arial">Key Highlight</p>

            {details.features.map((feature) => {
              return (
                <>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="blue"
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
                  </li>
                </>
              );
            })}
          </ul>
          <a
            href="#"
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="text-white  bg-blue-900  hover:bg-dark-background shadow-lg font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Choose Batch
          </a>
        </div>
      </div>

      <div className="bg-dark-box pt-12 lg:pt-32 ">
        <div className="container mx-auto max-w-6xl dark:bg-gray-900 px-4 py-4 mx-auto flex  justify-between align-center">
          <div className="">
            <i className="fa-solid fa-book inline text-white"></i>
            <p className="text-xl text-white inline ">Syllabus</p>
          </div>

          <button
            onClick={() => generatePdf(details.details)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-dark-accent hover:bg-blue-900 rounded-lg "
          >
            <span className=" px-5 py-2.5 transition-all ease-in duration-75 border border-blue-900 rounded-md shadow-indigo-700  shadow-md ">
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
                  className={`inline-flex items-center px-4 py-3 rounded-lg w-full ${
                    activeTab === tab.id
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
            className="p-0 bg-gray-50 text-medium text-dark-background dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full overflow-y-auto max-h-[500px] content-container  [&::-webkit-scrollbar]:w-2
                      [&::-webkit-scrollbar-track]:bg-red-100
                      [&::-webkit-scrollbar-thumb]:bg-red-300
                      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                      dark:[&::-webkit-scrollbar-thumb]:bg-pink-500"
          >
            {details.details ? (
              <NoData />
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default CourseDetails;
