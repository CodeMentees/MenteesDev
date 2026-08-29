import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaAward, FaUserCircle } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const studentMenuItems = [
  { id: 1, title: "My Courses", icon: <FaBook />, link: "/student/courses" },
  { id: 2, title: "Live Classes", icon: <FaCalendarAlt />, link: "/student/live-classes" },
  { id: 3, title: "Certificates", icon: <FaAward />, link: "/student/certificates" },
  { id: 4, title: "Profile", icon: <FaUserCircle />, link: "/student/profile" },
];

function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="flex dashboard-shell">
      {/* ── Sidebar ── */}
      <aside
        className={`dashboard-sidebar w-64 fixed h-full overflow-y-auto pb-24 no-scrollbar z-30 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ top: 0 }}
      >
        {/* Brand */}
        <div
          className="px-5 py-5 border-b"
          style={{ borderColor: "rgba(var(--dash-border))" }}
        >
          <Link to="/" className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-black"
              style={{ background: "rgb(var(--accent))" }}
            >
              C
            </span>
            <span className="dashboard-brand text-white text-base">
              My Learning
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {studentMenuItems.map((item) => {
              const active = isActive(item.link);
              return (
                <li key={item.id}>
                  <Link
                    to={item.link}
                    className={`dashboard-link w-full justify-start ${
                      active ? "dashboard-link-active" : ""
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-base opacity-80">{item.icon}</span>
                      <span>{item.title}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* ── Main Content Wrapper ── */}
      <main
        className="flex-1 flex flex-col min-h-screen transition-all md:ml-64 relative"
        style={{ background: "rgb(var(--dash-bg))" }}
      >
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white border-b border-gray-800 sticky top-0 z-20">
          <span className="font-bold">My Learning</span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-gray-800 rounded text-gray-300"
          >
            ☰
          </button>
        </header>

        {/* Inner Content Area */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 max-w-7xl mx-auto w-full">
          <div className="dashboard-content-wrapper rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default StudentDashboard;
