import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import matchingRoutes from './routes/matchingRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', matchingRoutes);

export default app; 