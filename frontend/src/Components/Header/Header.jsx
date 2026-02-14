import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { initFlowbite } from "flowbite";
import { FaUserCircle, FaTimes, FaBars } from "react-icons/fa";

function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "All Courses", link: "/courses" },
    { label: "Blogs", link: "/blogs" },
    { label: "Live Courses", link: "#" },
    { label: "School Coding", link: "#" },
    { label: "Placement Support", link: "#" },
  ];

  useEffect(() => {
    initFlowbite();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-dark-background text-dark-text fixed top-0 z-50 w-full shadow-md">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex items-center justify-between mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold" style={{ color: "#CD0094", fontFamily: "Playwrite IT Moderna" }}>
            Codementees
          </Link>

          {/* Desktop Navigation and Auth Buttons */}
          <div className="flex items-center gap-4">
            {/* Desktop Menu Items */}
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="text-dark-text hover:underline font-medium text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>

            <div>
              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center gap-4">
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-dark-text hover:underline font-medium text-sm"
                  >
                    Dashboard
                  </Link>
                )}
                {isAuthenticated ? (
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch('/api/auth/logout', { method: 'POST' });
                        if (response.ok) {
                          dispatch(logout());
                        }
                      } catch (error) {
                        console.error('Logout failed:', error);
                        dispatch(logout()); // Force client-side logout anyway
                      }
                    }}
                    className="text-gray-900 shadow-md bg-dark-btn font-medium rounded-full text-sm px-4 py-2 hover:bg-dark-btn-hover transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" className="text-dark-text hover:text-gray-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors">
                      Log in
                    </Link>
                    <Link to="/register" className="text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 transition-colors">
                      Get started
                    </Link>
                  </>
                )}
                {/* User Icon */}
                <div className="relative">
                  <FaUserCircle className="text-3xl cursor-pointer text-dark-text hover:text-gray-400 transition-colors" />
                </div>
              </div>



            </div>

            {/* Mobile Menu Toggle Button */}

            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex items-center p-2 text-sm text-gray-200 rounded-lg lg:hidden  "
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${menuOpen ? "block" : "hidden"} lg:hidden transition-all`}>
          <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-6 lg:mt-0">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className="block py-2 px-3 border-b lg:border-0 text-dark-text hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 mt-4">
                <Link to="/login" className="text-dark-text hover:text-gray-300 transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="text-white bg-primary-700 hover:bg-primary-800 font-medium rounded-lg text-sm px-4 py-2 transition-colors">
                  Get started
                </Link>
              </div>
            )}
            {isAuthenticated && (
              <div className="flex flex-col gap-2 mt-4">
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    className="block py-2 px-3 border-b lg:border-0 text-dark-text hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/auth/logout', { method: 'POST' });
                      if (response.ok) {
                        dispatch(logout());
                      }
                    } catch (error) {
                      console.error('Logout failed:', error);
                      dispatch(logout());
                    }
                  }}
                  className="text-gray-900 shadow-md bg-dark-btn font-medium rounded-full text-sm px-4 py-2 hover:bg-dark-btn-hover transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;