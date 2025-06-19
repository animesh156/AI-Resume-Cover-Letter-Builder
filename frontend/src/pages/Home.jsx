import { Link } from "react-router-dom";

import TypewriterText from "../components/TypeWriterText";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 p-6 text-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <h1 className="text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">
        🚀 AI Resume & Cover Letter Builder
      </h1>

        <TypewriterText />

      <div className="flex flex-col mt-5 sm:flex-row gap-6">
        <Link to="/resume">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 duration-300">
            📝 Build Resume
          </button>
        </Link>
        <Link to="/cover-letter">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 duration-300">
            ✉️ Generate Cover Letter
          </button>
        </Link>
      </div>
    </div>
  );
}
