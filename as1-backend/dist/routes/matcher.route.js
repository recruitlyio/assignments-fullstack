import { Router } from 'express';
const matcher_router = Router();
matcher_router.route('/get-matcher').get();
export default matcher_router;
