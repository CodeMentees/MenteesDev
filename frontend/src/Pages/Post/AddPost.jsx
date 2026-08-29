import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import RichTextEditor from "../../Components/RichTextEditor";
import { useBlogCategory } from "../../api/blogCategoryApi";
import { FaPlus } from "react-icons/fa";

function AddPost() {
  const { fetchBlogCategories } = useBlogCategory();
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
    seo: { metaTitle: "", metaDescription: "", keywords: "" }
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
      setPostData({
        ...data.data,
        seo: data.data.seo || { metaTitle: "", metaDescription: "", keywords: "" }
      });
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
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setPostData({ ...postData, seo: { ...postData.seo, [seoField]: value } });
    } else {
      setPostData({ ...postData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/posts${isEditing ? `/${id}` : ""}`, {
        method: isEditing ? "PUT" : "POST",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        },
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
        const errorData = await response.json();
        setToast({
          visible: true,
          message: errorData.message || "Something went wrong!",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setToast({ visible: true, message: "Network error", type: "error" });
    }
  };

  return (
    <section className="min-h-screen p-6" style={{ backgroundColor: "rgb(var(--dash-bg))", color: "rgb(var(--text-primary))" }}>
      {toast.visible && (
        <div
          className={`fixed z-50 top-5 right-5 p-4 rounded-lg shadow-md ${toast.type === "error"
            ? "bg-red-700 text-red-200"
            : "bg-green-700 text-green-200"
            }`}
        >
          ✅ <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg border" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
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
                className="w-full border rounded-lg p-2.5 transition-all outline-none"
                style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
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
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-400">
                  Categories
                </label>
                <Link
                  to="/admin/posts/categories"
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  <FaPlus className="w-2 h-2" /> Manage Categories
                </Link>
              </div>
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

            {/* SEO Manager Section */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(var(--dash-border))" }}>
              <h3 className="text-xl font-bold mb-4" style={{ color: "rgb(var(--text-primary))" }}>SEO Settings</h3>
              
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Meta Title</label>
                  <input
                    type="text" name="seo.metaTitle" value={postData.seo.metaTitle} onChange={handleChange}
                    className="w-full border rounded-lg p-2.5 transition-all outline-none"
                    style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                    placeholder="SEO Title (60 chars max)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Meta Description</label>
                  <textarea
                    name="seo.metaDescription" value={postData.seo.metaDescription} onChange={handleChange}
                    className="w-full border rounded-lg p-2.5 transition-all outline-none resize-none h-24"
                    style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                    placeholder="Brief description for search engines (160 chars max)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Keywords (Comma separated)</label>
                  <input
                    type="text" name="seo.keywords" value={postData.seo.keywords} onChange={handleChange}
                    className="w-full border rounded-lg p-2.5 transition-all outline-none"
                    style={{ backgroundColor: "rgb(var(--surface-2))", borderColor: "rgba(var(--dash-border))", color: "white" }}
                    placeholder="react, web development, coding"
                  />
                </div>
              </div>
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
