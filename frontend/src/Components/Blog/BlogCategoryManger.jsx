import { useEffect, useState } from "react";
import {
  fetchBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} from "../../api/blogCategoryApi";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const BlogCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchBlogCategories();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    if (editingId) {
      await updateBlogCategory(editingId, { name });
      setEditingId(null);
    } else {
      await createBlogCategory({ name });
    }

    setName("");
    loadCategories();
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setName(category.name);
  };

  const handleDelete = async (id) => {
    await deleteBlogCategory(id);
    loadCategories();
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-800 text-white px-4 py-2 rounded mb-4"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <h2 className="text-2xl font-bold mb-4">Manage Blog Categories</h2>

          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {editingId ? "Update" : "Add"} <FaPlus className="inline" />
            </button>
          </form>

          <ul className="bg-white dark:bg-gray-800 shadow rounded p-4">
            {categories.length === 0 ? (
              <p className="text-center">No categories found</p>
            ) : (
              categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between items-center p-2 border-b dark:border-gray-600"
                >
                  <span>{category.name}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-green-500"
                      onClick={() => handleEdit(category)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(category._id)}
                    >
                      <FaTrash />
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
