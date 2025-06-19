import { useState } from "react";
import axios from "axios";

function CoverLetterForm({ summary, setLetter }) {
  const [jobDesc, setJobDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:6884/api/generate-cover-letter", {
        resume: summary,
        jobDescription: jobDesc,
      });
      setLetter(res.data.letter);
    } catch (err) {
      console.log(err);
      alert("❌ Failed to generate cover letter.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md border border-green-200 rounded-2xl p-6 mt-8 space-y-4">
      <h2 className="text-2xl font-bold text-green-700 text-center">✉️ Generate Cover Letter</h2>
      <label className="block text-sm font-medium text-gray-700">Job Description</label>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500"
        rows={5}
        placeholder="Paste the job description here..."
        onChange={(e) => setJobDesc(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg w-full transition"
      >
        🧠 Generate Letter
      </button>
    </form>
  );
}

export default CoverLetterForm;
