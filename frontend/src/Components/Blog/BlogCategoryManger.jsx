import { useEffect, useState } from "react";
import { useBlogCategory } from "../../api/blogCategoryApi";
import { FaTrash, FaEdit, FaPlus, FaTimes, FaCheck } from "react-icons/fa";
import Toast from "../UI/Toast";

const BlogCategoryManager = () => {
  const { fetchBlogCategories, createBlogCategory, updateBlogCategory, deleteBlogCategory } = useBlogCategory();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  useEffect(() => {
    loadCategories();
  }, []);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  const loadCategories = async () => {
    setIsFetching(true);
    try {
      const response = await fetchBlogCategories();
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error loading categories:", error);
      showToast("Failed to load categories", "error");
    } finally {
      setIsFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast("Please enter a category name", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateBlogCategory(editingId, { name: name.trim() });
        showToast("Category updated successfully");
        setEditingId(null);
      } else {
        await createBlogCategory({ name: name.trim() });
        showToast("Category added successfully");
      }
      setName("");
      await loadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      showToast(error.message || "Failed to save category", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setName(category.name);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    setIsSubmitting(true);
    try {
      await deleteBlogCategory(id);
      showToast("Category deleted successfully");
      await loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      showToast("Failed to delete category", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Toast visible={toast.visible} message={toast.message} type={toast.type} />
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Manage Blog Categories
          </h2>
          {isFetching && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mb-8">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            {editingId ? "Edit Category Name" : "New Category Name"}
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Technology, AI, Web Development"
              className="flex-grow px-4 py-2.5 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 min-w-[100px] px-6 py-2.5 rounded-lg font-semibold transition-all ${editingId
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95`}
            >
              {isSubmitting ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                editingId ? <FaCheck /> : <FaPlus />
              )}
              <span>{isSubmitting ? "..." : (editingId ? "Update" : "Add")}</span>
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-all transform active:scale-95"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            )}
          </div>
        </form>

        <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700 bg-gray-800/50">
            <h3 className="text-lg font-semibold text-gray-300">Existing Categories</h3>
          </div>
          <ul className="divide-y divide-gray-700">
            {categories.length === 0 ? (
              <li className="p-8 text-center text-gray-500 italic">
                {isFetching ? "Loading categories..." : "No categories found. Add your first one above!"}
              </li>
            ) : (
              categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between items-center p-4 hover:bg-gray-700/30 transition-colors group"
                >
                  <span className="text-gray-200 font-medium group-hover:text-white transition-colors">
                    {category.name}
                  </span>
                  <div className="flex gap-1">
                    <button
                      className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-400/10 rounded-lg transition-all"
                      onClick={() => handleEdit(category)}
                      title="Edit Category"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                      onClick={() => handleDelete(category._id)}
                      title="Delete Category"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryManager;
