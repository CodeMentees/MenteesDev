import useCRUD from "../api/useCRUD";
import api from "./api";

// 🔹 Courses API
export const fetchCourseByCategory = async (id) => {
  try {
    const { data } = await api.get(`/courses/${id}/category`);
    return data;
  } catch (error) {
    console.error("Error fetching course by category:", error);
    return [];
  }
};

const courseAPI = "/courses";
export const useCourse = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem } = useCRUD(courseAPI);
  
  return {
    fetchCourses: (page = 1, limit = 10) => getItems(page, limit),
    fetchCourse: (id) => getItemById(id),
    createCourse: (data) => createItem(data),
    updateCourse: (id, data) => updateItem(id, data),
    deleteCourse: (id) => deleteItem(id),
    fetchCourseByCategory, // ✅ Correct way to include it
  };
};
