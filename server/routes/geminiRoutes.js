const express = require('express');
const router = express.Router();
const {generateResumeSummary, generateCoverletter} = require('../controllers/geminiController');

// Route to generate resume summary
router.post('/generate-resume', generateResumeSummary);

// Route to generate cover letter
router.post('/generate-coverletter', generateCoverletter);

module.exports = router