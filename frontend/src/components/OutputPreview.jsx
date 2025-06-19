import { useRef } from "react";
import html2pdf from "html2pdf.js";

const OutputPreview = ({ summary }) => {
  const pdfRef = useRef();

  const handleDownload = async () => { // Make the function async
    if (!pdfRef.current) {
      console.error("PDF target element (pdfRef.current) is not available.");
      return;
    }

    console.log("Attempting to generate PDF from element:", pdfRef.current);

    const opt = {
      margin: 0.5,
      filename: 'Resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true, // Important for images if you add any later
        logging: true, // Enable logging for html2canvas
        // Additional options for html2canvas if needed:
        // letterRendering: true,
        // allowTaint: false,
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
        // Additional options for jsPDF if needed:
        // putOnlyUsedFonts: true,
      }
    };

    try {
      // Use await to ensure the operation completes or throws an error
      await html2pdf().set(opt).from(pdfRef.current).save();
      console.log("PDF generation successful!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // You can also display an alert to the user
      alert("Failed to generate PDF. Please check the console for details.");
    }
  };

  return (
    <div className="mt-8">
      <div
        ref={pdfRef}
        className="bg-white text-black p-6 rounded-xl border border-gray-300 shadow-lg whitespace-pre-wrap"
      >
        <h2 className="text-2xl font-bold text-blue-700 mb-4">📄 Resume</h2>
        {/*
          Ensure 'summary' is correctly rendered.
          If 'summary' could contain HTML, you might use dangerouslySetInnerHTML,
          but for plain text like your example, a direct prop is fine.
        */}
        <p>{summary}</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition"
      >
        ⬇️ Download as PDF
      </button>
    </div>
  );
};

export default OutputPreview;