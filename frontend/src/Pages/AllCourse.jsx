import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import CourseCard from "../Components/Card/CourseCard";
import { SkeletonGrid } from "../Components/UI/LoadingSpinner";
import { useCourse } from "../api/courseApi";
import { useCategoryAPI } from "../api/categoryApi";

function AllCourse() {
  const { fetchCourseByCategory } = useCourse();
  const { fetchCategories } = useCategoryAPI();

  const [activeTab, setActiveTab] = useState(null);
  const [activeTabData, setActiveTabData] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        if (data.categories.length > 0) {
          setTabs(data.categories);
          await handleTabClick(data.categories[0]._id, data.categories[0], true);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleTabClick = async (tabId, tabData, isInitial = false) => {
    setActiveTab(tabId);
    setActiveTabData(tabData);
    if (!isInitial) setTabLoading(true);
    try {
      const fetchedCourse = await fetchCourseByCategory(tabId);
      setCourses(fetchedCourse.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setTabLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-24 pb-20"
      style={{ background: "rgb(var(--bg))" }}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": activeTabData?.name ? `${activeTabData.name} Courses | CodeMentees` : "All Courses | CodeMentees",
            "description": activeTabData?.description || "Explore mentor-led courses in Web Development, DSA, and Interview Preparation at CodeMentees.",
            "url": "https://codementees.com/courses",
            "provider": {
              "@type": "Organization",
              "name": "CodeMentees",
              "url": "https://codementees.com"
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page header */}
        <div className="mb-10 fade-in">
          <span className="badge-soft mb-3 inline-flex">All Courses</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2" style={{ letterSpacing: "-0.03em" }}>
            Course Categories
          </h1>
          <p className="text-base" style={{ color: "rgb(var(--text-secondary))" }}>
            Browse mentor-led courses by category and find the right path for you.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">

          {/* ── Category sidebar ── */}
          <aside className="w-full md:w-56 shrink-0">
            {initialLoading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-12 rounded-xl animate-pulse"
                    style={{ background: "rgb(var(--surface))" }}
                  />
                ))}
              </div>
            ) : (
              <ul className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {tabs.map((tab) => (
                  <li key={tab._id} className="shrink-0">
                    <button
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl w-full text-left text-sm font-medium transition-all duration-200 whitespace-nowrap"
                      style={{
                        background: activeTab === tab._id
                          ? "rgba(249,115,22,0.12)"
                          : "rgb(var(--surface))",
                        border: activeTab === tab._id
                          ? "1px solid rgba(249,115,22,0.3)"
                          : "1px solid rgba(var(--border))",
                        color: activeTab === tab._id
                          ? "rgb(249,115,22)"
                          : "rgb(var(--text-secondary))",
                        fontWeight: activeTab === tab._id ? 600 : 500,
                      }}
                      onClick={() => handleTabClick(tab._id, tab)}
                      aria-current={activeTab === tab._id ? "page" : undefined}
                    >
                      {tab.image && (
                        <img src={tab.image} alt={tab.name} className="h-6 w-6 object-contain" loading="lazy" />
                      )}
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </aside>

          {/* ── Course content area ── */}
          <section className="flex-1 min-w-0">
            {initialLoading || tabLoading ? (
              <SkeletonGrid count={6} />
            ) : activeTabData ? (
              <div className="fade-in">
                <CourseCard category={activeTabData} courses={courses} />
                {courses.length === 0 && (
                  <div
                    className="text-center py-16 rounded-2xl"
                    style={{ background: "rgb(var(--surface))", border: "1px solid rgba(var(--border))" }}
                  >
                    <p className="text-4xl mb-3">📚</p>
                    <p className="font-semibold text-white mb-1">No courses yet</p>
                    <p className="text-sm" style={{ color: "rgb(var(--text-secondary))" }}>
                      Check back soon — new courses are being added regularly.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16" style={{ color: "rgb(var(--text-secondary))" }}>
                No category selected.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default AllCourse;
