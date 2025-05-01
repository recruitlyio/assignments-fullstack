const { generateInterviewQuestions } = require("../utils/openai.util");

const generator = async (req, res) => {
  const { jobTitle, skills, experienceLevel, questionCount = 5 } = req.body;

  // Validate job title
  if (!jobTitle || typeof jobTitle !== "string" || jobTitle.trim() === "") {
    return res
      .status(400)
      .json({ error: "Job title is required and must be a non-empty string" });
  }

  // Validate skills
  if (
    !skills ||
    !Array.isArray(skills) ||
    skills.length === 0 ||
    skills.some((skill) => typeof skill !== "string" || skill.trim() === "")
  ) {
    return res
      .status(400)
      .json({ error: "Skills must be a non-empty array of strings" });
  }

  // Validate experience level
  if (
    !experienceLevel ||
    typeof experienceLevel !== "string" ||
    !["Junior", "Mid-level", "Senior"].includes(experienceLevel)
  ) {
    return res.status(400).json({
      error: "Experience level must be one of: Junior, Mid-level, Senior",
    });
  }

  // Validate question count
  const parsedQuestionCount = parseInt(questionCount);
  if (
    isNaN(parsedQuestionCount) ||
    parsedQuestionCount < 1 ||
    parsedQuestionCount > 20
  ) {
    return res
      .status(400)
      .json({ error: "Question count must be a number between 1 and 20" });
  }

  try {
    const questions = await generateInterviewQuestions(
      jobTitle,
      skills,
      experienceLevel,
      parsedQuestionCount
    );
    //TODO: Save the questions to the database or perform any other necessary actions
    res.status(200).json({ questions });
  } catch (err) {
    console.error("Error generating questions:", err);
    res
      .status(500)
      .json({ error: `Failed to generate questions,${err.message}` });
  }
};

module.exports = {
  generator,
};
