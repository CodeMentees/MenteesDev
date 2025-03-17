import api from "./api";
//login
export const loginUser = async (userData) => {
    try {
      const response = await api.post("/auth/login", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

//register
export const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };


