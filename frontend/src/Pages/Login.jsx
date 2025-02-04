import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../Slices/authSlice';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const dispatch = useDispatch();
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  const auth = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (auth) {
      window.location.href = '/';
    }
  }, [auth]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem('token', data.data.token);
        dispatch(login(data.data));
        setToast({ visible: true, message: data.message, type: "success" });
        setTimeout(() => {
          setToast({ visible: false, message: "", type: "success" });
        }, 5000);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setToast({ visible: true, message: "Invalid password or Email", type: "error" });
      setTimeout(() => {
        setToast({ visible: false, message: "Invalid password or Email", type: "error" });
      }, 5000);
    }
  };


  return (
    <div>

      <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {toast.visible && (
            <div
              className={`fixed z-50 top-5 right-5 inline-flex items-center p-4 space-x-2 text-sm font-medium text-green-500 bg-green-100 rounded-lg ${toast.type === "error" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
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
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Or{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              create an account
            </a>
          </p>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleLoginSubmit();
              }}
            >
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember_me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-100 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <GoogleLogin
                  onSuccess={handleLoginSubmit}
                  text="Google"
                  useOneTap={true}
                  onError={() => console.error('Google Login Failed')}
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
