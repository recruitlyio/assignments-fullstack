function extractCandidateInfo(userMessage, profile) {

  if (userMessage.toLowerCase().includes('javascript')) {
    profile.skills = profile.skills || [];
    if (!profile.skills.includes('JavaScript')) {
      profile.skills.push('JavaScript');
    }
  }

  if (userMessage.match(/(\d+)\s+years?/i)) {
    const match = userMessage.match(/(\d+)\s+years?/i);
    profile.yearsOfExperience = parseInt(match[1]);
  }

  if (userMessage.includes('@')) {
    const emailMatch = userMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) {
      profile.email = emailMatch[0];
    }
  }

  return profile;
}

module.exports = { extractCandidateInfo };