import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './config/logger';
import { router as questionRouter } from './routes/question.routes';
import { config } from './config';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', questionRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

const port = Number(config.port);
app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

