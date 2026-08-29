// 🔹 Users API
import useCRUD from "../api/useCRUD";
const userAPI = "/users";

export const useUserAPI = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem, customRequest } = useCRUD(userAPI);

  return {
    fetchUsers: (page = 1, limit = 10) => getItems(page, limit),
    fetchUser: (id) => getItemById(id),
    createUser: (data) => createItem(data),
    updateUser: (id, data) => updateItem(id, data),
    deleteUser: (id) => deleteItem(id),
    fetchGrowth: () => customRequest("GET", "/growth"),
  };
};
