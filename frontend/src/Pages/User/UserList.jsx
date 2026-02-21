import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import ReusableTable from "../../Components/Table/Table";
import useDelete from "../../Components/API/useDelete";
import { useUserAPI } from "../../api/userApi";
import Pagination from "../../Components/UI/Pagination";
import DeleteConfirmModal from "../../Components/UI/DeleteConfirmModal";

function UserList() {
  const { fetchUsers } = useUserAPI();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { deleteItem, isSuccess, isLoading } = useDelete();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id) => {
    const user = users.find(u => u._id === id);
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await deleteItem(userToDelete._id, "/api/users");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setToast({ visible: true, message: "User deleted successfully!", type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      fetchUsers(currentPage, 10).then((data) => {
        console.log("data is ", data)
        setUsers(data.data);
        setTotalPages(data.totalPages);
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers(currentPage, 10);
        setUsers(users.data);
        setTotalPages(users.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    initFlowbite();
  }, [users]);

  const headers = ["name", "email"];
  const actions = [
    { label: "Show", handler: (id) => console.log(`Show user with ID: ${id}`) },
    { label: "Edit", handler: (id) => navigate(`/admin/users/edit/${id}`) },
    { label: "Delete", handler: handleDelete },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-2 py-10">
      {toast.visible && (
        <div className="fixed z-50 top-5 right-5 p-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}
      <section className="p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <Link
                to={"/admin/users/create"}
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
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
                Add User
              </Link>
            </div>
            <div className="overflow-x-auto">
              <ReusableTable headers={headers} data={users} actions={actions} isLoading={isLoading} />
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={userToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default UserList;
