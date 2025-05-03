const { GoogleGenerativeAI } = require("@google/generative-ai");

const analyzeResume = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({ error: "Resume and Job Description are required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt 1: Resume Analysis
    const analysisPrompt = `
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

    const analysisResult = await model.generateContent(analysisPrompt);
    const analysisText = analysisResult.response.text();
    const analysisJson = JSON.parse(analysisText.slice(analysisText.indexOf("{"), analysisText.lastIndexOf("}") + 1));

    const formattedAnalysis = Object.entries(analysisJson).map(([title, data]) => ({
      title,
      score: data.score,
      description: data.description
    }));

    // Prompt 2: Extract Structured Resume Data
    const extractPrompt = `
You are an expert resume parser.

Extract structured data from the following resume in JSON format:
{
  "name": "...",
  "title": "...",
  "skills": ["...", "..."],
  "experiences": [
    {
      "duration": "...",
      "title": "...",
      "description": "..."
    }
  ],
  "projects": [
    {
      "title": "...",
      "description": "...",
      "technologies": ["...", "..."]
    }
  ],
  "education": [
    {
      "institution": "...",
      "degree": "...",
      "year": "..."
    }
  ],
  "achievement": ["..."]
}

Resume:
${resume}
`;

    const extractResult = await model.generateContent(extractPrompt);
    const extractText = extractResult.response.text();
    const extractJson = JSON.parse(extractText.slice(extractText.indexOf("{"), extractText.lastIndexOf("}") + 1));

    // Final response
    res.status(200).json({
      data: extractJson,
      analysis: formattedAnalysis
    });

  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Failed to analyze resume" });
  }
};

module.exports = analyzeResume;
