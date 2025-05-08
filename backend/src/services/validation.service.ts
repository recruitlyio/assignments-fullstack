// src/services/validation.service.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  RawParsedResume,
  ValidatedResume,
  WorkExperience,
  Education,
  Skill,
  EmbeddingVector 
} from '../types/resume.types';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// --- Configuration ---

// **** CUSTOMIZE THESE LISTS WITH YOUR DESIRED STANDARD TERMS ****
const CANONICAL_SKILLS: string[] = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'HTML', 'CSS', 'SQL',
    'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django', 'Flask', 'Spring Boot',
    '.NET', 'Ruby on Rails', 'PHP', 'Laravel',
    'AWS', 'Azure', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins',
    'Git', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch',
    'REST API', 'GraphQL', 'Microservices', 'Agile', 'Scrum', 'Jira',
    'Machine Learning', 'Data Analysis', 'Pandas', 'NumPy', 'TensorFlow', 'PyTorch'
    // Add many more as needed!
];

const CANONICAL_DEGREES: string[] = [
    'Bachelor of Science', 'Bachelor of Arts', 'Bachelor of Engineering', 'Bachelor Degree',
    'Master of Science', 'Master of Arts', 'Master of Engineering', 'Master of Business Administration', 'Master Degree',
    'Associate Degree', 'PhD', 'Doctor of Philosophy', 'High School Diploma', 'GED'
    // Add more standard degree names
];

// Choose embedding model (e.g., "text-embedding-004", "embedding-001")
const EMBEDDING_MODEL_NAME = "text-embedding-004";

// Similarity threshold for matching (TUNE THIS AFTER TESTING!)
const DEFAULT_SIMILARITY_THRESHOLD = 0.8;

// --- Embedding Cache ---
// These maps will store the pre-calculated embeddings for canonical terms
const canonicalSkillEmbeddings = new Map<string, EmbeddingVector>();
const canonicalDegreeEmbeddings = new Map<string, EmbeddingVector>();

// --- Initialization Function (Run Once on Server Start) ---

/**
 * Fetches embeddings for canonical terms and caches them.
 * MUST be called successfully before the server starts accepting parsing requests.
 */
export async function initializeEmbeddings() {
    console.log('[Embeddings]: Initializing canonical embeddings...');
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("[Embeddings]: FATAL - GEMINI_API_KEY environment variable is not set.");
        throw new Error('GEMINI_API_KEY not set'); // Prevent startup without key
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL_NAME });

        // --- Embed Skills ---
        if (CANONICAL_SKILLS.length > 0) {
            console.log(`[Embeddings]: Generating ${CANONICAL_SKILLS.length} skill embeddings...`);
            // Batch embedding requests for efficiency
            const skillRequests = CANONICAL_SKILLS.map(skill => ({
                content: {
                    parts: [{ text: skill }],
                    role: "user" // <--- ADD THIS LINE
                }
               
            }));
            const skillResult = await model.batchEmbedContents({ requests: skillRequests });

            skillResult.embeddings.forEach((embedding, index) => {
                if (embedding.values) {
                    canonicalSkillEmbeddings.set(CANONICAL_SKILLS[index], embedding.values);
                } else {
                     console.warn(`[Embeddings]: Failed to get embedding for skill: ${CANONICAL_SKILLS[index]}`);
                }
            });
             console.log(`[Embeddings]: Cached ${canonicalSkillEmbeddings.size} skill embeddings.`);
        } else {
             console.warn("[Embeddings]: No canonical skills defined to embed.");
        }


        // --- Embed Degrees ---
        if (CANONICAL_DEGREES.length > 0) {
             console.log(`[Embeddings]: Generating ${CANONICAL_DEGREES.length} degree embeddings...`);
             const degreeRequests = CANONICAL_DEGREES.map(degree => ({
                content: {
                    parts: [{ text: degree }],
                    role: "user" 
                }
               
            }));
             const degreeResult = await model.batchEmbedContents({ requests: degreeRequests });

             degreeResult.embeddings.forEach((embedding, index) => {
                 if (embedding.values) {
                     canonicalDegreeEmbeddings.set(CANONICAL_DEGREES[index], embedding.values);
                 } else {
                      console.warn(`[Embeddings]: Failed to get embedding for degree: ${CANONICAL_DEGREES[index]}`);
                 }
             });
              console.log(`[Embeddings]: Cached ${canonicalDegreeEmbeddings.size} degree embeddings.`);
        } else {
             console.warn("[Embeddings]: No canonical degrees defined to embed.");
        }


        if (canonicalSkillEmbeddings.size === 0 && canonicalDegreeEmbeddings.size === 0) {
             console.warn("[Embeddings]: No embeddings were successfully initialized.");
             // Depending on requirements, you might throw an error here
        } else {
             console.log("[Embeddings]: Initialization complete.");
        }


    } catch (error: any) {
        console.error("[Embeddings]: FATAL - Failed to initialize canonical embeddings:", error.message || error);
        // Rethrow or handle appropriately to potentially stop server startup
        throw error;
    }
}

// --- Cosine Similarity Helpers ---

function dotProduct(vecA: EmbeddingVector, vecB: EmbeddingVector): number {
    if (vecA.length !== vecB.length) {
        console.warn(`[Similarity]: Vectors have different lengths (${vecA.length} vs ${vecB.length}). Cannot calculate dot product.`);
        return 0; // Or throw an error
    }
    return vecA.reduce((sum, val, i) => sum + (val * vecB[i]), 0);
}

function magnitude(vec: EmbeddingVector): number {
    // Using Math.hypot is generally more numerically stable than sqrt(sum of squares)
    // It correctly handles potential overflows/underflows for large/small numbers.
    return Math.hypot(...vec);
}

function cosineSimilarity(vecA: EmbeddingVector, vecB: EmbeddingVector): number {
    const magA = magnitude(vecA);
    const magB = magnitude(vecB);
    if (magA === 0 || magB === 0) {
        // console.warn('[Similarity]: Cannot calculate cosine similarity if one vector has zero magnitude.');
        return 0; // Handle zero vectors - they have no direction
    }
    const dot = dotProduct(vecA, vecB);
    // Clamp the result between -1 and 1 due to potential floating point inaccuracies
    return Math.max(-1, Math.min(1, dot / (magA * magB)));
}

// --- Find Best Match Function ---

/**
 * Finds the best canonical match for an input text using embedding similarity.
 * @param inputText The text extracted by the LLM (e.g., a skill name or degree).
 * @param canonicalEmbeddings A Map where keys are canonical names and values are their embeddings.
 * @param similarityThreshold The minimum cosine similarity score to consider a match.
 * @returns The best matching canonical name, or null if no match meets the threshold or an error occurs.
 */
async function findBestMatch(
    inputText: string,
    canonicalEmbeddings: Map<string, EmbeddingVector>,
    similarityThreshold: number = DEFAULT_SIMILARITY_THRESHOLD
): Promise<string | null> {
    // Basic input check
    if (!inputText || typeof inputText !== 'string' || inputText.trim().length === 0) {
        return null;
    }
    // Avoid trying to match very short strings which might be meaningless
    if (inputText.trim().length < 2) {
         return null;
    }
    // Check if cache is ready
    if (canonicalEmbeddings.size === 0) {
         console.warn("[Similarity]: Canonical embeddings cache is empty. Cannot find matches.");
         return null;
    }

    const trimmedInput = inputText.trim(); // Use trimmed version for embedding

    try {
        // Get embedding for the input text
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error('GEMINI_API_KEY not set'); // Should be caught earlier, but good practice
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL_NAME });

        const result = await model.embedContent(trimmedInput);
        const inputEmbedding = result.embedding?.values;

        if (!inputEmbedding) {
             console.warn(`[Similarity]: Failed to get embedding for input text: "${trimmedInput}"`);
             return null;
        }

        let bestMatch: string | null = null;
        let highestSimilarity = -Infinity; // Start below the possible range [-1, 1]

        // Compare with all canonical embeddings
        for (const [canonicalName, canonicalEmbedding] of canonicalEmbeddings.entries()) {
            const similarity = cosineSimilarity(inputEmbedding, canonicalEmbedding);

            if (similarity > highestSimilarity) {
                highestSimilarity = similarity;
                bestMatch = canonicalName;
            }
        }

        // Return match only if above threshold
        if (bestMatch && highestSimilarity >= similarityThreshold) {
             console.log(`[Similarity]: Matched "${trimmedInput}" to "${bestMatch}" with score ${highestSimilarity.toFixed(3)}`);
             return bestMatch;
        } else {
            // Log if no match found or score too low
            // console.log(`[Similarity]: No confident match for "${trimmedInput}". Best score: ${highestSimilarity.toFixed(3)} with ${bestMatch}`);
            return null; // No match above threshold
        }

    } catch (error: any) {
        console.error(`[Similarity]: Error finding best match for "${trimmedInput}":`, error.message || error);
        return null; // Return null on error to avoid breaking the flow
    }
}

// --- Main Validation and Standardization Function ---

/**
 * Validates and standardizes the raw parsed resume data using embedding similarity.
 * @param rawData - The RawParsedResume object parsed from the LLM response.
 * @returns A Promise resolving to a ValidatedResume object.
 */
export const validateAndStandardizeResume = async (rawData: RawParsedResume): Promise<ValidatedResume> => {
    const validationNotes: string[] = [];
    // Start with a deep copy or initialize carefully if modifying nested objects
    const validatedData: ValidatedResume = {
        skills: [],
        workExperience: [],
        education: [],
        validationNotes: validationNotes, // Reference the array
    };

    console.log("[Validation]: Starting validation and standardization...");

    // --- Standardization using Embeddings ---

    // 1. Standardize Skills
    if (rawData.skills && Array.isArray(rawData.skills)) {
        const standardizedSkills: Skill[] = [];
        for (const skill of rawData.skills) {
            if (skill.name) {
                const standardizedName = await findBestMatch(skill.name, canonicalSkillEmbeddings, DEFAULT_SIMILARITY_THRESHOLD);
                const finalName = standardizedName || skill.name; // Use original if no match
                standardizedSkills.push({
                    ...skill,
                    name: finalName
                });
                if (standardizedName && standardizedName.toLowerCase() !== skill.name.toLowerCase()) {
                    validationNotes.push(`Standardized skill: '${skill.name}' -> '${standardizedName}' (Similarity based)`);
                }
            } else {
                standardizedSkills.push(skill); // Keep skill if name was missing
            }
        }
        validatedData.skills = standardizedSkills;
    } else if (rawData.skills) {
        validationNotes.push("Warning: Skills data received from AI was not in the expected array format.");
    }

    // 2. Standardize Education Degrees
    if (rawData.education && Array.isArray(rawData.education)) {
        const standardizedEducation: Education[] = [];
        for (const edu of rawData.education) {
            let standardizedDegree = edu.degree; // Default to original
            let noteAdded = false;

            if (edu.degree) {
                const matchedDegree = await findBestMatch(edu.degree, canonicalDegreeEmbeddings, DEFAULT_SIMILARITY_THRESHOLD);
                if (matchedDegree) {
                    standardizedDegree = matchedDegree;
                    if (matchedDegree.toLowerCase() !== edu.degree.toLowerCase()) {
                         validationNotes.push(`Standardized degree: '${edu.degree}' -> '${standardizedDegree}' (Similarity based)`);
                         noteAdded = true;
                    }
                }
            } else {
                 validationNotes.push(`Education entry (Institution: ${edu.institution || 'N/A'}) is missing a degree name.`);
                 standardizedDegree = "Degree Not Specified"; // Placeholder
            }

             // Check for institution (can be done after potential standardization)
             if (!edu.institution) {
                const degreeNameForNote = standardizedDegree === "Degree Not Specified" ? "(Missing Degree)" : `'${standardizedDegree}'`;
                // Avoid duplicate notes if degree was already flagged as missing
                if (standardizedDegree !== "Degree Not Specified") {
                    validationNotes.push(`Education entry ${degreeNameForNote} is missing an institution name.`);
                }
             }


            standardizedEducation.push({ ...edu, degree: standardizedDegree });
        }
        validatedData.education = standardizedEducation;
    } else if (rawData.education) {
        validationNotes.push("Warning: Education data received from AI was not in the expected array format.");
    }


    // --- Other Validation Rules (Synchronous) ---

    // 3. Validate Work Experience Dates & Check required fields
    // (Keep this logic largely the same as the dictionary version)
    if (rawData.workExperience && Array.isArray(rawData.workExperience)) {
        validatedData.workExperience = rawData.workExperience.map((exp, index) => {
             let validatedExp = { ...exp }; // Copy

             // Check required fields
             if (!exp.role) {
                 validationNotes.push(`Work experience entry #${index + 1} (Company: ${exp.company || 'N/A'}) is missing a role.`);
             }
             if (!exp.company) {
                 validationNotes.push(`Work experience entry #${index + 1} (Role: ${exp.role || 'N/A'}) is missing a company name.`);
             }

             // Basic Date Validation
             if (exp.startDate && exp.endDate && exp.endDate.toLowerCase().trim() !== 'present') {
                 // Basic string comparison for YYYY-MM or YYYY format
                 // A more robust solution would parse dates using a library
                 const start = exp.startDate.substring(0, 7).replace('-', '');
                 const end = exp.endDate.substring(0, 7).replace('-', '');
                 if (start.length >= 4 && end.length >= 4 && end < start) { // Compare numerically if possible
                     validationNotes.push(`Warning: Work experience '${exp.role || 'N/A'}' at '${exp.company || 'N/A'}' might have end date (${exp.endDate}) before start date (${exp.startDate}).`);
                 }
             }
             return validatedExp;
        });
         // Optional: Sort work experience by date (requires robust date parsing)
    } else if (rawData.workExperience) {
        validationNotes.push("Warning: Work experience data received from AI was not in the expected array format.");
    }


    // --- Finalization ---
    if (validationNotes.length === 0) {
        validationNotes.push("Resume data passed initial validation checks.");
    }

    console.log(`[Validation]: Validation complete. ${validationNotes.length} notes generated.`);
    // Ensure the notes array in the returned object is the one we populated
    validatedData.validationNotes = validationNotes;

    return validatedData;
};












// *********** First approach with hardoced simple Map **************


// import { RawParsedResume, ValidatedResume, WorkExperience } from '../types/resume.types';

// // Simple dictionaries for standardization - expand as needed
// const SKILL_STANDARDIZATION_MAP: Record<string, string> = {
//   'js': 'JavaScript',
//   'javascript': 'JavaScript',
//   'reactjs': 'React',
//   'react.js': 'React',
//   'node': 'Node.js',
//   'nodejs': 'Node.js',
//   'py': 'Python',
//   'python': 'Python',
//   'aws': 'AWS',
//   'amazon web services': 'AWS',
//   'sql': 'SQL',
//   'postgres': 'PostgreSQL',
//   'postgresql': 'PostgreSQL',
//   'typescript': 'TypeScript',
//   'ts': 'TypeScript',
//   // Add more common variations
// };

// const DEGREE_STANDARDIZATION_MAP: Record<string, string> = {
//   'bsc': 'Bachelor of Science',
//   'b.sc.': 'Bachelor of Science',
//   'bs': 'Bachelor of Science',
//   'bachelor': 'Bachelor Degree', // Generic fallback if no specific field
//   'msc': 'Master of Science',
//   'm.sc.': 'Master of Science',
//   'ms': 'Master of Science',
//   'master': 'Master Degree',
//   'phd': 'PhD',
//   'ph.d.': 'PhD',
//   'associate': 'Associate Degree',
//   'associates': 'Associate Degree',
//   // Add more common variations
// };

// /**
//  * Validates and standardizes the raw parsed resume data from the LLM.
//  * @param rawData - The RawParsedResume object parsed from the LLM response.
//  * @returns A ValidatedResume object with applied standardizations and validation notes.
//  */
// export const validateAndStandardizeResume = (rawData: RawParsedResume): ValidatedResume => {
//   const validationNotes: string[] = [];
//   const validatedData: ValidatedResume = {
//     ...rawData, // Spread the original data
//     skills: [], // Initialize arrays to ensure they exist
//     workExperience: [],
//     education: [],
//     validationNotes: validationNotes, // Start with an empty notes array
//   };

//   // --- Validation/Standardization Logic ---

//   // 1. Standardize Skills
//   if (rawData.skills && Array.isArray(rawData.skills)) {
//     validatedData.skills = rawData.skills.map(skill => {
//       const lowerCaseName = skill.name?.toLowerCase().trim();
//       const standardizedName = SKILL_STANDARDIZATION_MAP[lowerCaseName] || skill.name; // Use map or original
//       if (standardizedName !== skill.name) {
//           // Optional: Add note if name was standardized
//           // validationNotes.push(`Standardized skill: '${skill.name}' to '${standardizedName}'`);
//       }
//       return { ...skill, name: standardizedName };
//     }).filter(skill => skill.name); // Filter out skills with no name after processing
//   } else if (rawData.skills) {
//       validationNotes.push("Warning: Skills data received from AI was not in the expected array format.");
//   }

//   // 2. Standardize Education Degrees & Check for required fields
//   if (rawData.education && Array.isArray(rawData.education)) {
//     validatedData.education = rawData.education.map((edu, index) => {
//       const originalDegree = edu.degree;
//       let standardizedDegree = originalDegree; // Default to original

//        // Attempt standardization
//        if (originalDegree) {
//            const lowerCaseDegree = originalDegree.toLowerCase().trim();
//            // More robust check: iterate keys or use regex for partial matches if needed
//            for (const key in DEGREE_STANDARDIZATION_MAP) {
//                if (lowerCaseDegree.includes(key)) { // Basic includes check
//                    standardizedDegree = DEGREE_STANDARDIZATION_MAP[key];
//                    break; // Take the first match
//                }
//            }
//        } else {
//            validationNotes.push(`Education entry #${index + 1} is missing a degree name.`);
//            standardizedDegree = "Degree Not Specified"; // Provide a placeholder
//        }


//       // Check for institution
//       if (!edu.institution) {
//         validationNotes.push(`Education entry '${standardizedDegree}' (index ${index + 1}) is missing an institution name.`);
//       }

//       return { ...edu, degree: standardizedDegree };
//     });
//   } else if (rawData.education) {
//        validationNotes.push("Warning: Education data received from AI was not in the expected array format.");
//   }

//   // 3. Validate Work Experience Dates & Check required fields
//   if (rawData.workExperience && Array.isArray(rawData.workExperience)) {
//     validatedData.workExperience = rawData.workExperience.map((exp, index) => {
//       let validatedExp = { ...exp }; // Copy the experience

//       // Check required fields
//       if (!exp.role) {
//         validationNotes.push(`Work experience entry #${index + 1} (Company: ${exp.company || 'N/A'}) is missing a role.`);
//       }
//       if (!exp.company) {
//         validationNotes.push(`Work experience entry #${index + 1} (Role: ${exp.role || 'N/A'}) is missing a company name.`);
//       }

//       // Basic Date Validation (if both dates exist and are not 'Present')
//       if (exp.startDate && exp.endDate && exp.endDate.toLowerCase() !== 'present') {
//         // Simple check: Does endDate look like it's before startDate?
//         // This is very basic. Robust date parsing/comparison (e.g., using date-fns or dayjs)
//         // would be much better but adds dependencies and complexity.
//         // Example: Assumes YYYY-MM or YYYY format for simplicity.
//         const start = exp.startDate.substring(0, 7); // Get YYYY-MM part
//         const end = exp.endDate.substring(0, 7);

//         if (start > end) {
//           validationNotes.push(`Warning: Work experience '${exp.role || 'N/A'}' at '${exp.company || 'N/A'}' might have end date (${exp.endDate}) before start date (${exp.startDate}).`);
//         }
//       }
//        return validatedExp;
//     });
//     // Optional: Sort work experience by date (more complex date parsing needed)
//     // validatedData.workExperience.sort((a, b) => /* date comparison logic */);

//   } else if (rawData.workExperience) {
//       validationNotes.push("Warning: Work experience data received from AI was not in the expected array format.");
//   }


//   // --- End Validation ---

//   if (validationNotes.length === 0) {
//     validationNotes.push("Resume data passed initial validation checks.");
//   }

//   console.log(`Validation complete. ${validatedData.validationNotes.length} notes generated.`);
//   return validatedData;
// };