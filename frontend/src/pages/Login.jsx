import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider, signInWithPopup } from "../fireBase";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleEmailLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `https://resume-builder-backend-7odt.onrender.com/auth/login`,
      { email, password },
      { withCredentials: true } // Make sure cookies are sent
    );

    // ✅ Save name in localStorage
    localStorage.setItem("userName", res.data.name);

    toast.success("Logged in successfully");
    navigate("/resume");
  } catch (err) {
    console.error(err);
    toast.error("Invalid credentials. Try again.");
  }
};


  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();

    const res = await axios.post(
      `https://resume-builder-backend-7odt.onrender.com/auth/firebase-login`,
      { token },
      { withCredentials: true }
    ); 

    // ✅ Save name in localStorage
    localStorage.setItem("userName", res.data.name);

    toast.success("Signed in with Google");
    navigate("/resume");
  } catch (err) {
    console.error(err);
    toast.error("Google login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login to AI Resume Builder
        </h2>

        {/* Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Login
          </button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <span className="border-t w-1/4 border-gray-400" />
          <span className="text-sm text-gray-500">OR</span>
          <span className="border-t w-1/4 border-gray-400" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
