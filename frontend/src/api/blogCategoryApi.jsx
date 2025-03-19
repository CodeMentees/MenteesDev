// 🔹 Blog Categories API
import useCRUD from "../api/useCRUD";
const blogCategoryAPI = "/blog-categories";
export const useBlogCategory = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem } = useCRUD(blogCategoryAPI);
  return {
    fetchBlogCategories: (page = 1, limit = 10) => getItems(page, limit),
    fetchBlogCategory: (id) => getItemById(id),
    createBlogCategory: (data) => createItem(data),
    updateBlogCategory: (id, data) => updateItem(id, data),
    deleteBlogCategory: (id) => deleteItem(id),
  };
};