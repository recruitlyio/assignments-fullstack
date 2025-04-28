import app from './app.js';
import config from './config/config.js';
import { createServer } from 'node:http';
import { normalizeAllCandidatesSkills } from './service/candidate.service.js';
const server = createServer(app);
server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
export const normalizedCandidates = await normalizeAllCandidatesSkills().then((candidates) => {
    return candidates;
});
