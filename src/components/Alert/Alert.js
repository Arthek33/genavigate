// Alert.js
import React from "react";

const Alert = ({ message, type }) => {
  const backgroundColor = type === "error" ? "bg-red-700/80" : "bg-teal-500/80";
  return (
    <div
      className={`fixed top-5 left-1/2 translate-x-[-50%] ${backgroundColor} text-white py-2 px-8 rounded shadow-md z-50 animate-fade-in-down animation-fill`}
    >
      {message}
    </div>
  );
};

export default Alert;
