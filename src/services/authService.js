import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
console.log("API URL:", API_URL);

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to requests if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: async (email, password) => {
        console.log("Attempting login with api:", api.baseURL);
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post("/auth/register", userData);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem("user");
        return userStr ? JSON.parse(userStr) : null;
    },

    getToken: () => {
        return localStorage.getItem("token");
    },
};

export default api;
