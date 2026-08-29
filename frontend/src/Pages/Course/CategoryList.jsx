import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import ReusableTable from '../../Components/Table/Table';
import Pagination from "../../Components/UI/Pagination"
import { useCategoryAPI } from '../../api/categoryApi';
import DeleteConfirmModal from '../../Components/UI/DeleteConfirmModal';
import Toast from '../../Components/UI/Toast';
import { initFlowbite } from 'flowbite';

function CategoryList() {
    const { fetchCategories, deleteCategory } = useCategoryAPI()
    const navigate = useNavigate();
    const [Categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isToast, setToast] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await fetchCategories();
            setCategories(data.categories)
            setTotalPage(data.totalPage)
            setCurrentPage(data.currentPage)
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (itemToDelete) {
            await deleteCategory(itemToDelete);
            setItemToDelete(null);
            setToast(true);
            setTimeout(() => setToast(false), 3000);
            fetchData();
        }
    };

    const headers = ['Name', 'Image'];
    const actions = [
        { label: 'Show', handler: (id) => console.log(`Show item with ID: ${id}`) },
        { label: 'Edit', handler: (id) => navigate(`/admin/categories/edit/${id}`) },
        { label: 'Delete', handler: (id) => setItemToDelete(id) },
    ];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        initFlowbite();
    }, [Categories]);

    return (
        <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
            <div>
                <Toast message="Category deleted successfully" visible={isToast} />
            </div>
            {/* Start coding here */}
            <div className="relative shadow-lg sm:rounded-2xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">

                            <div className="w-full md:w-auto text-gray-100        flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <Link
                                    to={"/admin/categories/create"}
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
                                    Add Category
                                </Link>

                            </div>
                        </div>
                        <div className="overflow-x-auto pb-44">
                            <ReusableTable
                                headers={headers}
                                data={Categories}
                                actions={actions}
                                isLoading={isLoading}
                            />
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={setCurrentPage} />
            </div>

            <DeleteConfirmModal
                isOpen={!!itemToDelete}
                onClose={() => setItemToDelete(null)}
                onConfirm={handleDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
            />
        </div>
    )
}

export default CategoryList
