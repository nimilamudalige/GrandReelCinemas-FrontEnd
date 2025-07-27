import axios from 'axios';

// API client for GrandReel Cinemas backend
export const backendApi = axios.create({
    baseURL: 'http://localhost:3000/api' // Update to actual deployment URL when ready
});

// Attach JWT token to each request if available
backendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
