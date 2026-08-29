import React, { useEffect, useState } from 'react';
import ReusableTable from '../../Components/Table/Table';
import { useSchoolCodingLeadAPI } from '../../api/schoolCodingLeadApi';
import Pagination from "../../Components/UI/Pagination";
import { initFlowbite } from 'flowbite';
import Toast from '../../Components/UI/Toast';

function SchoolCodingLeadList() {
    const { getLeads, deleteLead, updateLeadStatus } = useSchoolCodingLeadAPI();
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const itemsPerPage = 10;

    const fetchData = async () => {
        setLoading(true);
        const data = await getLeads();
        setLeads(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        initFlowbite();
    }, [leads]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this lead?")) {
            const result = await deleteLead(id);
            if (result) {
                setToast({ visible: true, message: "Lead deleted successfully", type: "success" });
                fetchData();
                setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
            }
        }
    };

    const handleStatusUpdate = async (id, status) => {
        const result = await updateLeadStatus(id, status);
        if (result) {
            setToast({ visible: true, message: `Status updated to ${status}`, type: "success" });
            fetchData();
            setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
        }
    };

    const headers = ['name', 'email', 'phoneNumber', 'courseName', 'status', 'createdAt'];
    
    // Transform data for the table to include status dropdown or similar if needed
    // For now, let's just use the raw data and add custom actions
    const tableData = leads.map(lead => ({
        ...lead,
        createdAt: new Date(lead.createdAt).toLocaleDateString(),
    }));

    const actions = [
        { 
            label: 'Contacted', 
            handler: (id) => handleStatusUpdate(id, 'Contacted'),
            className: 'text-blue-600 hover:text-blue-900'
        },
        { 
            label: 'Close', 
            handler: (id) => handleStatusUpdate(id, 'Closed'),
            className: 'text-green-600 hover:text-green-900'
        },
        { 
            label: 'Delete', 
            handler: handleDelete,
            className: 'text-red-600 hover:text-red-900'
        },
    ];

    // Basic Pagination Logic
    const totalPages = Math.ceil(leads.length / itemsPerPage);
    const paginatedLeads = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
            {toast.visible && <Toast message={toast.message} type={toast.type} visible={toast.visible} />}
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "rgb(var(--dash-ink))" }}>School Coding Leads</h2>
            </div>
            
            <div className="relative shadow-lg sm:rounded-2xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
                        <div className="overflow-x-auto">
                            <ReusableTable
                                headers={headers}
                                data={paginatedLeads}
                                actions={actions}
                                isLoading={loading}
                            />
                        </div>
                        {totalPages > 1 && (
                            <Pagination 
                                totalPages={totalPages} 
                                currentPage={currentPage} 
                                onPageChange={setCurrentPage} 
                            />
                        )}
                        {leads.length === 0 && !loading && (
                            <div className="text-center py-10 text-gray-500">
                                No leads found.
                            </div>
                        )}
                    </div>
        </div>
    );
}

export default SchoolCodingLeadList;
