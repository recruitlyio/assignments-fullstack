// llm-service.js
const axios = require('axios');
require('dotenv').config();

// Configuration for the LLM API
const LLM_API_KEY = process.env.LLM_API_KEY;
const LLM_PROVIDER = process.env.LLM_PROVIDER || 'Groq';
const LLM_MODEL = process.env.LLM_MODEL || 'llama3-70b-8192';
const LLM_API_URL = process.env.LLM_API_URL || 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Generate questions using Groq's API
 * @param {string} jobTitle - The job title
 * @param {string} requirements - Job requirements
 * @param {string} experienceLevel - Candidate experience level (entry, mid, senior)
 * @param {number} count - Number of questions to generate
 * @returns {Promise<Array>} - Array of generated questions
 */
async function generateQuestionsWithLLM(jobTitle, requirements, experienceLevel, count) {
  try {
    console.log(`Attempting to generate ${count} questions with ${LLM_PROVIDER} API...`);
    console.log(`Using model: ${LLM_MODEL}`);
    
    if (!LLM_API_KEY) {
      throw new Error('API key is not configured. Check your .env file.');
    }
    
    // Convert count to a number (in case it's passed as a string)
    count = parseInt(count, 10);
    if (isNaN(count) || count <= 0) {
      count = 10; // Default to 10 if invalid
    }
    
    // Map experience level to a more descriptive term
    const experienceLevelMap = {
      entry: 'entry-level (0-2 years experience)',
      mid: 'mid-level (3-5 years experience)',
      senior: 'senior-level (6+ years experience)'
    };
    
    const experienceDesc = experienceLevelMap[experienceLevel] || experienceLevel;
    const difficultyLevel = experienceLevel === 'entry' ? 'Basic' : 
                          experienceLevel === 'mid' ? 'Intermediate' : 'Advanced';
    
    // More specific requirements parsing - split into array and clean
    const requirementsList = requirements
      .split(',')
      .map(req => req.trim())
      .filter(req => req.length > 0);
    
    // Create the system prompt with stronger focus on question uniqueness
    const systemPrompt = `You are an expert technical interviewer specializing in ${jobTitle} positions. 
    Your task is to create ${count} high-quality, unique technical questions tailored specifically for a ${jobTitle} with 
    these technical requirements: ${requirementsList.join(', ')}.`;

    // Create the user prompt with more targeted instructions
    const userPrompt = `
    Generate ${count} unique technical interview questions for a ${experienceDesc} ${jobTitle} position.

    TECHNOLOGIES/SKILLS TO FOCUS ON:
    ${requirementsList.join(', ')}

    QUESTION REQUIREMENTS:
    1. Each question MUST be unique and test different aspects of ${requirementsList.join(', ')}
    2. Questions should be specific to these technologies, NOT generic interview questions
    3. For Python, Django, FastAPI, and other specified technologies, create practical coding or architecture scenarios
    4. Avoid generic questions like "explain your experience with X" 
    5. Make questions highly specific and technical
    6. Focus 80% of questions on the specific technologies listed

    OUTPUT FORMAT:
    Return a JSON object with a single "questions" key containing an array of question objects:

    {
      "questions": [
        {
          "questionText": "Specific technical question about ${requirementsList[0]}...",
          "category": "Specific technology (e.g., ${requirementsList[0]})",
          "difficulty": "${difficultyLevel}",
          "evaluationCriteria": [
            "Specific evaluation point 1",
            "Specific evaluation point 2",
            "Specific evaluation point 3"
          ]
        }
      ]
    }

    IMPORTANT:
    - Return ONLY valid JSON
    - No explanations, intro text, or markdown formatting
    - Ensure questions cover ALL technologies in the requirements`;

    // Set up the request with optimized parameters for question generation
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LLM_API_KEY}`
    };
    
    const data = {
      model: LLM_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      top_p: 0.9,
      max_tokens: 4000,
      frequency_penalty: 0.7, // Increased to prevent repetitive questions
      presence_penalty: 0.7  // Increased to encourage diversity
    };

    console.log(`Making request to ${LLM_API_URL}`);
    
    // Make the API call
    const response = await axios.post(LLM_API_URL, data, { headers });

    console.log('Response status:', response.status);
    
    // Parse and process the response
    let questionsJson = parseAndValidateResponse(response, count);
    
    // Post-process questions to ensure quality and relevance
    questionsJson = enhanceQuestionQuality(questionsJson, jobTitle, experienceLevel, requirementsList);
    
    // Final deduplication and limiting to requested count
    questionsJson = deduplicateQuestions(questionsJson, count);
    
    console.log(`Successfully generated ${questionsJson.length} high-quality questions`);
    return questionsJson;
  } catch (error) {
    console.error('Error in generateQuestionsWithLLM:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error; // Rethrow to let caller handle it
  }
}

/**
 * Parses and validates the LLM response with improved error handling
 */
function parseAndValidateResponse(response, expectedCount) {
  try {
    const content = response.data.choices[0].message.content.trim();
    console.log('Raw content (first 200 chars):', content.substring(0, 200) + '...');
    
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      // Try to extract JSON from malformed responses
      const jsonMatch = content.match(/\{[\s\S]*\}/); // Match the entire JSON object
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No valid JSON found in response');
      }
    }
    
    // Handle different response formats with improved consistency
    let questions = [];
    if (Array.isArray(parsed)) {
      questions = parsed;
    } else if (parsed.questions && Array.isArray(parsed.questions)) {
      questions = parsed.questions;
    } else if (typeof parsed === 'object' && !Array.isArray(parsed) && !parsed.questions) {
      // Create questions array from object entries
      const entries = Object.entries(parsed);
      if (entries.length > 0) {
        // Check if it's indexed by numbers as keys
        const numberKeys = entries.filter(([key]) => !isNaN(parseInt(key)));
        if (numberKeys.length > 0) {
          questions = numberKeys.map(([_, value]) => value);
        } else {
          questions = [parsed]; // Treat as a single question
        }
      }
    } else {
      throw new Error('Unexpected response format');
    }
    
    // More rigorous validation of questions
    const validQuestions = questions.filter(q => {
      // Check if it has required fields
      const hasRequiredFields = q && 
                               typeof q === 'object' && 
                               q.questionText && 
                               q.category && 
                               q.difficulty && 
                               q.evaluationCriteria;
      
      // Check for specific patterns we want to avoid
      const hasGenericPhrase = q && q.questionText && (
        q.questionText.toLowerCase().includes("explain your basic experience") ||
        q.questionText.toLowerCase().includes("tell me about your experience") ||
        q.questionText.toLowerCase().includes("describe your experience")
      );
      
      return hasRequiredFields && !hasGenericPhrase && Array.isArray(q.evaluationCriteria);
    });
    
    if (validQuestions.length === 0) {
      console.error('No valid questions found in response. Raw response:', content);
      throw new Error('No valid questions found in response');
    }
    
    return validQuestions;
  } catch (error) {
    console.error('Error parsing response:', error);
    console.error('Full response data:', response.data);
    throw new Error('Failed to parse LLM response: ' + error.message);
  }
}

/**
 * Enhances question quality by improving specificity and relevance
 */
function enhanceQuestionQuality(questions, jobTitle, experienceLevel, requirements) {
  return questions.map(question => {
    // Clone to avoid mutating the original
    const enhancedQuestion = { ...question };
    
    // Fix generic questions by making them specific
    if (enhancedQuestion.questionText.toLowerCase().includes("explain your experience") || 
        enhancedQuestion.questionText.toLowerCase().includes("tell me about your")) {
      
      // Find the most relevant requirement for this category
      const relevantReq = requirements.find(req => 
        enhancedQuestion.category.toLowerCase().includes(req.toLowerCase())
      ) || requirements[0];
      
      enhancedQuestion.questionText = `Write a function in ${relevantReq} that solves the following problem: [specific problem related to ${enhancedQuestion.category}]`;
    }
    
    // Ensure the category is specific and matches one of the requirements
    const categoryMatches = requirements.some(req => 
      enhancedQuestion.category.toLowerCase().includes(req.toLowerCase())
    );
    
    if (!categoryMatches && requirements.length > 0) {
      enhancedQuestion.category = requirements[0];
    }
    
    // Ensure evaluation criteria are specific and meaningful
    if (enhancedQuestion.evaluationCriteria.some(c => 
        c.includes("fundamental understanding") || 
        c.includes("communicates technical"))) {
      enhancedQuestion.evaluationCriteria = [
        "Correctness of implementation",
        "Code efficiency and optimization",
        "Error handling and edge cases",
        "Understanding of relevant frameworks"
      ];
    }
    
    return enhancedQuestion;
  });
}

/**
 * Improved deduplication with better categorization
 */
function deduplicateQuestions(questions, expectedCount) {
  // First pass - exact duplicates by normalized text
  const seenQuestions = new Set();
  const uniqueQuestions = questions.filter(question => {
    const normalizedText = question.questionText
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!seenQuestions.has(normalizedText)) {
      seenQuestions.add(normalizedText);
      return true;
    }
    return false;
  });
  
  // Track categories to ensure diversity
  const categoryCount = {};
  uniqueQuestions.forEach(q => {
    const category = q.category.toLowerCase();
    categoryCount[category] = (categoryCount[category] || 0) + 1;
  });
  
  // Sort by category diversity (prefer questions from underrepresented categories)
  uniqueQuestions.sort((a, b) => {
    const catA = a.category.toLowerCase();
    const catB = b.category.toLowerCase();
    return (categoryCount[catA] || 0) - (categoryCount[catB] || 0);
  });
  
  // Keep only the requested number of questions
  return uniqueQuestions.slice(0, expectedCount);
}

module.exports = { generateQuestionsWithLLM };