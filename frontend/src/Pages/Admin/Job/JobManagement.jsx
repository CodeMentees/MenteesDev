import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReusableTable from "../../../Components/Table/Table";
import useDelete from "../../../Components/API/useDelete";
import axios from "axios";
import DeleteConfirmModal from "../../../Components/UI/DeleteConfirmModal";

function JobManagement() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { deleteItem, isSuccess } = useDelete();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resp = await axios.get("/api/jobs");
      setJobs(resp.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const job = jobs.find(j => j._id === id);
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;
    setIsDeleting(true);
    try {
      await deleteItem(jobToDelete._id, "/jobs");
      setIsDeleteModalOpen(false);
      setJobToDelete(null);
      setToast({ visible: true, message: "Job deleted successfully!", type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      fetchData();
    } catch (error) {
      console.error("Error deleting job:", error);
      setToast({ visible: true, message: error.message || "An error occurred.", type: "error" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      setIsDeleteModalOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const headers = ["role", "company", "applyLink", "postedAt"];
  const actions = [
    { label: "Edit", handler: (id) => navigate(`/admin/jobs/edit/${id}`) },
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
          <div className="relative shadow-md sm:rounded-lg overflow-hidden bg-white dark:bg-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
               <h2 className="text-xl font-bold text-gray-800 dark:text-white">Manage Job Opportunities</h2>
              <Link
                to={"/admin/jobs/create"}
                className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
              >
                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Post New Job
              </Link>
            </div>
            <div className="overflow-x-auto">
              <ReusableTable headers={headers} data={jobs} actions={actions} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={jobToDelete?.role}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default JobManagement;
