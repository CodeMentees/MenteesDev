import { useState } from "react";
import api from "./api"; // Ensure this is correctly configured

const useCRUD = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const apiCall = async (method, url = "", body = null) => {
    setIsLoading(true);
    setError(null); // Reset error before making request

    try {
      const config = {
        method,
        url: `${endpoint}${url}`,
        headers: body instanceof FormData ? {} : {
          "Content-Type": "application/json",
        },
      };

      // Include body for POST, PUT, PATCH requests
      if (body && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
        config.data = body;
      }

      const response = await api(config);

      setData(response.data);

      // Handle pagination response if available
      if (response.data?.totalPages !== undefined) {
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage || 1);
      }

      return response.data;
    } catch (err) {
      // Safely extract error message
      let errorMessage = "An error occurred";

      if (err.response && err.response.data) {
        if (typeof err.response.data === 'object' && err.response.data.message) {
          errorMessage = err.response.data.message;
        } else if (typeof err.response.data === 'string' && err.response.data.startsWith('<!DOCTYPE')) {
          // If it's an HTML response, try to extract error text or use fallback
          errorMessage = "User Not Found";
        } else {
          errorMessage = err.response.data;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      const customError = new Error(errorMessage);
      if (err.response) {
        customError.response = err.response;
      }
      throw customError;
    } finally {
      setIsLoading(false);
    }
  };

  // Expose CRUD operations
  return {
    data,
    isLoading,
    error,
    totalPages,
    currentPage,
    getItems: (page = 1, limit = 10) => apiCall("GET", `?page=${page}&limit=${limit}`),
    getItemById: (id) => apiCall("GET", `/${id}`),
    createItem: (body) => apiCall("POST", "", body),
    updateItem: (id, body) => apiCall("PUT", `/${id}`, body),
    deleteItem: (id) => apiCall("DELETE", `/${id}`),
    customRequest: (method, url, body = null) => apiCall(method.toUpperCase(), url, body),
  };
};

export default useCRUD;
