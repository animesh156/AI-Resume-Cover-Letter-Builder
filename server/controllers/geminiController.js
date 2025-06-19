const {generateResponse} = require('../utils/gemini');

const generateResumeSummary = async (req,res) => {
    const {name, skills, experience} = req.body;
    const prompt = `Write a professional resume summary for a frontend developer named ${name}, skilled in ${skills.join(", ")}, with experience: ${experience}`;

    try {
        const summary = await generateResponse(prompt)
        res.status(200).json({summary});
    } catch (error) {
        console.error('Error generating resume summary:', error);
        res.status(500).json({error: 'Failed to generate resume summary'});
    }
}


const generateCoverletter = async (req,res) => {
    const {resume, jobDescription} = req.body;
    const prompt = `Write a cover letter for the following resume: ${resume} and job description: ${jobDescription}`;

    try {
        const letter = await generateCoverletter(prompt)
        res.status(200).json({letter});
    } catch (error) {
        console.error('Error generating cover letter:', error);
        res.status(500).json({error: 'Failed to generate cover letter'});
    }
}


module.exports = {
    generateResumeSummary,
    generateCoverletter
}