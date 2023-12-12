import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("authToken", token);
    // Store the token in local storage or cookies here
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("authToken");
    // Clear the token from storage here
  };

  const updateUserContext = (newUserData) => {
    setUser(newUserData);
  };

  useEffect(() => {
    const checkUserAuthentication = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await getCurrentUser();
          setUser(response.data.data.data);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching current user:", error);
          // Optionally handle logout or token removal here
        }
      }
    };
    checkUserAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        updateUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
