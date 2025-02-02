import api from "./api";

export const fetchCourse = async (id) => {
  try {
    const response = await api.get(`/course/${id}/category`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
};
