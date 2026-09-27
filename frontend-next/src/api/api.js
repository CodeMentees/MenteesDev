import axios from "axios";

const api = axios.create({
  baseURL: typeof window !== 'undefined'
    ? "/api"
    : `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: during SSR/SSG prerendering (Node.js), mock relative API calls 
// with safe empty responses to prevent Node.js Axios adapter errors.
api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    config.adapter = () => Promise.resolve({
      data: { success: true, data: [] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    });
  }
  return config;
});

export default api;
