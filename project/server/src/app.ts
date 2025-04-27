import express from 'express';
import questionRoutes from './routes/question.routes';
import { errorHandler } from './middlewares/error.middleware';
import { AppError } from './middlewares/error.middleware';
import cors from 'cors';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/question', questionRoutes);

app.use(/(.*)/, (req, res, next) => {
  const error = new Error('Route Not Found') as AppError;
  error.status = 404;
  next(error);
});

app.use(errorHandler);

export default app;
