import React from "react";

const Sidebar = ({ menuItems }) => {
  const renderIcon = (icon) => {
    return (
      <svg
        aria-hidden="true"
        className="flex-shrink-0 w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={icon} />
      </svg>
    );
  };

  return (
    <div className="overflow-y-auto py-5 px-3 h-full bg-dark-box border-r border-gray-200 ">
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.submenu ? (
              <>
                <button
                  type="button"
                  className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls={`dropdown-${item.label}`}
                  data-collapse-toggle={`dropdown-${item.label}`}
                >
                  {renderIcon(item.icon)}
                  <span className="flex-1 ml-3 text-left whitespace-nowrap">
                    {item.label}
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
                  id={`dropdown-${item.label}`}
                  className="hidden py-2 space-y-2"
                >
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <a
                        href={subItem.href}
                        className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      >
                        {subItem.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <a
                href={item.href}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                {renderIcon(item.icon)}
                <span className="ml-3">{item.label}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
