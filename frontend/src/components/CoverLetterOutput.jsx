import { useRef } from "react";
import html2pdf from "html2pdf.js";

const OutputPreviewCoverLetter = ({ letter }) => {
  const pdfRef = useRef();

  const handleDownload = async () => {
    if (!pdfRef.current) {
      console.error("PDF target element (pdfRef.current) is not available.");
      return;
    }

    const opt = {
      margin: 0.5,
      filename: 'CoverLetter.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
      }
    };

    try {
      await html2pdf().set(opt).from(pdfRef.current).save();
      console.log("📄 Cover letter PDF successfully generated!");
    } catch (error) {
      console.error("❌ Error generating cover letter PDF:", error);
      alert("Failed to generate PDF. Please check the console for details.");
    }
  };

  return (
    <div className="mt-8">
      <div
        ref={pdfRef}
        className="bg-white text-black p-6 rounded-xl border border-gray-300 shadow-lg whitespace-pre-wrap"
      >
        <h2 className="text-2xl font-bold text-green-700 mb-4">📬 Cover Letter</h2>
        <p>{letter}</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        ⬇️ Download Cover Letter as PDF
      </button>
    </div>
  );
};

export default OutputPreviewCoverLetter;
