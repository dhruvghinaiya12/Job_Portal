import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-6xl font-bold text-teal-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
