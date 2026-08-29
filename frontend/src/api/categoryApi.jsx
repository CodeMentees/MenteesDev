// 🔹 Categories API
import useCRUD from "../api/useCRUD";
const categoryAPI = "/categories";
export const useCategoryAPI = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem } = useCRUD(categoryAPI);
  return {
    fetchCategories: (page = 1, limit = 10) => getItems(page, limit),
    fetchCategory: (id) => getItemById(id),
    createCategory: (data) => createItem(data),
    updateCategory: (id, data) => updateItem(id, data),
    deleteCategory: (id) => deleteItem(id),
  };
};
