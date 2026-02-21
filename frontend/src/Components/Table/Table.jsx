import React from "react";

const ReusableTable = ({ headers, data, actions, isLoading }) => {
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
                    {actions && <th scope="col" className="px-4 py-3">Action</th>}
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
                                    <img src={item[header]} alt="Image" className="w-10 h-10" />
                                ) : (
                                    item[header]
                                )}
                            </td>
                        ))}
                        {actions && (
                            <td className="px-4 py-3 flex items-center justify-end">
                                <button
                                    id={`dropdown-button-${item._id}`}
                                    data-dropdown-toggle={`dropdown-${item._id}`}
                                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
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
                                <div
                                    id={`dropdown-${item._id}`}
                                    className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                >
                                    <ul
                                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby={`dropdown-button-${item._id}`}
                                    >
                                        {actions.map((action, actionIndex) => (
                                            <li key={actionIndex}>
                                                <button
                                                    onClick={() => action.handler(item._id)}
                                                    className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                                                >
                                                    {action.label}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReusableTable;
