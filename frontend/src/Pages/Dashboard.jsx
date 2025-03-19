import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { initFlowbite } from "flowbite";
import { FaHome, FaFileAlt, FaBook, FaQuestionCircle, FaGlobe, FaComments, FaCalendarAlt, FaUsers } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const menuItems = [
  { id: 1, title: "Overview", icon: <FaHome />, link: "/admin" },
  {
    id: 2,
    title: "Posts",
    icon: <FaFileAlt />,
    subItems: [
      { id: 21, title: "Create Post", link: "/admin/posts/create" },
      { id: 22, title: "Post List", link: "/admin/posts" },
      { id: 23, title: "Categories", link: "/admin/posts/categories" },
    ],
  },
  {
    id: 3,
    title: "Courses",
    icon: <FaBook />,
    subItems: [
      { id: 31, title: "Create Course", link: "/admin/courses/create" },
      { id: 32, title: "Course List", link: "/admin/courses" },
      { id: 33, title: "Categories", link: "/admin/categories" },
    ],
  },
  {
    id: 4,
    title: "Queries",
    icon: <FaQuestionCircle />,
    subItems: [{ id: 41, title: "Query List", link: "/admin/queries" }],
  },
  {
    id: 5,
    title: "Site",
    icon: <FaGlobe />,
    subItems: [{ id: 51, title: "Update Site", link: "/admin/site-settings" }],
  },
  {
    id: 6,
    title: "Chat",
    icon: <FaComments />,
    subItems: [{ id: 61, title: "Create Group", link: "/admin/groups/create" }],
  },
  {
    id: 7,
    title: "Events",
    icon: <FaCalendarAlt />,
    subItems: [
      { id: 71, title: "Create Event", link: "/admin/events/create" },
      { id: 72, title: "Events", link: "/admin/events" },
    ],
  },
  {
    id: 8,
    title: "Users",
    icon: <FaUsers />,
    subItems: [{ id: 81, title: "Users", link: "/admin/users" }],
  },
];

function DashboardLayout() {
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    initFlowbite();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 p-5 fixed h-full">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.subItems ? (
                <>
                  <button
                    className="flex justify-between items-center p-3 w-full text-left text-gray-900 font-medium rounded-lg hover:bg-gray-200"
                    onClick={() => toggleDropdown(item.id)}
                  >
                    <span className="flex items-center">
                      {item.icon} <span className="ml-3">{item.title}</span>
                    </span>
                    {openDropdowns[item.id] ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {openDropdowns[item.id] && (
                    <ul className="ml-6 space-y-1 border-l border-gray-300 pl-3">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            to={subItem.link}
                            className="block p-2 text-gray-700 rounded hover:bg-gray-300"
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
                  className="flex items-center p-3 text-gray-900 font-medium rounded-lg hover:bg-gray-200"
                >
                  {item.icon} <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;