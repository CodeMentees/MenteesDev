import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { initFlowbite } from "flowbite"

function Header() {

  const dispatch = useDispatch();
  // Define the menu items dynamically
  const menuItems = [
    { label: "All Courses", link: "/all-course" },
    { label: "Programs", link: "#" },
    { label: "Live Courses", link: "#" },
    { label: "Schooling Coding", link: "#" },
    { label: "Placement Support", link: "#" },
  ];

  useEffect(() => {
    initFlowbite()
  }, [])

  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header>
      <nav className="sticky top-0 z-50 bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-sm lg:text-xl font-semibold whitespace-nowrap dark:text-white">
              <Link className="text-sm" to={"/"}>CodeMentees</Link>
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {isAuthenticated ? (
              <button
                onClick={() => dispatch(logout())}
                className="text-white hidden sm:visible bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Logout
              </button>
            ) : (
              <div className="hidden lg:block">
                <Link
                  to={"/login"}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  to={"/register"}
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>

  );
}

export default Header;
