import { useState } from "react";
import CoverLetterForm from "../components/CoverLetterForm";
import OutputPreview from "../components/OutputPreview";

export default function CoverLetterPage() {
  const [letter, setLetter] = useState("");
  const [summary, setSummary] = useState(""); // You can persist from resume later

  return (
    <div className="max-w-3xl mx-auto p-6">
      <CoverLetterForm summary={summary} setLetter={setLetter} />
      {letter && <OutputPreview summary={summary} letter={letter} />}
    </div>
  );
}
