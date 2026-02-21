import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";  // ✅ Updated import
import CourseCard from "../Components/Card/CourseCard";
import Loading from "../Components/Helpers/Loading";
import { useCourse } from "../api/courseApi";
import { useCategoryAPI } from "../api/categoryApi";

function AllCourse() {
  const { fetchCourseByCategory } = useCourse();
  const { fetchCategories } = useCategoryAPI();

  const [activeTab, setActiveTab] = useState(null);
  const [activeTabData, setActiveTabData] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        if (data.categories.length > 0) {
          setTabs(data.categories);
          handleTabClick(data.categories[0]._id, data.categories[0]); // Auto-select the first category
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = async (tabId, tabData) => {
    setActiveTab(tabId);
    setActiveTabData(tabData);
    setLoading(true);
    try {
      const fetchedCourse = await fetchCourseByCategory(tabId);
      setCourses(fetchedCourse.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container max-w-6xl mx-auto p-4 my-10">
      <Helmet>  {/* ✅ Using react-helmet-async */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": activeTabData?.name || "All Courses",
            "description": activeTabData?.description || "Explore our wide range of coding courses.",
            "provider": {
              "@type": "Organization",
              "name": "Codementees",
              "url": "https://codementees.com"
            }
          })}
        </script>
      </Helmet>

      <div className="md:flex">
        {/* ✅ Tab List */}
        <aside className="w-full md:w-1/4">
          <h2 className="text-lg font-bold text-white mb-3">Course Categories</h2>
          <ul className="flex flex-col space-y-2 text-sm font-medium text-gray-400 md:me-4 mb-4 md:mb-0">
            {tabs.map((tab) => (
              <li key={tab._id}>
                <button
                  className={`flex items-center px-4 py-3 rounded-lg w-full lg:w-64 transition ${
                    activeTab === tab._id
                      ? "text-white bg-blue-600"
                      : "bg-gray-800 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => handleTabClick(tab._id, tab)}
                  aria-current={activeTab === tab._id ? "page" : undefined}
                >
                  {tab.image && <img src={tab.image} alt={tab.name} className="h-10 mr-2" loading="lazy" />}
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* ✅ Tab Content */}
        <section className="w-full md:w-3/4 py-2 px-3 lg:p-6 text-medium text-gray-400 bg-gray-800 rounded-lg">
          {activeTabData ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-4">{activeTabData.name} Courses</h1>
              <CourseCard category={activeTabData} courses={courses} />
            </>
          ) : (
            <p className="text-center text-gray-500">No category selected.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default AllCourse;
