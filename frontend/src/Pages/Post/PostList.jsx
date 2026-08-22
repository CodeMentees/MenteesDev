import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import ReusableTable from "../../Components/Table/Table";
import useDelete from "../../Components/API/useDelete";
import { useBlog } from "../../api/blogApi";

import Pagination from "../../Components/UI/Pagination"

function PostList() {
  const { fetchLatestBlogs } = useBlog();
  const navigate = useNavigate();
  const [Posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10)
  const { deleteItem, message, isSuccess, isLoading } = useDelete();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const handleDelete = async (id) => {
    await deleteItem(id, "/posts");
  };

  useEffect(() => {
    if (isSuccess) {
      setToast({ visible: true, message: "Post deleted successfully!", type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      // Refetch posts after deletion
      fetchLatestBlogs().then((data) => setPosts(data.blogs.data)).catch((error) => console.error("Error fetching data:", error));
    }
  }, [isSuccess]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await fetchLatestBlogs();
        setPosts(blogs.data);
        setTotalPages(blogs.totalPages)
        setCurrentPage(blogs.currentPage)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    initFlowbite();
  }, [Posts]);

  const headers = ["title", "createdAt", "categories"];
  const actions = [
    { label: "Show", handler: (id) => console.log(`Show item with ID: ${id}`) },
    { label: "Edit", handler: (id) => navigate(`/admin/posts/edit/${id}`) },
    { label: "Delete", handler: handleDelete },
  ];

  return (
    <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
      {toast.visible && (
        <div className="fixed z-50 top-5 right-5 p-4  bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}
      <div className="relative shadow-lg sm:rounded-2xl overflow-hidden border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <Link
                to={"/admin/posts/create"}
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
                Add Post
              </Link>
            </div>
            <div className="overflow-x-auto">
              <ReusableTable headers={headers} data={Posts} actions={actions} isLoading={isLoading} />
              <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
            </div>
      </div>
    </div>
  );
}

export default PostList;
