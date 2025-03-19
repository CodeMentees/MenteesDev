import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import useDelete from '../../Components/API/useDelete';
import ReusableTable from '../../Components/Table/Table';
import Pagination from '../../Components/UI/Pagination';
import Toast from '../../Components/UI/Toast';

import { useCourse } from '../../api/courseApi';
function CourseList() {
    
    const {fetchCourses,deleteCourse} = useCourse()
    const [Courses, setCourses ] = useState([]);
    const [isToast,setToast] = useState(false)
    const { deleteItem, message, isSuccess, isLoading } = useDelete();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10)
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        await deleteCourse(id);
        setToast(true)
        await fetchData()
    };

    const headers = ['name', 'price', 'image'];
    const actions = [
        { label: 'Show', handler: (id) => console.log(`Show item with ID: ${id}`) },
        { label: 'Edit', handler: (id) => navigate(`/admin/courses/edit/${id}`) },
        { label: 'Edit Details', handler: (id) => navigate(`/admin/courses/${id}/edit`) },
        { label: 'Delete', handler: handleDelete },
    ];

    const fetchData = async (page = currentPage) => {
        let courses = await fetchCourses(page,10);
        setCourses(courses.data);
        setTotalPages(courses.totalPages);
    };
    
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    // Reinitialize Flowbite dropdowns when Queries change
    useEffect(() => {
        initFlowbite();
    }, [Courses,]);

    return (
        <div className="mx-auto max-w-screen-xl px-2 py-10">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div>
                        <Toast message="deleted" visible={isToast}   />
                    </div>
                    {/* Start coding here */}
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <ReusableTable
                                headers={headers}
                                data={Courses}
                                actions={actions}
                                isLoading={isLoading}
                            />
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CourseList
