// ===== Authentication Service =====
// Handles login, signup, and user session management.
// Uses the configured Axios instance from api.js.

import api from "./api";

// POST /api/auth/login — Authenticate user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data;

    // Save token & user to localStorage for session persistence
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    return { success: false, message };
  }
};

// POST /api/auth/signup — Register new user
export const signupUser = async (name, email, password) => {
  try {
    const response = await api.post("/auth/signup", { name, email, password });
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    const message =
      error.response?.data?.message || "Signup failed. Please try again.";
    return { success: false, message };
  }
};

// Logout — Clear session data
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Get currently logged in user from localStorage
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
