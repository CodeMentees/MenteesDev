import useCRUD from "../api/useCRUD";
import api from "./api";

// 🔹 Live Courses API
const liveCourseAPI = "/live-courses";

export const useLiveCourseAPI = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem } = useCRUD(liveCourseAPI);
  
  const addContent = async (id, data) => {
    try {
      const response = await api.post(`${liveCourseAPI}/${id}/content`, data);
      return response.data;
    } catch (error) {
      console.error("Error adding live course content:", error);
      throw error;
    }
  };

  const updateContent = async (courseId, contentId, data) => {
    try {
      const response = await api.put(`${liveCourseAPI}/${courseId}/content/${contentId}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating live course content:", error);
      throw error;
    }
  };

  const deleteContent = async (courseId, contentId) => {
    try {
      const response = await api.delete(`${liveCourseAPI}/${courseId}/content/${contentId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting live course content:", error);
      throw error;
    }
  };

  return {
    fetchLiveCourses: (page = 1, limit = 10) => getItems(page, limit),
    fetchLiveCourse: (id) => getItemById(id),
    createLiveCourse: (data) => createItem(data),
    updateLiveCourse: (id, data) => updateItem(id, data),
    deleteLiveCourse: (id) => deleteItem(id),
    addContent,
    updateContent,
    deleteContent,
  };
};
