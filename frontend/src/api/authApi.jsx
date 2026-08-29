import useCRUD from "../api/useCRUD";
// 🔹 Auth API
const authAPI = "/auth";
export const useAuth = () => {
  const { customRequest } = useCRUD(authAPI);
  return {
    loginUser: (userData) => customRequest("post", "/login", userData),
    registerUser: (userData) => customRequest("post", "/register", userData),
  };
};
