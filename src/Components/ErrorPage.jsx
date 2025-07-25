import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // modern icon

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#122] [#122] to-pink-500 text-white px-4">
      <div className="flex items-center gap-4 animate-bounce">
        <AlertTriangle className="w-16 h-16 text-yellow-300" />
        <h1 className="text-7xl font-extrabold tracking-widest">404</h1>
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold mt-6">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-center mt-2 max-w-md">
        The page you&apos;re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-lg hover:scale-105 transition transform"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
