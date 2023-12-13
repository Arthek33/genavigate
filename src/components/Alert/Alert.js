// Alert.js
import React from "react";

const Alert = ({ message, type }) => {
  const backgroundColor = type === "error" ? "bg-red-700/90" : "bg-teal-500/90";
  return (
    <div
      className={`fixed top-4 left-1/2 translate-x-[-50%] ${backgroundColor} text-white text-sm sm:text-base py-2 px-4 sm:px-8 rounded shadow-md z-50 animate-fade-in-down animation-fill transition-all`}
    >
      {message}
    </div>
  );
};

export default Alert;
