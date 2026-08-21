import React, { useEffect, useState } from "react";
import generatePdf from "../utils/genrateCoursePdf";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SEOHead from "../seo/SEOHead";
import { useDynamicSEO } from "../seo/useDynamicSEO";
import QueryForm from "../Components/Forms/QueryForm";
import Loading from "../Components/Helpers/Loading";
import { useCourse } from "../api/courseApi";

function CourseDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
    } else {
      setShowQuery(true);
    }
  };


  const { fetchCourse } = useCourse();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [showQuery, setShowQuery] = useState(false);
  const [activeSection, setActiveSection] = useState(null);


  useEffect(() => {
    if (!courseId) return;

    const fetchCourseDetails = async () => {
      const response = await fetchCourse(courseId);
      setCourse(response.data);
    };

    fetchCourseDetails();
  }, [courseId]);

  const seoProps = useDynamicSEO('course', course);

  if (!course) return <Loading />;

  return (
    <div className="bg-dark-background pb-10 overflow-x-hidden">
      <SEOHead path="/courses/:courseId" {...seoProps} />
      {showQuery && <QueryForm setQuery={setShowQuery} courseName={course.name} />}

      <div className="flex flex-col lg:flex-row gap-6 p-6 lg:p-12 mx-auto max-w-6xl bg-dark-background">
        {/* Left Section */}
        <div className="lg:w-2/3">
          <img className="inline h-16" src={course.image} alt="Course" />
          <h1 className="text-2xl font-bold text-white mt-4">{course.name}</h1>
          <p className="lg:border-l px-2 mt-4 text-gray-300 text-sm leading-relaxed">
            {course.description}
          </p>

          <button
            onClick={handleEnrollClick}
            className="mt-6 text-white border-2 border-blue-900 shadow-md hover:bg-blue-900 transition-all duration-300 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Enroll Now
          </button>

          <div className="bg-blue-900 py-5 flex flex-wrap justify-around rounded-lg mt-6 shadow-lg">
            {[
              { label: "Problems", value: "350+" },
              { label: "Live Projects", value: "6" },
              { label: "Duration", value: "4/6 Months" },
              { label: "Mode", value: "Classroom | Live | Online" },
            ].map(({ label, value }) => (
              <div key={label} className="text-sm text-white text-center">
                <span className="font-bold">{value}</span>
                <div className="text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="mx-6 px-6 py-10 lg:w-1/3 text-center bg-gray-800 rounded-lg border-2 border-dark-btn shadow-lg">
          <p className="text-gray-400 text-lg text-left">Starting from</p>
          <div className="flex items-baseline flex-wrap mt-2">
            <span className="mr-2 text-xl line-through text-gray-400">₹2500/month</span>
            <span className="mr-2 text-3xl font-extrabold text-white">₹1599</span>
            <span className="text-blue-400">/month</span>
          </div>

          <ul className="mb-8 mt-6 text-left space-y-2">
            <li className="font-bold text-white">Key Highlights</li>
            {course.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <svg className="w-5 h-5 text-green-500" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleEnrollClick}
            className="text-white bg-blue-900 hover:bg-dark-background transition-all duration-300 font-medium rounded-full text-sm px-6 py-3"
          >
            Enroll Course
          </button>
        </div>
      </div>

      {/* Syllabus Section */}
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Syllabus</h2>
          <button
            onClick={() => generatePdf(course.details)}
            className="text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 rounded-lg px-5 py-2 shadow-md"
          >
            Download Syllabus
          </button>
        </div>

        {/* Syllabus as List (Accordion) */}
        <div className="space-y-4">
          {course.details?.map((section, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-lg shadow-md"
            >
              {/* Clickable Section Title */}
              <button
                onClick={() => setActiveSection(prev => (prev === index ? null : index))}
                className="w-full text-left px-6 py-4 bg-gray-800 text-white font-semibold flex justify-between items-center transition-all duration-300 hover:bg-gray-700"
              >
                {section.label}
                <span className="text-blue-500">{activeSection === index ? "▲" : "▼"}</span>
              </button>

              {/* Section Content (Expandable) */}
              <div
                className={`transition-all duration-300 ease-in-out ${activeSection === index ? "max-h-screen opacity-100 p-6 bg-gray-900" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
              >
                <ul className="space-y-4">
                  {section.content.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-4 bg-gray-800 rounded-lg transition-all duration-300 hover:bg-gray-700"
                    >
                      <strong className="text-blue-400 block mb-1">{item.title}</strong>
                      <p className="text-sm text-gray-400">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
