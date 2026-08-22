import React, { useState, useEffect, useRef } from "react";
import { SkeletonGrid } from "../UI/LoadingSpinner";

const ReusableTable = ({ headers, data, actions, isLoading, onAccessToggle, enableExport = true }) => {
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

    if (isLoading) {
        return (
            <div className="p-4">
                <SkeletonGrid count={5} />
            </div>
        );
    }

    const handleExportCSV = () => {
        if (!data || data.length === 0) return;
        
        // Extract headers
        const csvHeaders = headers.join(",");
        
        // Extract rows matching headers
        const csvRows = data.map(item => {
            return headers.map(header => {
                const itemKey = Object.keys(item).find(key => key.toLowerCase() === header.toLowerCase()) || header;
                const value = item[itemKey];
                // Handle objects, arrays or undefined
                if (value === null || value === undefined) return '""';
                if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
                return `"${String(value).replace(/"/g, '""')}"`;
            }).join(",");
        });

        const csvContent = [csvHeaders, ...csvRows].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full flex flex-col">
            {enableExport && (
                <div className="flex justify-end mb-3 pr-2">
                    <button 
                        onClick={handleExportCSV}
                        className="text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-sm"
                        style={{ backgroundColor: "rgb(var(--surface-2))", color: "rgb(var(--text-primary))", border: "1px solid rgba(var(--dash-border))" }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export CSV
                    </button>
                </div>
            )}
        <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase" style={{ backgroundColor: "rgba(var(--dash-border))", color: "rgb(var(--text-secondary))" }}>
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
                    <tr key={rowIndex} className="border-b" style={{ borderColor: "rgba(var(--dash-border))" }}>
                        {headers.map((header, colIndex) => {
                            // Find the key in item that matches header (case-insensitive)
                            const itemKey = Object.keys(item).find(key => key.toLowerCase() === header.toLowerCase()) || header;
                            const value = item[itemKey];

                            return (
                                <td key={colIndex} className="px-4 py-3">
                                    {["createdat", "date", "updatedat"].includes(header.toLowerCase()) ? ( // Format dates
                                        new Date(value).toLocaleString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            second: "2-digit",
                                            hour12: true,
                                        })
                                    ) : Array.isArray(value) ? ( // Display array as chips
                                        <div className="flex flex-wrap gap-2">
                                            {value.map((v, index) => (
                                                <span key={index} className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                                                    {v}
                                                </span>
                                            ))}
                                        </div>
                                    ) : header.toLowerCase() === "image" ? ( // Handle images
                                        <img src={value} alt="Image" className="w-10 h-10 rounded shadow-sm object-cover" />
                                    ) : header.toLowerCase() === "isfullaccess" ? (
                                        <button 
                                            onClick={() => onAccessToggle && onAccessToggle(item._id || item.id, !!value)}
                                            disabled={!onAccessToggle}
                                            className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${onAccessToggle ? "cursor-pointer hover:opacity-80 shadow-sm" : "cursor-default"} ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                        >
                                            {value ? "Full Access" : "Limited Access"}
                                        </button>
                                    ) : header.toLowerCase() === "livestatus" ? (
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${value ? "bg-red-100 text-red-800 animate-pulse" : "bg-gray-100 text-gray-800"}`}>
                                            {value ? "LIVE" : "OFFLINE"}
                                        </span>
                                    ) : (
                                        value
                                    )}
                                </td>
                            );
                        })}
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
                                        className="absolute right-10 top-8 z-10 w-44 rounded divide-y shadow-lg"
                                        style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))", borderWidth: "1px" }}
                                    >
                                        <ul className="py-1 text-sm text-gray-300">
                                            {actions.map((action, index) => (
                                                <li key={index}>
                                                    <button
                                                        onClick={() => {
                                                            action.handler(item._id || item.id);
                                                            setActiveDropdown(null);
                                                        }}
                                                        className={`block py-2 px-4 w-full text-left hover:text-white transition-colors ${action.label.toLowerCase() === 'delete' ? 'text-red-500 hover:text-red-600' : 'text-gray-700 dark:text-gray-200'}`}
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
        </div>
    );
};

export default ReusableTable;
