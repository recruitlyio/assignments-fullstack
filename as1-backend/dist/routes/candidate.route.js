import { Router } from 'express';
import { getCandidatesHandler } from '../controllers/candidate.controller.js';
const candidate_route = Router();
candidate_route.route('/get-candidates').post(getCandidatesHandler);
export default candidate_route;
