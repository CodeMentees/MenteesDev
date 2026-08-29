import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import ReusableTable from "../../../Components/Table/Table";
import useDelete from "../../../Components/API/useDelete";
import { useLiveCourseAPI } from "../../../api/liveCourseApi";
import Pagination from "../../../Components/UI/Pagination";
import DeleteConfirmModal from "../../../Components/UI/DeleteConfirmModal";

function LiveCourseList() {
  const { fetchLiveCourses } = useLiveCourseAPI();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { deleteItem, isSuccess, isLoading } = useDelete();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id) => {
    const course = courses.find(c => c._id === id);
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;
    setIsDeleting(true);
    try {
      await deleteItem(courseToDelete._id, "/live-courses");
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    } catch (error) {
      console.error("Error deleting live course:", error);
      setToast({ visible: true, message: error.message || "An error occurred.", type: "error" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setToast({ visible: true, message: "Live Course deleted successfully!", type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      fetchData();
    }
  }, [isSuccess]);

  const fetchData = async () => {
    try {
      const resp = await fetchLiveCourses(currentPage, 10);
      // Since live-courses might not have pagination natively supported yet in my backend script
      // I'll assume it returns an array for now, but handle both formats.
      if (resp.data) {
        setCourses(resp.data);
        setTotalPages(resp.totalPages || 1);
      } else {
         setCourses(resp);
      }
    } catch (error) {
      console.error("Error fetching live courses:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    initFlowbite();
  }, [courses]);

  const headers = ["image", "name", "courseType", "liveStatus", "schedule"];
  const actions = [
    { label: "Manage Content", handler: (id) => navigate(`/admin/live-courses/${id}/content`) },
    { label: "Edit", handler: (id) => navigate(`/admin/live-courses/edit/${id}`) },
    { label: "Delete", handler: handleDelete },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-2 py-10">
      {toast.visible && (
        <div className={`fixed z-50 top-5 right-5 p-4 ${toast.type === "error" ? "bg-red-500" : "bg-green-500"} text-white px-4 py-2 rounded-lg shadow-lg`}>
          {toast.message}
        </div>
      )}
      <section className="p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 text-white">
               <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Live Courses</h2>
              <Link
                to={"/admin/live-courses/create"}
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
                Add Live Course
              </Link>
            </div>
            <div className="overflow-x-auto">
              <ReusableTable headers={headers} data={courses} actions={actions} isLoading={isLoading} />
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </section>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={courseToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default LiveCourseList;
