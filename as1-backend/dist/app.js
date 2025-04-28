import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import candidate_route from './routes/candidate.route.js';
import cors from "cors";
import 'dotenv/config';
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());
app.use(errorHandler);
app.use('/api/v1/candidates', candidate_route);
export default app;
