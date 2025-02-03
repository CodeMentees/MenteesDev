import api from "./api";

export const fetchCourse = async () => {
  try {
    const response = await api.get(`/home`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching course data:", error);
    throw error;
  }
};
