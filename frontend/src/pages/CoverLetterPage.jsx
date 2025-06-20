import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CoverLetterForm from "../components/CoverLetterForm";

export default function CoverLetterPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("userName");

    if (!userName) {
      // 🚪 Redirect to login if user is not authenticated
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <CoverLetterForm />
    </div>
  );
}
