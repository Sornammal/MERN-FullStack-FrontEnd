import axios from 'axios';

// Function to set token dynamically
let token = null;

export const setAuthToken = (newToken) => {
  token = newToken;
};


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://mern-fullstack-backend-1.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add a request interceptor for auth token
api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Add a response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response
    },
    (error) => {
        // Handle errors globally
        return Promise.reject(error);
    }
);

export default api;