import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null; // wait until auth state is ready

  return (
    <nav className="flex justify-between items-center bg-black p-5">
      {/* Logo */}
      <div
        className="text-green-400 text-2xl hover:text-green-400 font-mono cursor-pointer"
        onClick={() => navigate("/")}
      >
        Inkspire
      </div>

      {/* Links */}
      <div className="text-white flex gap-5 items-center">
        <Link
          to="/"
          className="hover:text-green-400 transition-colors transform hover:scale-110"
        >
          Home
        </Link>
        <Link
          to="/explore"
          className="hover:text-green-400 transition-colors transform hover:scale-110"
        >
          Blogs
        </Link>

        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="hover:text-green-400 transition-colors transform hover:scale-110"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="hover:text-green-400 transition-colors transform hover:scale-110"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/Signup"
              className="hover:text-green-400 transition-colors transform hover:scale-110"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="hover:text-green-400 transition-colors transform hover:scale-110"
            >
              Login
            </Link>
          </>
        )}
      </div>

      {/* Greeting */}
      {isAuthenticated && (
        <div className="ml-4 text-green-400 text-sm">
          Hi, {user?.username || "User"}
        </div>
      )}
    </nav>
  );
}
