import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { handleError } from "./utils/errorHandler";
import config from "./config";
import routes from "./routes";

// Create Express app
const app: Express = express();

// Apply middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging middleware
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// API routes
app.use(routes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

// Error handling middleware
app.use(handleError);

export default app;
