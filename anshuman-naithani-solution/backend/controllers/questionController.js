const { getQuestions } = require("../services/questionService"); // Import service

// Controller function to generate questions
const generateQuestions = async (req, res) => {
  const { jobTitle, experienceLevel } = req.body;

  try {
    const questions = await getQuestions(jobTitle, experienceLevel);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate questions" });
  }
};

module.exports = { generateQuestions };
