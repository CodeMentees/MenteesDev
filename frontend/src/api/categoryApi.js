import api from "./api";

export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
};
