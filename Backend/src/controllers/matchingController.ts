import { Request, Response } from 'express';
import { MatchingEngine } from '../services/matchingEngine';
import { mockCandidates, mockJobs } from '../data/mockData';

const matchingEngine = new MatchingEngine();

export const getCandidates = (req: Request, res: Response) => {
  res.json(mockCandidates);
};

export const getJobs = (req: Request, res: Response) => {
  res.json(mockJobs);
};

export const matchCandidateToJob = async (req: Request, res: Response) => {
  try {
    const candidate = mockCandidates.find(c => c.id === req.params.candidateId);
    const job = mockJobs.find(j => j.id === req.params.jobId);

    if (!candidate || !job) {
      return res.status(404).json({ error: 'Candidate or job not found' });
    }

    const match = await matchingEngine.matchCandidateToJob(candidate, job);
    res.json(match);
  } catch (error) {
    console.error('Error matching candidate to job:', error);
    res.status(500).json({ error: 'Internal server error during matching' });
  }
}; 