import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { FaHome, FaFileAlt, FaBook, FaQuestionCircle, FaGlobe, FaComments, FaCalendarAlt } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const menuItems = [
  { id: 1, title: "Overview", icon: <FaHome />, link: "#" },
  {
    id: 2,
    title: "Post",
    icon: <FaFileAlt />,
    subItems: [
      { id: 21, title: "Add Post", link: "/dashboard/add-post" },
      { id: 22, title: "Post List", link: "/dashboard/post-list" },
      { id: 23, title: "Calendar", link: "#" },
    ],
  },
  {
    id: 3,
    title: "Course",
    icon: <FaBook />,
    subItems: [
      { id: 31, title: "Add Course", link: "/dashboard/add-course" },
      { id: 32, title: "Course List", link: "/dashboard/course-list" },
      { id: 33, title: "Add Category", link: "/dashboard/add-category" },
    ],
  },
  {
    id: 4,
    title: "Query",
    icon: <FaQuestionCircle />,
    subItems: [{ id: 41, title: "Queries", link: "/dashboard/query-list" }],
  },
  {
    id: 5,
    title: "Site",
    icon: <FaGlobe />,
    subItems: [{ id: 51, title: "Update Site", link: "/dashboard/add-site-data" }],
  },
  {
    id: 6,
    title: "Chat",
    icon: <FaComments />,
    subItems: [{ id: 61, title: "Add Group", link: "/dashboard/create-group" }],
  },
  {
    id: 7,
    title: "Events",
    icon: <FaCalendarAlt />,
    subItems: [{ id: 71, title: "Add Event", link: "/dashboard/create-event" }],
  },
];

function DashboardLayout() {
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    initFlowbite();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="antialiased bg-dark-background">
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
      >
        <div className="overflow-y-auto py-5 px-3 h-full">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.subItems ? (
                  <>
                    <button
                      type="button"
                      className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      onClick={() => toggleDropdown(item.id)}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="flex-1 ml-3 text-left">{item.title}</span>
                      {openDropdowns[item.id] ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </button>
                    {openDropdowns[item.id] && (
                      <ul className="py-2 space-y-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.id}>
                            <Link
                              to={subItem.link}
                              className="flex items-center p-2 pl-11 text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.link}
                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="ml-3">{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main className="p-4 md:ml-64 h-auto pt-0">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
