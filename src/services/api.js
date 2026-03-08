// ===== Axios Base Configuration =====
// This file sets up Axios with a base URL and auth token interceptor.
// All API calls in the app go through this configured instance.

import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// ---- Request Interceptor ----
// Automatically attaches the auth token to every outgoing request
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

// ---- Response Interceptor ----
// Handles 401 (unauthorized) globally — logs out if token expired
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
