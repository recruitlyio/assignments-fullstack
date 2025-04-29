import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { errorHandler } from './middleware/errorHandler';
import { createQuestionRouter } from './routes/questionRoutes';
import { logger } from './utils/logger';

const configureMiddleware = (app: Application): void => {
  // Security middleware
  app.use(helmet());

  // Enable CORS with specific configuration
  app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Vite's default port
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: 86400, // 24 hours
    })
  );

  // Compression middleware
  app.use(compression());

  // Body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });
};

const setupRoutes = (app: Application): void => {
  // API routes
  app.use('/api/questions', createQuestionRouter());

  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
  });

  // Handle 404
  app.use((_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({
      success: false,
      message: 'Endpoint not found',
    });
  });

  // Error handling
  app.use(errorHandler);
};

export const createApp = (): Application => {
  const app = express();

  // Configure middleware
  configureMiddleware(app);

  // Setup routes
  setupRoutes(app);

  return app;
};
