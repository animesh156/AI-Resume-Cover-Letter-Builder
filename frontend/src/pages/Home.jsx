import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🎯 AI Resume & Cover Letter Builder</h1>
      <div className="space-x-6">
        <Link to="/resume">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow">📝 Build Resume</button>
        </Link>
        <Link to="/cover-letter">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg shadow">✉️ Generate Cover Letter</button>
        </Link>
      </div>
    </div>
  );
}
