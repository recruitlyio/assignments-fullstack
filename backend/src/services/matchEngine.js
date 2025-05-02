const { extractSkillsFromResume } = require('./resumeParser');
const { extractSkillsFromJob } = require('./jobParser');
const { getEmbedding ,getFitExplanation } = require('./llmUtils');
const cosineSimilarity = require('compute-cosine-similarity');

async function matchCandidates(jobDescription, candidates) {
  // Extract skills and get embedding for the job
  const jobSkills = extractSkillsFromJob(jobDescription);
  const jobSkillText = jobSkills.join(', ');
  const jobEmbedding = await getEmbedding(jobSkillText);

  const results = [];

  for (const candidate of candidates) {
    const resumeSkills = extractSkillsFromResume(candidate.resumeText);
    const resumeSkillText = resumeSkills.join(', ');
    const resumeEmbedding = await getEmbedding(resumeSkillText);

    // Ensure both embeddings are valid arrays
    if (!Array.isArray(jobEmbedding) || !Array.isArray(resumeEmbedding)) {
      throw new Error("Embeddings must be arrays of numbers.");
    }

    const skillMatchScore = cosineSimilarity(jobEmbedding, resumeEmbedding);
    const experienceScore = Math.min(candidate.experienceYears / 5, 1); // Scaled to max 1
    const overallScore = (skillMatchScore * 0.7 + experienceScore * 0.3) * 100;

    const explanation = await getFitExplanation(jobDescription, candidate.resumeText);

    results.push({
      candidate: candidate.name,
      score: Math.round(overallScore),
      skill_match: Math.round(skillMatchScore * 100),
      experience_score: Math.round(experienceScore * 100),
      explanation,
    });
  }

  return results;
}

module.exports = { matchCandidates };
