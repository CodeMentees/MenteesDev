import api from "./api";

export const fetchBlogCategories = async () => {
  try {
    const response = await api.get("/blog-categories");

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from server");
    }

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching blog categories:",
      error.response?.data?.message || error.message
    );
    return [];
  }
};

export const fetchBlogCategory = async (id) => {
  try {
    const response = await api.get(`/blog-categories/${id}`);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from server");
    }

    return response.data.data;
  } catch (error) {
    console.error(
      "Error fetching blog category:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const createBlogCategory = async (categoryData) => {
  try {
    const response = await api.post("/blog-categories", categoryData);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating blog category:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const updateBlogCategory = async (id, updatedData) => {
  try {
    const response = await api.put(`/blog-categories/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating blog category:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const deleteBlogCategory = async (id) => {
  try {
    const response = await api.delete(`/blog-categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting blog category:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
