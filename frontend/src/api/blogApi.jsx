import useCRUD from "../api/useCRUD";
// 🔹 Blog API
const blogAPI = "/posts";
export const useBlog = () => {
  const { getItems, getItemById, createItem, updateItem, deleteItem } = useCRUD(blogAPI);
  return {
    fetchLatestBlogs: (page = 1, limit = 10) => getItems(page, limit),
    fetchBlog: (id) => getItemById(id),
    createBlog: (blogData) => createItem(blogData),
    updateBlog: (id, blogData) => updateItem(id, blogData),
    deleteBlog: (id) => deleteItem(id),
  };
};