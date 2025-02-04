import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import {Link} from "react-router-dom"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    credential: "",
    client_id: "",
  });

  const setFormDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signUpHandler = async (googleResponse) => {
    // Update the formData object manually for the API call
    const updatedFormData = {
      ...formData,
      credential: googleResponse.credential || "",
      client_id: googleResponse.clientId || "",
    };

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await response.json();
        alert(data.message);
        window.location.href = "/login";
      
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="font-[sans-serif] bg-cream md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-full aspect-square object-contain block mx-auto"
            alt="login-image"
          />
        </div>
        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-yellow-500">
                Create an account
              </h3>
            </div>
            <div>
              <label className="text-white text-xs block mb-2">Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={setFormDataHandler}
                required
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-500 pl-2 pr-8 py-3 outline-none"
                placeholder="Enter name"
              />
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={setFormDataHandler}
                required
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-500 pl-2 pr-8 py-3 outline-none"
                placeholder="Enter email"
              />
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={setFormDataHandler}
                required
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-500 pl-2 pr-8 py-3 outline-none"
                placeholder="Enter password"
              />
            </div>
            <div className="flex items-center mt-8">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
                required
              />
              <label
                htmlFor="terms"
                className="text-white ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="#"
                  className="text-yellow-500 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => signUpHandler({})} // Placeholder for manual signup
                className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
              >
                Register
              </button>
              <p className="text-sm text-white mt-8">
                Already have an account?{" "}
                <Link to={"/login"}
                  className="text-yellow-500 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </div>
            <div className="mt-4">
              <GoogleLogin
                onSuccess={signUpHandler}
                onError={() =>
                  console.error("Google Login Failed")
                }
                
                
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
