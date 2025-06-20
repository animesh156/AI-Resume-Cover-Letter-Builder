// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get(`https://resume-builder-backend-7odt.onrender.com/auth/check`, {
        withCredentials: true,
      })
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-10">Checking auth...</div>;
  return authenticated ? children : <Navigate to="/login" />;
}
