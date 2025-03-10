import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initFlowbite } from "flowbite";
import ReusableTable from "../../Components/Table/Table";
import useDelete from "../../Components/API/useDelete";
import { fetchLatestBlogs } from "../../api/blogApi";

function PostList() {
  const navigate = useNavigate();
  const [Posts, setPosts] = useState([]);
  const { deleteItem, message, isSuccess, isLoading } = useDelete();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const handleDelete = async (id) => {
    await deleteItem(id, "/api/post");
  };

  useEffect(() => {
    if (isSuccess) {
      setToast({ visible: true, message: "Post deleted successfully!", type: "success" });
      setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
      
      // Refetch posts after deletion
      fetchLatestBlogs().then((data) => setPosts(data.blogs)).catch((error) => console.error("Error fetching data:", error));
    }
  }, [isSuccess]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLatestBlogs();
        setPosts(data.blogs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    initFlowbite();
  }, [Posts]);

  const headers = ["title", "createdAt", "categories"];
  const actions = [
    { label: "Show", handler: (id) => console.log(`Show item with ID: ${id}`) },
    { label: "Edit", handler: (id) => navigate(`/dashboard/add-post/${id}`) },
    { label: "Delete", handler: handleDelete },
  ];

  return (
    <div className="mx-auto max-w-screen-xl px-2 py-10">
      {toast.visible && (
        <div className="fixed z-50 top-5 right-5 p-4  bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {toast.message}
        </div>
      )}
      <section className="p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <Link
                to={"/dashboard/add-post"}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostList;
