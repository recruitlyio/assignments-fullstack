const MAX_SCORE = 25;
export function calculateSkillMatchScore(candidateSkills, jobSkills) {
    const matchedSkills = candidateSkills.filter(skill => jobSkills.includes(skill));
    const ratio = matchedSkills.length / jobSkills.length;
    return Math.min(Math.round(ratio * MAX_SCORE), MAX_SCORE);
}
export function convertCandidateTextToObject(text) {
    const candidatesEvaluation = {
        candidates: []
    };
    const candidateSections = text.split(/\*\*Candidate \d+: /);
    for (let i = 1; i < candidateSections.length; i++) {
        const section = candidateSections[i];
        const name = section.split('**')[0].trim();
        const scoreMatch = section.match(/\*\*Score:\*\* (\d+)\/(\d+)/);
        const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
        const maxScore = scoreMatch ? parseInt(scoreMatch[2], 10) : 0;
        const justificationMatch = section.match(/\*\*Justification:\*\* ([\s\S]+?)(?=$|\*\*)/);
        const justification = justificationMatch ? justificationMatch[1].trim() : "";
        candidatesEvaluation.candidates.push({
            name,
            score,
            maxScore,
            justification
        });
    }
    return candidatesEvaluation;
}
