import { initFlowbite } from "flowbite";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUserAPI } from "../../api/userApi";
import { updateUserSession } from "../../Slices/authSlice";

function AddEditUser() {
  const { fetchUser, createUser, updateUser } = useUserAPI();
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    isFullAccess: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    initFlowbite();
    if (id) {
      setIsEditing(true);
      fetchUserDetails(id);
    }
  }, [id]);

  const fetchUserDetails = async (userId) => {
    setIsLoading(true);
    try {
      const data = await fetchUser(userId);
      setUserData({
        name: data.name || "",
        email: data.email || "",
        password: "", // Don't populate password
        isFullAccess: data.isFullAccess || false,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      setToast({ visible: true, message: "Error fetching user details", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({ 
      ...prev, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response;
      if (isEditing) {
        // If editing and password is empty, don't send it
        const updatePayload = { ...userData };
        if (!updatePayload.password) delete updatePayload.password;
        response = await updateUser(id, updatePayload);
        
        // Sync local auth state if the admin is updating their own profile
        if (currentUser && (currentUser._id === id || currentUser.id === id)) {
          dispatch(updateUserSession(updatePayload));
        }
      } else {
        response = await createUser(userData);
      }

      setToast({ visible: true, message: isEditing ? "User updated successfully!" : "User created successfully!", type: "success" });

      setTimeout(() => {
        setToast({ visible: false, message: "", type: "success" });
        navigate("/admin/users");
      }, 2000);
    } catch (error) {
      console.error(error);
      setToast({
        visible: true,
        message: error.response?.data?.message || "Something went wrong!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-900 text-white min-h-screen p-6">
      {toast.visible && (
        <div
          className={`fixed z-50 top-5 right-5 p-4 rounded-lg shadow-md ${
            toast.type === "error"
              ? "bg-red-700 text-red-200"
              : "bg-green-700 text-green-200"
          }`}
        >
          {toast.type === "error" ? "❌" : "✅"} <span>{toast.message}</span>
        </div>
      )}

      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          {isEditing ? "👤 Edit User" : "➕ Add New User"}
        </h2>

        {isLoading && !userData.name && isEditing ? (
            <div className="text-center py-10">Loading user data...</div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              value={userData.name}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              value={userData.email}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password {isEditing && "(leave blank to keep current)"}
            </label>
            <input
              type="password"
              name="password"
              required={!isEditing}
              onChange={handleChange}
              value={userData.password}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              id="isFullAccess"
              name="isFullAccess"
              checked={userData.isFullAccess}
              onChange={handleChange}
              className="w-5 h-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
            />
            <label htmlFor="isFullAccess" className="block text-sm font-medium text-gray-300 cursor-pointer select-none">
              Grant Full Access (Premium)
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : null}
              {isEditing ? "Update User" : "Create User"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
        )}
      </div>
    </section>
  );
}

export default AddEditUser;
