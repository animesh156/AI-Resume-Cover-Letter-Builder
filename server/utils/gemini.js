const {googleGenerativeAI} = require('@google/generative-ai');

const genAI = new googleGenerativeAI(process.env.GEMINI_API_KEY);

const genrateResponse = async (prompt) => {
    try {
        const response = await genAI.generateContent({
        model: 'gemini-1.5-pro',
        prompt: prompt,
        maxOutputTokens: 1024,
        temperature: 0.7,
        });
        return response.candidates[0].content;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}

module.exports = {
    genrateResponse
}