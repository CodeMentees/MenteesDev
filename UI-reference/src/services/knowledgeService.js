import api from "./api";

// Fetch knowledge documents with optional search and category filters
export const getDocuments = async (search = "", category = "") => {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category) params.append("category", category);

    const res = await api.get(`/knowledge?${params.toString()}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch knowledge documents");
  }
};

// Upload a plain text or markdown document
export const uploadDocument = async (formData) => {
  try {
    const res = await api.post("/knowledge/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to upload document");
  }
};

// Delete a document from the knowledge base
export const deleteDocument = async (id) => {
  try {
    const res = await api.delete(`/knowledge/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete document");
  }
};
