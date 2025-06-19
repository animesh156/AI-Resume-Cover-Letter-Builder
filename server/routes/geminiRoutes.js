const express = require("express");
const router = express.Router();
const {
  generateFullResume,
  generateCoverLetter,
} = require("../controllers/geminiController");

const rateLimit = require("../middlewares/rateLimiter");

// Route to generate resume summary
router.post("/generate-resume", rateLimit, generateFullResume);

// Route to generate cover letter
router.post("/generate-coverletter", rateLimit, generateCoverLetter);

module.exports = router;
