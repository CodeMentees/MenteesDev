import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../Slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

import { useAuth } from "../api/authApi";

function LoginPage() {
  const { loginUser } = useAuth();
  const dispatch = useDispatch();
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const auth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (auth) {
      window.location.href = "/";
    }
  }, [auth]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    credential: null,
    client_id: null,
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (googleResponse = null) => {
    const updatedFormData = {
      ...formData,
      ...(googleResponse && {
        credential: googleResponse.credential,
        client_id: googleResponse.clientId,
      }),
    };
    const userData = await loginUser(updatedFormData)
    if(userData){
      localStorage.setItem("token", userData.token);
        dispatch(login(userData));
        setToast({ visible: true, message: data.message, type: "success" });
        setTimeout(() => {
          setToast({ visible: false, message: "", type: "success" });
        }, 5000);
    }
    else{
      alert("Error : User could not login")
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-dark-background flex flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {toast.visible && (
            <div
              className={`fixed z-50 top-5 right-5 inline-flex items-center p-4 space-x-2 text-sm font-medium text-green-500 bg-green-100 rounded-lg ${
                toast.type === "error"
                  ? "text-red-500 bg-red-100"
                  : "text-green-500 bg-green-100"
              }`}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span>{toast.message}</span>
            </div>
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
                  <a
                    href="#"
                    className="font-medium text-dark-btn hover:underline"
                  >
                    Forgot your password?
                  </a>
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
                  {/* <div className="w-full border-t border-gray-300" /> */}
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
