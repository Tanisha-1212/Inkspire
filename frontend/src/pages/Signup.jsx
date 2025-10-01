// src/pages/SignupPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(formData); // 🔥 calling your AuthContext register
      navigate("/"); // after successful signup -> redirect to home/landing
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[90vh] bg-black text-white relative z-10">


      <div className="w-full max-w-md bg-black border border-green-400 rounded-2xl p-8 shadow-lg shadow-green-400/30">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create an <span className="text-green-400">Inkspire</span> Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm mb-2">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-md bg-black border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-md bg-black border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-md bg-black border border-green-400 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 text-black py-3 rounded-md font-semibold hover:bg-green-500 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <span className="h-px w-16 bg-green-400" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <span className="h-px w-16 bg-green-400" />
        </div>

        {/* Extra Links */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
