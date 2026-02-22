import React, { useState, useEffect, useRef } from "react";

const ReusableTable = ({ headers, data, actions, isLoading }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!data) return <>No data provided</>;
    if (!headers) return <>No headers provided</>;
    if (!actions) return <>No actions provided</>;

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} scope="col" className="px-4 py-3">
                            {header}
                        </th>
                    ))}
                    {actions && <th scope="col" className="px-4 py-3 text-right pr-10">Action</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex} className="border-b dark:border-gray-700">
                        {headers.map((header, colIndex) => (
                            <td key={colIndex} className="px-4 py-3">
                                {["createdat", "date", "updatedat"].includes(header.toLowerCase()) ? ( // Format dates
                                    new Date(item[header]).toLocaleString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                        hour12: true,
                                    })
                                ) : Array.isArray(item[header]) ? ( // Display array as chips
                                    <div className="flex flex-wrap gap-2">
                                        {item[header].map((value, index) => (
                                            <span key={index} className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                                                {value}
                                            </span>
                                        ))}
                                    </div>
                                ) : header.toLowerCase() === "image" ? ( // Handle images
                                    <img src={item[header]} alt="Image" className="w-10 h-10 rounded shadow-sm object-cover" />
                                ) : (
                                    item[header]
                                )}
                            </td>
                        ))}
                        {actions && (
                            <td className="px-4 py-3 text-right relative">
                                <button
                                    onClick={() => setActiveDropdown(activeDropdown === rowIndex ? null : rowIndex)}
                                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                                    type="button"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                                {activeDropdown === rowIndex && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute right-10 top-2 z-[100] w-44 bg-white rounded-xl shadow-2xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 py-2 animate-fade-in"
                                    >
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                            {actions.map((action, actionIndex) => (
                                                <li key={actionIndex}>
                                                    <button
                                                        onClick={() => {
                                                            action.handler(item._id);
                                                            setActiveDropdown(null);
                                                        }}
                                                        className={`block w-full py-2.5 px-4 hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-white text-left font-medium transition-colors ${action.label.toLowerCase() === 'delete' ? 'text-red-500 hover:text-red-600' : 'text-gray-700 dark:text-gray-200'
                                                            }`}
                                                    >
                                                        {action.label}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReusableTable;
