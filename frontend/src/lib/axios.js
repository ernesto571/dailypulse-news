// In your lib/axios.js
import axios from 'axios';


const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://dailypulse-f8ra.onrender.com/api";


export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for better debugging
axiosInstance.interceptors.request.use(
  (config) => {
    // console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(`✅ Response received from: ${response.config.url}`);
    return response;
  },
  (error) => {
    // console.log(`❌ Request failed: ${error.config?.url}`, error.message);
    return Promise.reject(error);
  }
);