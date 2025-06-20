import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider, signInWithPopup } from "../fireBase";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `https://resume-builder-backend-7odt.onrender.com/auth/register`,
      form,
      { withCredentials: true } // Important for cookies
    );

    // Save name to localStorage
    localStorage.setItem("userName", res.data.name);

    toast.success("Account created successfully!");
    navigate("/resume");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.error || "Registration failed.");
  }
};

const handleGoogleSignup = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const token = await user.getIdToken();

    const res = await axios.post(
      `https://resume-builder-backend-7odt.onrender.com/auth/firebase-login`,
      { token },
      { withCredentials: true } // Send cookie with request
    );

    // Save name to localStorage
    localStorage.setItem("userName", res.data.name);

    toast.success("Signed in with Google");
    navigate("/resume");
  } catch (err) {
    console.error(err.message);
    toast.error("Google login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
          >
            Register
          </button>
        </form>

        <div className="my-6 flex items-center justify-between">
          <span className="border-t w-1/4 border-gray-400" />
          <span className="text-sm text-gray-500">OR</span>
          <span className="border-t w-1/4 border-gray-400" />
        </div>

        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">
            Sign up with Google
          </span>
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
