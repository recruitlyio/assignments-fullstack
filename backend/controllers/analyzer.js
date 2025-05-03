// analyzeResume.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const analyzeResume = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log(process.env.GEMINI_API_KEY);

  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({ error: "Resume and Job Description are required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a resume analysis expert.

Compare the following resume and job description and analyze the resume based on the following metrics. For each, give a score out of 100 and a short explanation.

Metrics:
1. Grammar and Language
2. Skills Match
3. Experience Relevance
4. Project Relevance
5. Job Experience Alignment
6. Problem-Solving and Critical Thinking
7. Overall Presentation

Respond in the following JSON format:
{
  "Grammar and Language": { "score": X, "description": "..." },
  "Skills Match": { "score": X, "description": "..." },
  "Experience Relevance": { "score": X, "description": "..." },
  "Project Relevance": { "score": X, "description": "..." },
  "Job Experience Alignment": { "score": X, "description": "..." },
  "Problem-Solving and Critical Thinking": { "score": X, "description": "..." },
  "Overall Presentation": { "score": X, "description": "..." }
}

Resume:
${resume}

Job Description:
${jobDescription}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;
    const structuredResult = JSON.parse(responseText.slice(jsonStart, jsonEnd));

    // Convert object to array of { title, score, description }
    const formattedResult = Object.entries(structuredResult).map(([title, data]) => ({
      title,
      score: data.score,
      description: data.description
    }));

    console.log(formattedResult);
    res.status(200).json(formattedResult);

  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
};

module.exports = analyzeResume;
