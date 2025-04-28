import { Router } from 'express';
import { getCandidates, getJobs, matchCandidateToJob } from '../controllers/matchingController';

const router = Router();

// Get all candidates
router.get('/candidates', getCandidates);

// Get all jobs
router.get('/jobs', getJobs);

// Match a specific candidate to a specific job
router.get('/match/:candidateId/:jobId', (req, res, next) => {
  matchCandidateToJob(req, res).catch(next);
});

export default router; 