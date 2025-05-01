const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateInterviewQuestions(
  jobTitle,
  skills,
  experienceLevel,
  questionCount = 5
) {
  // Validate job title and skills before sending to OpenAI

  // Create a validation prompt to check inputs
  const validationPrompt = `
I need to validate these inputs for an interview question generator:
- Job Title: "${jobTitle}"
- Skills: ${skills.join(", ")}

Please analyze if these inputs appear to be valid job titles and skills in the tech industry.
If they are valid, respond with "VALID".
If they contain gibberish, random characters, or inappropriate content, respond with "INVALID: [reason]".
    `.trim();

  const validationResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: validationPrompt }],
    temperature: 0.3,
  });

  const validationResult = validationResponse.choices[0].message.content;

  if (validationResult.startsWith("INVALID")) {
    // Extract only the reason part by removing "INVALID: " prefix
    const errorMessage = validationResult.replace("INVALID: ", "");
    throw new Error(errorMessage);
  }

  // Proceed with generating questions if validation passes
  const prompt = `
Generate ${questionCount} technical interview questions for the role of ${jobTitle}.
Candidate has ${experienceLevel} experience.
Required skills: ${skills.join(", ")}.

For each question, include a short evaluation criteria.
Return in the following JSON format:
[
  {
    "text": "...",
    "evaluationCriteria": "..."
  },
  ...
]
  `.trim();

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const response = completion.choices[0].message.content;

  try {
    return JSON.parse(response);
  } catch (err) {
    console.error("Failed to parse JSON from OpenAI:", response);
    throw new Error("Invalid response format from OpenAI.");
  }
}

module.exports = { generateInterviewQuestions };
