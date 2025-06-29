const { generateResponse } = require("../utils/gemini");

const generateFullResume = async (req, res) => {
  const { name, skills, experience } = req.body;

  const prompt = `
You are a professional resume writer.

Using the following information:

- Name: ${name}
- Skills: ${skills.join(", ")}
- Experience: ${experience}

Write a complete, professional resume in plain text format with the following sections:

---

1. **Full Name** — at the top, bold
2. **Professional Summary** — a 3–4 line summary introducing the candidate
3. **Skills** — comma-separated list or bullet points
4. **Experience** — well-written and formatted (bulleted if needed)
5. **Projects** — include 2–3 realistic project titles and brief descriptions based on skills/experience
6. **Education** — include a plausible degree, university, and graduation year
7. **Contact Information** — use placeholder but realistic details:
   - Email: example@email.com
   - Phone: (123) 456-7890
   - LinkedIn: linkedin.com/in/username
   - GitHub: github.com/username

---

✅ Formatting Rules:
- Use clear spacing and headings
- Keep everything in clean, plain text (no markdown or HTML)
- Fill in missing details professionally and naturally
- Do **not** include any "Generated by AI" notes

Return **only** the full resume text.
`;

  try {
    const resume = await generateResponse(prompt);
    res.status(200).json({ resume });
  } catch (error) {
    console.error("❌ Error generating resume:", error);
    res.status(500).json({ error: "Failed to generate full resume" });
  }
};


// cover letter gemerator
const generateCoverLetter = async (req, res) => {
  const { name, position, company, skills, experience } = req.body;

  const prompt = `
You are a professional cover letter writer.

Write a personalized and professional cover letter using the following candidate and job details:

- Candidate Name: ${name}
- Applying For: ${position}
- Company: ${company}
- Relevant Skills: ${skills.join(", ")}
- Experience Summary: ${experience}

The cover letter should:

1. Be addressed to the hiring manager of ${company}
2. Start with a compelling introduction
3. Highlight how the candidate's skills and experience match the ${position} role
4. Show enthusiasm for the company and role
5. End with a professional closing and call to action

✅ Formatting Guidelines:
- Use plain text only
- Keep the tone formal yet engaging
- Do **not** include any AI references
- Limit to around 3–4 short paragraphs (ideal length for modern applications)

Return **only** the final cover letter text.
`;

  try {
    const letter = await generateResponse(prompt);
    res.status(200).json({ letter });
  } catch (error) {
    console.error("❌ Error generating cover letter:", error);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
};

module.exports = {
  generateFullResume,
  generateCoverLetter,
};
