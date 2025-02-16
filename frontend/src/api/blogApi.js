import api from "./api";

export const fetchBlog = async (id) => {
  try {
    const response = await api.get(`/post/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
};


export const fetchLatestBlogs = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/post?page=${page}&limit=${limit}`);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from server");
    }
    return {
      blogs: response.data.data, 
      currentPage: response.data.currentPage, 
      totalPages: response.data.totalPages
    };
  } catch (error) {
    console.error("Error fetching blog list:", error.response?.data?.message || error.message);
    return { blogs: [], currentPage: 1, totalPages: 1 }; // Default safe values
  }
};

