import React, { useState, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaHome, FaFileAlt, FaBook, FaQuestionCircle, FaGlobe, FaComments, FaCalendarAlt, FaUsers, FaEnvelope } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const ALL_MENU_ITEMS = [
  { id: 1, title: "Overview", icon: <FaHome />, link: "/admin" },
  {
    id: 2,
    title: "Posts",
    icon: <FaFileAlt />,
    permission: "manage_content",
    subItems: [
      { id: 22, title: "Blog List", link: "/admin/posts" },
      { id: 23, title: "Categories", link: "/admin/posts/categories" },
      { id: 24, title: "Create Post", link: "/admin/posts/create" },
    ],
  },
  {
    id: 3,
    title: "Courses",
    icon: <FaBook />,
    permission: "manage_courses",
    subItems: [
      { id: 32, title: "Course List", link: "/admin/courses" },
      { id: 33, title: "Create Course", link: "/admin/courses/create" },
      { id: 34, title: "Categories", link: "/admin/categories" },
      { id: 35, title: "School Course List", link: "/admin/school-courses" },
    ],
  },
  {
    id: 4,
    title: "Queries",
    icon: <FaQuestionCircle />,
    permission: "manage_queries",
    subItems: [
      { id: 41, title: "Query List", link: "/admin/queries" },
      { id: 42, title: "School Coding Leads", link: "/admin/school-coding-leads" },
    ],
  },
  {
    id: 5,
    title: "Site",
    icon: <FaGlobe />,
    permission: "manage_site",
    subItems: [{ id: 51, title: "Update Site", link: "/admin/site-settings" }],
  },
  {
    id: 6,
    title: "Chat",
    icon: <FaComments />,
    permission: "manage_chat",
    subItems: [{ id: 61, title: "Create Group", link: "/admin/groups/create" }],
  },
  {
    id: 7,
    title: "Events",
    icon: <FaCalendarAlt />,
    permission: "manage_content",
    subItems: [
      { id: 71, title: "Create Event", link: "/admin/events/create" },
      { id: 72, title: "Events", link: "/admin/events" },
    ],
  },
  {
    id: 9,
    title: "Live Courses",
    icon: <FaBook />,
    permission: "manage_live",
    subItems: [
      { id: 91, title: "Live Course List", link: "/admin/live-courses" },
      { id: 92, title: "Create Live Course", link: "/admin/live-courses/create" },
    ],
  },
  {
    id: 8,
    title: "Users",
    icon: <FaUsers />,
    permission: "manage_users",
    subItems: [{ id: 81, title: "Users", link: "/admin/users" }],
  },
  {
    id: 10,
    title: "Jobs",
    icon: <FaFileAlt />,
    permission: "manage_careers",
    subItems: [
      { id: 101, title: "Job List", link: "/admin/jobs" },
      { id: 102, title: "Post Job", link: "/admin/jobs/create" },
    ],
  },
  {
    id: 11,
    title: "Interns",
    icon: <FaUsers />,
    permission: "manage_careers",
    subItems: [{ id: 111, title: "Applicants", link: "/admin/interns" }],
  },
  {
    id: 12,
    title: "Bulk Mail",
    icon: <FaEnvelope />,
    permission: "manage_mail",
    link: "/admin/bulk-mail",
  },
];

function DashboardLayout() {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // Filter menu items based on user permissions
  const menuItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => {
      // Overview is available to all admin users
      if (!item.permission) return true;
      // Super admins see everything
      if (user?.role === "super admin" || user?.isAdmin) return true;
      // Others must have the specific permission
      return user?.permissions?.includes(item.permission);
    });
  }, [user]);

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isActive = (path) => location.pathname === path;
  const isParentActive = (subItems) =>
    subItems?.some((sub) => location.pathname === sub.link);

  return (
    <div className="flex dashboard-shell">
      {/* ── Sidebar ── */}
      <aside
        className="dashboard-sidebar w-64 fixed h-full overflow-y-auto pb-24 no-scrollbar z-30"
        style={{ top: 0 }}
      >
        {/* Brand */}
        <div
          className="px-5 py-5 border-b"
          style={{ borderColor: "rgba(var(--dash-border))" }}
        >
          <Link to="/admin" className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-black"
              style={{ background: "rgb(var(--accent))" }}
            >
              C
            </span>
            <span className="dashboard-brand text-white text-base">
              Admin Panel
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const parentActive = isParentActive(item.subItems);
              const isOpen = openDropdowns[item.id] || parentActive;

              return (
                <li key={item.id}>
                  {item.subItems ? (
                    <>
                      {/* Parent toggle */}
                      <button
                        className={`dashboard-link w-full justify-between ${parentActive ? "dashboard-link-active" : ""}`}
                        onClick={() => toggleDropdown(item.id)}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base opacity-80">{item.icon}</span>
                          <span>{item.title}</span>
                        </span>
                        <span className="text-xs opacity-50">
                          {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </span>
                      </button>

                      {/* Sub-items */}
                      {isOpen && (
                        <ul
                          className="mt-1 ml-4 space-y-0.5 pl-3"
                          style={{ borderLeft: "1px solid rgba(var(--dash-border))" }}
                        >
                          {item.subItems.map((subItem) => (
                            <li key={subItem.id}>
                              <Link
                                to={subItem.link}
                                className={`dashboard-link text-xs py-2 ${isActive(subItem.link) ? "dashboard-link-active" : ""}`}
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
                      className={`dashboard-link ${isActive(item.link) ? "dashboard-link-active" : ""}`}
                    >
                      <span className="text-base opacity-80">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="ml-64 flex-1 min-h-screen p-6 page-enter"
        style={{ background: "rgb(var(--dash-bg))" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;