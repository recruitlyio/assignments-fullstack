import { Router } from 'express';
const job_router = Router();
job_router.route('/create-job').post();
export default job_router;
