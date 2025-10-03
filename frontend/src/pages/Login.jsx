import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import DotsBackground from "../components/DotsBackground";

export default function LoginPage() {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password }); // AuthContext expects object
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div className="h-[90vh] relative z-10 flex items-center justify-center bg-black text-white px-4">
        <DotsBackground/>
      <div className="bg-black rounded-2xl  p-8 w-full max-w-md border border-green-400 shadow-lg shadow-green-400/30">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
           Login to Your <span className="text-green-400">Inkspire</span> Account
        </h2>

        {error && (
          <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-white mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm text-white"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-green-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 text-white"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-400 text-black font-semibold py-2 rounded-lg hover:bg-green-500 transition-colors"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6">
          <span className="h-px w-16 bg-green-400" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <span className="h-px w-16 bg-green-400" />
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-green-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
