// src/layouts/AuthLayout.jsx
import React from "react";
import logo from "../assets/images/logo/logo.png";
import cover from "../assets/images/login-page-cover.png";

const AuthLayout = ({ children, title = "Welcome Back", subtitle = "Sign in to access your dashboard" }) => {
  return (
    <div className="admin-wrapper flex items-center justify-center h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-none h-full md:h-screen p-4">
        {/* Left Side - Image */}
        <div className="w-full hidden md:block">
          <img
            src={cover}
            alt="Ezykheti"
            className="w-full h-full object-cover rounded-l-4xl md:rounded-l-4xl md:rounded-r-none"
            onError={(e) => (e.target.src = "/fallback-image.gif")}
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col px-16">
          <div className="flex items-center justify-center w-full rounded-l-4xl">
            <img
              src={logo}
              alt="Logo"
              className="w-62 py-8 h-auto object-contain"
            />
          </div>
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          </div>

          {/* Render whatever gets passed in */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
