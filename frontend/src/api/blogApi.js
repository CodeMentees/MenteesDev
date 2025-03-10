import api from "./api";

// Fetch a single blog post by ID
export const fetchBlog = async (id) => {
  try {
    const response = await api.get(`/post/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching post data:", error);
    throw error;
  }
};

// Fetch the latest blog posts with pagination
export const fetchLatestBlogs = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/post?page=${page}&limit=${limit}`);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response from server");
    }
    return {
      blogs: response.data.data,
      currentPage: response.data.currentPage,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching blog list:", error.response?.data?.message || error.message);
    return { blogs: [], currentPage: 1, totalPages: 1 }; // Default safe values
  }
};

// Create a new blog post
export const createBlog = async (blogData) => {
  try {
    const response = await api.post("/post", blogData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Update an existing blog post
export const updateBlog = async (id, blogData) => {
  try {
    const response = await api.put(`/post/${id}`, blogData);
    return response.data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

// Delete a blog post
export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`/post/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};