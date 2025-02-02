import api from "./api";

export const fetchCategory = async () => {
  try {
    const response = await api.get("/category");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
};
