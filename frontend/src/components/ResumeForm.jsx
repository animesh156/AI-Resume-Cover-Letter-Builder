import { useRef, useState } from "react";
import axios from "axios";
import { FaUser, FaTools, FaBriefcase } from "react-icons/fa";
import OutputPreview from "./OutputPreview";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function ResumeForm() {
  const [form, setForm] = useState({
    name: "",
    skills: "",
    experience: "",
  });

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const outputRef = useRef();
  const navigate = useNavigate(); // For redirecting

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary(""); // Clear old output
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_Backend_Url}/api/generate-resume`,
        {
          ...form,
          skills: form.skills.split(",").map((s) => s.trim()),
        },
        { withCredentials: true } // Important if using cookies
      );
      setSummary(res.data.resume);
      toast.success("✅ Resume generated successfully!");
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 429) {
        toast.error("🚫 Daily limit reached. Try again tomorrow.");
      } else {
        toast.error("❌ Failed to generate resume. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `http://localhost:6884/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("🚪 Logged out successfully!");
      navigate("/login"); // or home page
    } catch (err) {
      console.error(err);
      toast.error("❌ Logout failed.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Logout Button */}
      <div className="absolute right-6 ">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      {/* Resume Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-2xl px-8 py-10 space-y-6 border border-blue-200"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          🚀 Build Your Resume
        </h2>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            <input
              name="name"
              type="text"
              placeholder="e.g. Animesh Rathore"
              onChange={handleChange}
              className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills{" "}
            <span className="text-xs text-gray-500">(comma-separated)</span>
          </label>
          <div className="relative">
            <FaTools className="absolute left-3 top-3.5 text-gray-400" />
            <input
              name="skills"
              type="text"
              placeholder="e.g. React, Tailwind, MongoDB"
              onChange={handleChange}
              className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <div className="relative">
            <FaBriefcase className="absolute left-3 top-3.5 text-gray-400" />
            <textarea
              name="experience"
              placeholder="e.g. Built full-stack MERN apps, solved 1000+ DSA problems..."
              onChange={handleChange}
              rows={5}
              className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-md"
        >
          {loading ? (
            <ClipLoader size={20} color="#fff" />
          ) : (
            "✨ Generate Resume"
          )}
        </button>
      </form>

      {/* Resume Output */}
      {summary && (
        <div ref={outputRef}>
          <OutputPreview summary={summary} />
        </div>
      )}
    </div>
  );
}

export default ResumeForm;
