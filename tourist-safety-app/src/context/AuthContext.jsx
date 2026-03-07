// ===== Authentication Context =====
// Provides user authentication state across the entire app.
// Any component can access the current user, login, signup, and logout functions.

import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  signupUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
} from "../services/authService";
import { MOCK_USER } from "../utils/constants";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = getCurrentUser();
    if (savedUser && isAuthenticated()) {
      setUser(savedUser);
    } else {
      // Use mock user for development (remove when backend is ready)
      setUser(MOCK_USER);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  // Signup function
  const signup = async (name, email, password) => {
    const result = await signupUser(name, email, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  // Logout function
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Values available to all child components
  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
