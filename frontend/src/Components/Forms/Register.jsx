import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Toast from "../UI/Toast";
import { useAuth } from "../../api/authApi";

function Register() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const { loginUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    if (isAuthenticated) {
      setToast({
        visible: true,
        message: "You are already logged in.",
        type: "success",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isAuthenticated, navigate]);

  const setFormDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  const signUpHandler = async (googleResponse) => {
    const updatedFormData = {
      ...formData,
      credential: googleResponse.credential || "",
      client_id: googleResponse.clientId || "",
    };

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();

      if (response.ok) {
        showToast(data.message || "Registration successful! Please verify your email.", "success");
        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
        }, 1500);
      } else {
        showToast(data.message || "Registration failed.", "error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const googleSignUpHandler = async (googleResponse) => {
    try {
      const data = await loginUser({
        credential: googleResponse.credential,
        client_id: googleResponse.clientId,
      });
      showToast(data.message || "Registration successful!", "success");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      showToast("Google Registration failed", "error");
    }
  };

  return (
    <div className="font-[sans-serif] bg-cream md:h-screen">
      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          visible={toast.visible}
        />
      )}
      <div
        style={{
          backgroundImage: `url("/images/register-bg.svg")`,
        }}
        className="grid md:grid-cols-2 items-center gap-8 h-full bg-dark-background"
      >
        <div className="max-md:order-1 p-4">
          <img
            src="/images/register.svg"
            className="lg:max-w-[85%] animate-float w-full h-full aspect-square object-contain block mx-auto"
            alt="login-image"
          />
        </div>
        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto bg-dark-background">
          <form className="max-w-lg w-full mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-dark-h">
                Create an account
              </h3>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div>
                <label className="text-white text-xs block mb-2">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={setFormDataHandler}
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-dark-btn pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="text-white text-xs block mb-2">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={setFormDataHandler}
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-dark-btn pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={setFormDataHandler}
                required
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-dark-btn pl-2 pr-8 py-3 outline-none"
                placeholder="Enter password"
              />
            </div>

            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Phone Number</label>
              <input
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={setFormDataHandler}
                required
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-dark-btn pl-2 pr-8 py-3 outline-none"
                placeholder="Enter phone number"
              />
            </div>
            {/* <div className="flex items-center mt-8"> */}
            {/* <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
                required
              /> */}
            {/* <label htmlFor="terms" className="text-white ml-3 block text-sm">
                I accept the{" "}
                <a
                  href="#"
                  className="text-dark-btn font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label> */}
            {/* </div> */}
            <div className="mt-8">
              <button
                type="button"
                onClick={() => signUpHandler({})}
                disabled={isLoading}
                className={`w-max shadow-xl py-3 px-6 text-sm text-gray-900 font-semibold rounded bg-dark-btn ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-90"}`}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
              <p className="text-sm text-white mt-8">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-dark-btn font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </div>
            <div className="mt-4">
              <GoogleLogin
                onSuccess={googleSignUpHandler}
                text="signup_with"
                onError={() => showToast("Google Login Failed", "error")}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
