import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RichTextEditor from "../../Components/RichTextEditor";
import { useBlogCategory } from "../../api/blogCategoryApi";

function AddPost() {
  const { fetchBlogCategories } = useBlogCategory();
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [postData, setPostData] = useState({
    title: "",
    categories: [],
    image: "",
    content: "",
  });
  const [editorContent, setEditorContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    initFlowbite();
    loadCategories();
    if (id) {
      fetchPostDetails(id);
      setIsEditing(true);
    }
  }, [id]);

  const loadCategories = async () => {
    const categories = await fetchBlogCategories();
    setCategories(categories.data);
  };

  const fetchPostDetails = async (postId) => {
    try {
      const response = await fetch(`/api/posts/${postId}`);
      const data = await response.json();
      setPostData(data.data);
      setEditorContent(data.data.content);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleCategorySelect = (category) => {
    if (!postData.categories.includes(category)) {
      setPostData((prev) => ({
        ...prev,
        categories: [...prev.categories, category],
      }));
    }
  };

  const handleCategoryRemove = (category) => {
    setPostData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
    setPostData((prev) => ({ ...prev, content }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/posts${isEditing ? `/${id}` : ""}`, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        const data = await response.json();
        setToast({ visible: true, message: data.message, type: "success" });

        setTimeout(() => {
          setToast({ visible: false, message: "", type: "success" });
          navigate("/admin/posts");
        }, 2000);
      } else {
        setToast({
          visible: true,
          message: "Something went wrong!",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setToast({ visible: true, message: "Network error", type: "error" });
    }
  };

  return (
    <section className="bg-gray-900 text-white min-h-screen p-6">
      {toast.visible && (
        <div
          className={`fixed z-50 top-5 right-5 p-4 rounded-lg shadow-md ${
            toast.type === "error"
              ? "bg-red-700 text-red-200"
              : "bg-green-700 text-green-200"
          }`}
        >
          ✅ <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">
          {isEditing ? "✏️ Edit Blog Post" : "📝 Add a Blog Post"}
        </h2>

        <form>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Title
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                value={postData.title}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                onChange={handleChange}
                value={postData.image}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                placeholder="Enter image URL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Categories
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {postData.categories.map((category) => (
                  <span
                    key={category}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryRemove(category)}
                      className="text-gray-200 hover:text-gray-50"
                    >
                      ✖
                    </button>
                  </span>
                ))}
              </div>

              <select
                onChange={(e) => handleCategorySelect(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Content
              </label>
              <RichTextEditor
                value={editorContent}
                onChange={handleEditorChange}
                placeholder="Write your content here..."
                className="bg-gray-700 text-white"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            {isEditing ? "✏️ Update Post" : "➕ Add Post"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddPost;
