import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResumeForm from "../components/ResumeForm";

export default function ResumePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("userName");

    if (!userName) {
      // 🚪 Redirect to login if no user found in localStorage
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ResumeForm />
    </div>
  );
}
