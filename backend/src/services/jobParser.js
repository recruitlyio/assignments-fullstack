function extractSkillsFromJob(text) {
    const skills = [];
    const skillKeywords = ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Docker', 'AWS', 'Next.js'];
  
    for (const skill of skillKeywords) {
      if (text.toLowerCase().includes(skill.toLowerCase())) {
        skills.push(skill);
      }
    }
    return skills;
  }
  
  module.exports = { extractSkillsFromJob };
  