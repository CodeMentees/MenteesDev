import useCRUD from "../api/useCRUD";
// 🔹 Blog API
const blogAPI = "/posts";
export const useBlog = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem, customRequest } = useCRUD(blogAPI);
  return {
    fetchLatestBlogs: (page = 1, limit = 10, category = "", search = "") => {
      let url = `?page=${page}&limit=${limit}`;
      if (category) url += `&category=${encodeURIComponent(category)}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      return customRequest("GET", url);
    },
    fetchBlog: (id) => getItemById(id),
    fetchBlogBySlug: (slug) => customRequest("GET", `/slug/${slug}`),
    createBlog: (blogData) => createItem(blogData),
    updateBlog: (id, blogData) => updateItem(id, blogData),
    deleteBlog: (id) => deleteItem(id),
    likeBlog: (id) => customRequest("POST", `/${id}/like`),
    addComment: (id, text) => customRequest("POST", `/${id}/comment`, { text }),
    deleteComment: (id, commentId) => customRequest("DELETE", `/${id}/comment/${commentId}`),
  };
};