import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import ReusableTable from '../../Components/Table/Table';
import Pagination from "../../Components/UI/Pagination"
import { useCategoryAPI } from '../../api/categoryApi';
function CategoryList() {
    const { fetchCategories, deleteCategory } = useCategoryAPI()
    const navigate = useNavigate();
    const [Categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10)

    const handleDelete = async (id) => {
        console.log("here is id",id)
        await deleteCategory(id)
        fetchCategories()
    };

    const headers = ['name', 'image'];
    const actions = [
        { label: 'Show', handler: (id) => console.log(`Show item with ID: ${id}`) },
        { label: 'Edit', handler: (id) => navigate(`/admin/categories/edit/${id}`) },
        { label: 'Delete', handler: (id) => handleDelete(id) },
    ];

    const fetchData = async () => {
        const data = await fetchCategories();
        setCategories(data.categories)
        setTotalPage(data.totalPage)
        setCurrentPage(data.currentPage)
    };

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        initFlowbite();
    }, [Categories]);

    return (
        <div className="mx-auto max-w-screen-xl px-2 py-10">
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">

                    {/* Start coding here */}
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">

                            <div className="w-full md:w-auto text-gray-100        flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <Link
                                    to={"/admin/categories/create"}
                                    className="flex items-center justify-center text-gray-800  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
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
                                    Add Category
                                </Link>

                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <ReusableTable
                                headers={headers}
                                data={Categories}
                                actions={actions}
                                isLoading={false}
                            />
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={setCurrentPage} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CategoryList
