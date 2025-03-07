import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { initFlowbite } from "flowbite";

const menuItems = [
  {
    id: 1,
    title: "Overview",
    icon: "M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z",
    link: "#",
  },
  {
    id: 2,
    title: "Post",
    icon: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
    subItems: [
      { id: 21, title: "Add Post", link: "/dashboard/add-post" },
      { id: 22, title: "Post List", link: "/dashboard/post-list" },
      { id: 23, title: "Calendar", link: "#" },
    ],
  },
  {
    id: 3,
    title: "Course",
    icon: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
    subItems: [
      { id: 31, title: "Add Course", link: "/dashboard/add-course" },
      { id: 31, title: "Course List", link: "/dashboard/course-list" },
      { id: 32, title: "Add Category", link: "/dashboard/add-category" },
    ],
  },
  {
    id: 4,
    title: "Query",
    icon: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
    subItems: [{ id: 41, title: "Queries", link: "/dashboard/query-list" }],
  },
  {
    id: 5,
    title: "Site",
    icon: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
    subItems: [
      { id: 51, title: "Update Site", link: "/dashboard/add-site-data" },
    ],
  },
  {
    id: 6,
    title: "Chat",
    icon: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
    subItems: [{ id: 61, title: "Add Group", link: "/dashboard/create-group" }],
  },
  {
    id: 7,
    title: "Events",
    icon: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z",
    subItems: [{ id: 71, title: "Add Event", link: "/dashboard/create-event" }],
  },
];

function DashboardLayout() {
  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.subItems ? (
                  <>
                    <button
                      type="button"
                      className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      aria-controls={`dropdown-${item.id}`}
                      data-collapse-toggle={`dropdown-${item.id}`}
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d={item.icon}
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="flex-1 ml-3 text-left whitespace-nowrap">
                        {item.title}
                      </span>
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <ul
                      id={`dropdown-${item.id}`}
                      className="hidden py-2 space-y-2"
                    >
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.link}
                            className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={item.link}
                    className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d={item.icon}
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="ml-3">{item.title}</span>
                  </a>
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
