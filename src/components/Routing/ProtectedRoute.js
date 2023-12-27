import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");

  if (!user && !token) {
    // Redirect to login page or display an appropriate message
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
