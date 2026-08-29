import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { initFlowbite } from 'flowbite';
import useDelete from '../../Components/API/useDelete';
import ReusableTable from '../../Components/Table/Table';
import Pagination from '../../Components/UI/Pagination';
import Toast from '../../Components/UI/Toast';
import DeleteConfirmModal from '../../Components/UI/DeleteConfirmModal';

import { useCourse } from '../../api/courseApi';
function CourseList() {

    const { fetchCourses, deleteCourse } = useCourse()
    const [Courses, setCourses] = useState([]);
    const [isToast, setToast] = useState(false)
    const { deleteItem, message, isSuccess, isLoading } = useDelete();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate();

    const handleDeleteClick = (id) => {
        const course = Courses.find(c => (c._id === id || c.id === id));
        setSelectedCourse(course);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedCourse) return;
        try {
            await deleteCourse(selectedCourse._id || selectedCourse.id);
            setToast(true);
            setTimeout(() => setToast(false), 3000);
            setDeleteModalOpen(false);
            await fetchData();
        } catch (err) {
            alert("Failed to delete course: " + err.message);
        }
    };

    const handleBulkDelete = async (ids) => {
        try {
            // we don't have axios imported directly here, so we'll use fetch
            const authState = localStorage.getItem('persist:root');
            let token = "";
            if (authState) {
                const parsed = JSON.parse(authState);
                if (parsed.auth) {
                    const authData = JSON.parse(parsed.auth);
                    token = authData.user?.token || "";
                }
            }
            const res = await fetch("/api/courses/bulk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ ids })
            });
            if (!res.ok) throw new Error("Failed to delete");
            setToast(true);
            setTimeout(() => setToast(false), 3000);
            await fetchData();
        } catch (err) {
            alert("Failed to bulk delete: " + err.message);
        }
    };

    const headers = ['name', 'price', 'image'];
    const actions = [
        { label: 'Manage', handler: (id) => navigate(`/admin/courses/${id}/manage`) },
        { label: 'Edit Info', handler: (id) => navigate(`/admin/courses/${id}/manage`) },
        { label: 'Delete', handler: handleDeleteClick },
    ];

    const fetchData = async (page = currentPage) => {
        let courses = await fetchCourses(page, 10);
        setCourses(courses.data);
        setTotalPages(courses.totalPages);
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    // Reinitialize Flowbite dropdowns when Queries change
    useEffect(() => {
        initFlowbite();
    }, [Courses]);

    return (
        <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
            <div>
                <Toast message="deleted" visible={isToast} />
            </div>
            <div className="relative shadow-lg sm:rounded-2xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <button
                        onClick={() => navigate("/admin/courses/create")}
                        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                        <svg
                            className="h-3.5 w-3.5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            />
                        </svg>
                        Add Course
                    </button>
                </div>
                <div className="overflow-x-auto pb-44">
                    <ReusableTable
                        headers={headers}
                        data={Courses}
                        actions={actions}
                        isLoading={isLoading}
                        enableMultiSelect={true}
                        onBulkDelete={handleBulkDelete}
                    />
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={selectedCourse?.name || "this course"}
                isLoading={isLoading}
            />
        </div>
    )
}

export default CourseList
