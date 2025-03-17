import api from "./api";

// 🔹 Fetch a single query by ID
export const fetchQuery = async (id) => {
  try {
    const response = await api.get(`/queries/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching query data:", error);
    throw error;
  }
};

// 🔹 Fetch all queries with pagination
export const fetchQueries = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/queries?page=${page}&limit=${limit}`);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from server");
    }

    return {
      queries: response.data.data,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching query list:", error.response?.data?.message || error.message);
    return { queries: [], currentPage: 1, totalPages: 1 }; // Default safe values
  }
};

// 🔹 Create a new query
export const createQuery = async (queryData) => {
  try {
    const response = await api.post("/queries", queryData);
    return response.data;
  } catch (error) {
    console.error("Error creating query:", error);
    throw error;
  }
};

// 🔹 Update an existing query
export const updateQuery = async (id, queryData) => {
  try {
    const response = await api.put(`/queries/${id}`, queryData);
    return response.data;
  } catch (error) {
    console.error("Error updating query:", error);
    throw error;
  }
};

// 🔹 Delete a query
export const deleteQuery = async (id) => {
  try {
    const response = await api.delete(`/queries/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting query:", error);
    throw error;
  }
};
