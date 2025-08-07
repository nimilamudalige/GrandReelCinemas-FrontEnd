// api.ts
import axios from 'axios';

export const backendApi = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Add response interceptor for token refresh
backendApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axios.post('http://localhost:3000/api/auth/refresh', {
                        refreshToken
                    });
                    const { token } = response.data;
                    localStorage.setItem('token', token);

                    // Retry the original request
                    error.config.headers['Authorization'] = `Bearer ${token}`;
                    return backendApi(error.config);
                } catch (refreshError) {
                    localStorage.clear();
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);

// Request interceptor remains the same
backendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);