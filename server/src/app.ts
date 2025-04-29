import express, { Application } from "express";
import cors from "cors";
import routes from "./routes/routes";
import { errorHandler } from "./middleware/errorMiddleware";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", routes);

// Error handling middleware (must be last!)
app.use(errorHandler);

export default app;
