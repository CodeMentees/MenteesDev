// 🔹 Events API
import useCRUD from "../api/useCRUD";
const eventAPI = "/events";
export const useEvent = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem, customRequest } = useCRUD(eventAPI);
  return {
    fetchEvents: (page = 1, limit = 6) => getItems(page, limit),
    fetchEvent: (id) => getItemById(id),
    fetchEventGallery: () => customRequest('GET', '/gallery'),
    createEvent: (data) => createItem(data),
    updateEvent: (id, data) => updateItem(id, data),
    deleteEvent: (id) => deleteItem(id),
  };
};