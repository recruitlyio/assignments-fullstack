import asyncHandler from "express-async-handler";
import { MatcherFormSchema } from "../helper/zod.js";
import { extractSkills, generatePotentialAssessment, generateSkillAssessment, generateWhyHeIsBestCandidate } from "../service/candidate.service.js";
import { normalizedCandidates } from "../server.js";
import { calculateSkillMatchScore } from "../helper/score.js";
export const getCandidatesHandler = asyncHandler(async (req, res) => {
    const validatedFields = MatcherFormSchema.safeParse(req.body);
    if (!validatedFields.success) {
        res
            .status(400)
            .json({
            error: "Invalid fields",
            details: validatedFields.error.flatten()
        });
        return;
    }
    const { role, description } = validatedFields.data;
    const jobSkills = await extractSkills(description);
    if (!jobSkills) {
        res.status(400).json({ error: "Missing job skills" });
        return;
    }
    const skillScoredCandidates = normalizedCandidates.map((candidate) => {
        return {
            candidateId: candidate.id,
            skillMatchScore: calculateSkillMatchScore(candidate.skills, jobSkills),
        };
    });
    const experienceScoredCandidates = await generateSkillAssessment(normalizedCandidates);
    const potentialFitScoredCandidates = await generatePotentialAssessment(description, normalizedCandidates);
    const candidatesWithTotalScore = normalizedCandidates.map((candidate) => {
        const skillScore = skillScoredCandidates.find(c => c.candidateId === candidate.id)?.skillMatchScore || 0;
        const experienceScore = experienceScoredCandidates?.candidates.find(c => c.name === candidate.name)?.score || 0;
        const potentialFitScore = potentialFitScoredCandidates.candidates.find(c => c.name === candidate.name)?.score || 0;
        const totalScore = skillScore + experienceScore + potentialFitScore;
        return {
            name: candidate.name,
            candidateId: candidate.id,
            totalScore,
            skillScore,
            experienceScore,
            potentialFitScore,
        };
    });
    console.log(candidatesWithTotalScore);
    const sortedCandidates = [...candidatesWithTotalScore].sort((a, b) => b.totalScore - a.totalScore);
    const bestCandidate = sortedCandidates[0];
    const getWhyHeIsBestCandidate = await generateWhyHeIsBestCandidate(experienceScoredCandidates, potentialFitScoredCandidates, candidatesWithTotalScore, bestCandidate, role);
    const getResumeofBestCandidate = normalizedCandidates.filter((candidate) => candidate.id.includes(bestCandidate.candidateId));
    res.status(200).json({
        name: bestCandidate.name,
        id: bestCandidate.candidateId,
        resume: getResumeofBestCandidate,
        totalScore: bestCandidate.totalScore,
        experienceScore: bestCandidate.experienceScore,
        potentialFitScore: bestCandidate.potentialFitScore,
        skillScore: bestCandidate.skillScore,
        reason: getWhyHeIsBestCandidate,
    });
});
