import runPromptOnAi from "../service/runPromptOnAi.js";

const generateQuestions = async (req, res) => {
    const { jobDescription, experienceLevel } = req.body;
  
    const prompt = `I need to create technical interview questions for a ${experienceLevel} level position. 

Here's the job description:
"""
${jobDescription}
"""

Let's have a thoughtful conversation about this role. First, analyze this job description and tell me:
1. What are the key technical skills and knowledge areas for this role?
2. What would be reasonable expectations for someone at the ${experienceLevel} level in this field?
3. What types of problems would they likely face in this role?

Based on your analysis, please generate 3 technical interview questions that would effectively assess a ${experienceLevel} level candidate for this position. The questions should authentically evaluate the candidate's readiness for this specific role.

For each question:
- Make it appropriately challenging for the ${experienceLevel} level (not too basic, not too advanced)
- Ensure it relates directly to the actual work they would do in this role
- Design it to reveal both their knowledge and problem-solving approach

Return your final answer in JSON format with these fields for each question:
- Question: A clear, well-framed question or scenario
- Skill Area: What specific skills or knowledge this assesses
- Difficulty: Easy/Medium/Hard relative to the ${experienceLevel} experience level
- Why This Matters: How this question relates to the actual job responsibilities
- Evaluation Criteria: How to assess different quality levels in responses (basic understanding vs. excellent answer)
- Follow-up Questions: 2-3 questions to probe deeper based on their initial answer

The format should be as follows:
{
  "questions": [
    {
      "question": "...",
      "skillArea": "...",
      "difficulty": "...",
      "evaluationCriteria": {
        "basic": "...",
        "good": "...",
        "excellent": "...",
        "thingsToLookFor": "..."
      }
    },
    ...
  ]
}`;
  
    const response = await runPromptOnAi.generateQuestions(prompt);

    return res.status(response.status).json(response.data);
};

export default {
    generateQuestions
};