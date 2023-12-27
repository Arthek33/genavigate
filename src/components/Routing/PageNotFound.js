import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex justify-center text-center mt-32 dark:text-gray-100 text-gray-900">
      <div className="">
        <h1 className="text-9xl font-bold tracking-tight">404</h1>
        <h2 className="text-2xl">Page not found</h2>
        <div className="mt-6">
          <Link
            to="/"
            className="w-full text-white bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 focus:ring-4 focus:outline-none focus:ring-orange-200 dark:focus:ring-red-800 font-medium rounded px-3 py-2 text-center"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
