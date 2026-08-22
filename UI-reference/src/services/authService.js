import api from './api';

export const signupUser = async(data)=>{
    try{
        const res=await api.post("/auth/signup",data);
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Signup failed");
    }
};

export const loginUser = async(data)=>{
    try{
        const res=await api.post("/auth/login",data);
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Login failed");
    }
};

export const getProfile = async()=>{
    try{
        const res = await api.get("/auth/profile");
        return res.data;
    }catch(error){
        throw new Error(error.response?.data?.message || "Failed to fetch profile");    
    }
}