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
    <div className="p-6 lg:p-8 w-full max-w-[1600px] mx-auto">
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

        <form onSubmit={handleSubmit} className="p-6 rounded-xl shadow-lg border mb-8" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
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

        <div className="border rounded-xl p-6" style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}>
          <div className="mb-6">
            <h3 className="text-lg font-semibold" style={{ color: "rgb(var(--dash-ink))" }}>Existing Categories</h3>
          </div>
          {categories.length === 0 ? (
            <div className="text-center py-10 rounded-lg border border-dashed" style={{ color: "rgb(var(--text-secondary))", borderColor: "rgba(var(--dash-border))" }}>
              No categories found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="p-5 rounded-xl border flex justify-between items-center group transition-all"
                  style={{ backgroundColor: "rgb(var(--dash-panel))", borderColor: "rgba(var(--dash-border))" }}
                >
                  <span className="font-medium text-lg truncate" style={{ color: "rgb(var(--dash-ink))" }}>{category.name}</span>
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryManager;
