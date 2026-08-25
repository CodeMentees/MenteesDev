import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../Slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Toast from "../Components/UI/Toast";

import { useAuth } from "../api/authApi";

function LoginPage() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const auth = useSelector((state) => state.auth.isAuthenticated);

  const from = location.state?.from || "/";

  useEffect(() => {
    if (auth) {
      navigate(from, { replace: true });
    }
  }, [auth, navigate, from]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember_me: false,
    credential: null,
    client_id: null,
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: "", type: "success" });
    }, 3000);
  };

  const handleLoginSubmit = async (googleResponse = null) => {
    const updatedFormData = {
      ...formData,
      ...(googleResponse && {
        credential: googleResponse.credential,
        client_id: googleResponse.clientId,
      }),
    };
    try {
      const userData = await loginUser(updatedFormData);
      if (userData) {
        localStorage.setItem("token", userData.token);
        dispatch(login(userData));
        showToast(userData.message || "Logged in successfully!", "success");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 2000);
      } else {
        showToast("Invalid credentials or login failed.", "error");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage = error.message || "";
      if (errorMessage.includes("User not Signed Up")) {
        showToast("User not found. Please sign up first.", "error");
      } else {
        showToast(errorMessage || "An error occurred during login.", "error");
      }
      
      // Handle the case where the user needs verification (from error message or special flag)
      if (error.response && error.response.status === 401 && error.response.data && error.response.data.needsVerification) {
         setTimeout(() => {
           navigate("/verify-otp", { state: { email: error.response.data.email } });
         }, 2000);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-dark-background flex flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {toast.visible && (
            <Toast
              message={toast.message}
              type={toast.type}
              visible={toast.visible}
            />
          )}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-dark-h">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400 max-w">
            Or{" "}
            <Link
              to={"/register"}
              className="font-medium text-dark-btn hover:underline"
            >
              create an account
            </Link>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full smax-w-md lg:w-2/3">
          <div className="py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-transparent">
            <form
              className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs text-white mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  autoComplete="email"
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-dark-btn pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs text-white mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  autoComplete="current-password"
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-dark-btn pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    checked={formData.remember_me}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-dark-btn border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 text-sm text-white"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-dark-btn hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleLoginSubmit}
                  className="w-max shadow-xl py-3 px-6 text-sm text-gray-900 font-semibold rounded bg-dark-btn"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <GoogleLogin
                  onSuccess={handleLoginSubmit}
                  text="Google"
                  useOneTap={true}
                  onError={() => console.error("Google Login Failed")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
