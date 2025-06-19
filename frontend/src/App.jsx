import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ResumePage from "./pages/ResumePage";
import CoverLetterPage from "./pages/CoverLetterPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/cover-letter" element={<CoverLetterPage />} />
      </Routes>
    </Router>
  );
}
