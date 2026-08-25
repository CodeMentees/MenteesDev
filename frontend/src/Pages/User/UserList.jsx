import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initFlowbite } from "flowbite";
import ReusableTable from "../../Components/Table/Table";
import useDelete from "../../Components/API/useDelete";
import { useUserAPI } from "../../api/userApi";
import { updateUserSession } from "../../Slices/authSlice";
import Pagination from "../../Components/UI/Pagination";
import DeleteConfirmModal from "../../Components/UI/DeleteConfirmModal";

function UserList() {
  const { fetchUsers, updateUser } = useUserAPI();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
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
      await deleteItem(userToDelete._id, "/users");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setToast({ visible: true, message: error.message || "An error occurred while deleting user.", type: "error" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async (ids) => {
    try {
      // Need axios here, so I'll import it or use a fetch. UserList doesn't import axios at the top currently.
      // Wait, there's no axios import. I'll import it at the top of the file.
      // For now I'll use fetch or just add import axios
      const response = await fetch("/api/users/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser?.token}`,
        },
        body: JSON.stringify({ ids }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete users");
      
      setToast({ visible: true, message: "Users deleted successfully!", type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      fetchUsers(currentPage, 10).then((resData) => {
        setUsers(resData.data);
        setTotalPages(resData.totalPages);
      });
    } catch (error) {
      console.error("Error bulk deleting users:", error);
      setToast({ visible: true, message: error.message || "Failed to delete users.", type: "error" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
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

  const headers = ["name", "email", "role", "isFullAccess", "phoneNumber", "createdAt"];
  const actions = [
    { label: "Edit", handler: (id) => navigate(`/admin/users/edit/${id}`) },
    { label: "Delete", handler: handleDelete },
  ];

  const handleAccessToggle = async (userId, currentLevel) => {
    try {
      const newLevel = !currentLevel;
      await updateUser(userId, { isFullAccess: newLevel });
      setToast({ visible: true, message: `Access level updated strictly to ${newLevel ? "Full Access" : "Limited"}`, type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 2000);
      
      setUsers(prevUsers => prevUsers.map(user => 
        (user._id === userId || user.id === userId) ? { ...user, isFullAccess: newLevel } : user
      ));

      // Sync local auth state if the admin is updating their own access
      if (currentUser && (currentUser._id === userId || currentUser.id === userId)) {
        dispatch(updateUserSession({ isFullAccess: newLevel }));
      }
    } catch (error) {
       console.error("Error updating access level:", error);
       setToast({ visible: true, message: error.message || "Failed to update access level", type: "error" });
       setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
    }
  };

  return (
    <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
      {toast.visible && (
        <div className={`fixed z-50 top-5 right-5 p-4 ${toast.type === "error" ? "bg-red-500" : "bg-green-500"} text-white px-4 py-2 rounded-lg shadow-lg`}>
          {toast.message}
        </div>
      )}
      <div className="relative shadow-lg sm:rounded-2xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
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
              <ReusableTable 
                headers={headers} 
                data={users} 
                actions={actions} 
                isLoading={isLoading} 
                onAccessToggle={handleAccessToggle}
                enableMultiSelect={true}
                onBulkDelete={handleBulkDelete}
              />
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
      </div>
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
