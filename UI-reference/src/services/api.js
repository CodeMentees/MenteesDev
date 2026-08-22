import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api=axios.create({
    baseURL,
    timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error)=>{
    return Promise.reject(error);
})

api.interceptors.response.use((response)=>response, (error)=>{
    const requestUrl = error.config?.url || "";
    const isAuthRoute = requestUrl.includes("/auth/login") || requestUrl.includes("/auth/signup");

    if(error.response?.status===401 && !isAuthRoute){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href="/login";
    }
    return Promise.reject(error);
})

export default api;