import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import useDelete from '../../Components/API/useDelete';
import ReusableTable from '../../Components/Table/Table';
import Pagination from '../../Components/UI/Pagination';
import Toast from '../../Components/UI/Toast';
function CourseList() {

    const [Courses, setCourses] = useState([]);
    const { deleteItem, message, isSuccess, isLoading } = useDelete();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10)


    const handleDelete = (id) => {
        deleteItem(id, "/api/course");
    };

    const headers = ['name', 'price', 'image'];
    const actions = [
        { label: 'Show', handler: (id) => console.log(`Show item with ID: ${id}`) },
        { label: 'Edit', component: (id) => <Link to={`/dashboard/courses/${id}/details`}>Edit</Link> },
        { label: 'Delete', handler: handleDelete },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/course", {
                    method: "GET",
                    headers: {
                        'Content-Type': "application/json"
                    }
                });
                const data = await response.json();
                setCourses(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Reinitialize Flowbite dropdowns when Queries change
    useEffect(() => {
        initFlowbite();
    }, [Courses]);

    return (
        <div className="mx-auto max-w-screen-xl px-2 py-10">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div>
                      <Toast />
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
