import { useState } from "react";
import axios from "axios";
import { FaUser, FaTools, FaBriefcase } from "react-icons/fa";
import OutputPreview from "./OutputPreview";
import { toast } from "react-toastify";

function ResumeForm() {
  const [form, setForm] = useState({
    name: "",
    skills: "",
    experience: ""
  });

  const [summary, setSummary] = useState(""); // local summary state

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6884/api/generate-resume", {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim())
      });
      setSummary(res.data.resume); // store the full resume (not just summary)
      toast.success("Resume generated successfully")

    } catch (err) {
      console.log(err);

      if (err.response?.status === 429) {
      toast.error("🚫 Daily limit reached. Try again tomorrow.");
    } else {
      toast.error("❌ Failed to generate resume. Please try again.");
    }
    }
  };

  return (
    <div className="space-y-8">
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
            Skills <span className="text-xs text-gray-500">(comma-separated)</span>
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

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold px-6 py-3 rounded-lg w-full shadow-md"
        >
          ✨ Generate Resume
        </button>
      </form>

      {/* Output Preview */}
      {summary && <OutputPreview summary={summary} />}
    </div>
  );
}

export default ResumeForm;
