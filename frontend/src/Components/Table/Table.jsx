import React, { useState, useEffect, useRef } from "react";
import { SkeletonGrid } from "../UI/LoadingSpinner";
import { Edit, Trash2 } from "lucide-react";
import DeleteConfirmModal from "../UI/DeleteConfirmModal";

const ReusableTable = ({ headers, data, actions, isLoading, onAccessToggle, enableExport = true, enableMultiSelect = false, onBulkDelete }) => {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);
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

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(data.map(item => item._id || item.id));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (id) => {
        setSelectedRows(prev => 
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full flex flex-col">
            <div className="flex justify-between items-center mb-3 pr-2 pl-2">
                <div>
                    {enableMultiSelect && selectedRows.length > 0 && onBulkDelete && (
                        <button 
                            onClick={() => setIsBulkConfirmOpen(true)}
                            className="text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white transition-all shadow-sm"
                        >
                            <Trash2 size={14} />
                            Delete Selected ({selectedRows.length})
                        </button>
                    )}
                </div>
                {enableExport && (
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
                )}
            </div>
        <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs uppercase" style={{ backgroundColor: "rgba(var(--dash-border))", color: "rgb(var(--text-secondary))" }}>
                <tr>
                    {enableMultiSelect && (
                        <th scope="col" className="p-4 w-4">
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded focus:ring-purple-600 ring-offset-gray-800 bg-gray-700 border-gray-600"
                                    onChange={handleSelectAll}
                                    checked={data.length > 0 && selectedRows.length === data.length}
                                />
                            </div>
                        </th>
                    )}
                    {headers.map((header, index) => (
                        <th key={index} scope="col" className="px-4 py-3">
                            {header}
                        </th>
                    ))}
                    {actions && <th scope="col" className="px-4 py-3 text-right pr-10">Action</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, rowIndex) => {
                    const rowId = item._id || item.id;
                    return (
                    <tr key={rowIndex} className="border-b" style={{ borderColor: "rgba(var(--dash-border))" }}>
                        {enableMultiSelect && (
                            <td className="p-4 w-4">
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 rounded focus:ring-purple-600 ring-offset-gray-800 bg-gray-700 border-gray-600"
                                        checked={selectedRows.includes(rowId)}
                                        onChange={() => handleSelectRow(rowId)}
                                    />
                                </div>
                            </td>
                        )}
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
                            <td className="px-4 py-3 text-right">
                                <div className="flex justify-end gap-3 items-center">
                                    {actions.map((action, index) => {
                                        const isDelete = action.label.toLowerCase() === 'delete';
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => action.handler(item._id || item.id)}
                                                className={`p-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
                                                    isDelete 
                                                    ? 'text-red-400 hover:text-white hover:bg-red-600 focus:ring-red-500' 
                                                    : 'text-blue-400 hover:text-white hover:bg-blue-600 focus:ring-blue-500'
                                                }`}
                                                title={action.label}
                                            >
                                                {isDelete ? <Trash2 size={16} /> : (action.label.toLowerCase() === 'edit' ? <Edit size={16} /> : action.label)}
                                            </button>
                                        );
                                    })}
                                </div>
                            </td>
                        )}
                    </tr>
                    );
                })}
            </tbody>
        </table>
        <DeleteConfirmModal
            isOpen={isBulkConfirmOpen}
            onClose={() => setIsBulkConfirmOpen(false)}
            onConfirm={() => {
                onBulkDelete(selectedRows);
                setIsBulkConfirmOpen(false);
                setSelectedRows([]);
            }}
            itemName={`${selectedRows.length} selected items`}
        />
        </div>
    );
};

export default ReusableTable;
