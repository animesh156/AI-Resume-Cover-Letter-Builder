import { useState, useRef } from "react";
import axios from "axios";
import OutputPreview from "../components/CoverLetterOutput";

function CoverLetterForm() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    company: "",
    skills: "",
    experience: "",
  });

  const [letter, setLetter] = useState("");

  // Ref to scroll into view
  const outputRef = useRef();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      };
      const res = await axios.post(
        "http://localhost:6884/api/generate-coverletter",
        payload
      );
      setLetter(res.data.letter);

      // Scroll to output after setting the letter
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to generate cover letter.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 border border-green-300 rounded-2xl mt-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
          ✉️ Generate Cover Letter
        </h2>

        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="position"
          placeholder="Position (e.g., Frontend Developer)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="company"
          placeholder="Company Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="skills"
          placeholder="Skills (comma-separated)"
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="experience"
          placeholder="Experience Summary"
          rows={4}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          🧠 Generate Cover Letter
        </button>
      </form>

      {/* Output Preview */}
      {letter && (
        <div ref={outputRef} className="mt-8">
          <OutputPreview letter={letter} />
        </div>
      )}
    </div>
  );
}

export default CoverLetterForm;
