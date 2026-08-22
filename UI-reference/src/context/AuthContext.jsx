import { createContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && typeof parsedUser === 'object') {
                    setUser(parsedUser);
                    setToken(storedToken);
                } else {
                    throw new Error('Invalid user shape in storage');
                }
            } catch (error) {
                console.error("Failed to parse stored user: ", error);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    const signup = async(data)=>{
        const response = await authService.signupUser(data);
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        return response;
    }

    const login = async(emailOrData, password) => {
        let response;
        
        // If called from components after auth service response
        if (typeof emailOrData === 'object' && password) {
            response = {
                user: emailOrData,
                token: password
            };
        } else {
            // If called with email and password for direct login
            response = await authService.loginUser({email: emailOrData, password});
        }
        
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        return response;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const value={
        user,
        token,
        loading,
        signup,
        login,
        logout,
        isAuthenticated: !!token,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };