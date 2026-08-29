// 🔹 Queries API
import useCRUD from "../api/useCRUD";
const queryAPI = "/queries";
export const useQueryAPI = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem } = useCRUD(queryAPI);
  return {
    fetchQueries: (page = 1, limit = 10) => getItems(page, limit),
    fetchQuery: (id) => getItemById(id),
    createQuery: (data) => createItem(data),
    updateQuery: (id, data) => updateItem(id, data),
    deleteQuery: (id) => deleteItem(id),
  };
};