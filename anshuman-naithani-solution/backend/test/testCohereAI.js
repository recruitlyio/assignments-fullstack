const { CohereClient } = require("cohere-ai");
require("dotenv").config({ path: "../.env" });

const cohereApiKey = process.env.COHERE_API_KEY;
// Initialize Cohere client
const cohere = new CohereClient({
  token: cohereApiKey,
});

(async () => {
  const experienceLevel = "Medium";
  const jobTitle = "Java";

  const prompt = `Generate technical interview questions for a ${experienceLevel} ${jobTitle}.
For each question, include a short Evaluation Criteria explaining what a good answer should contain.

STRICT FORMAT INSTRUCTIONS:
- DO NOT use numbering (No "1.", "2.", "3.", etc.).
- DO NOT add any introductory text.
- Directly start with "Question:" followed by the question text.
- On the next line, write "Evaluation:" followed by the evaluation text.
- After one Question and Evaluation, directly continue the next Question.
- No blank lines between entries.
- No bullet points.
- No extra formatting.
ONLY alternate between "Question:" and "Evaluation:" lines.
`;

  try {
    const response = await cohere.generate({
      model: "command",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 600, // Much bigger because you want full answers
    });

    console.log("Generated Text:\n", response.generations[0].text.trim());
  } catch (error) {
    console.error("Error:", error);
  }
})();
