// src/server.ts

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import parseRoutes from './routes/parse.routes'; // Import the routes
import { globalErrorHandler } from './utils/errorHandler'; // Import the global error handler
import { initializeEmbeddings } from './services/validation.service'; // Import the initialization function

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001; // Use port from .env or default

// --- Middleware ---

// Enable CORS for all origins (adjust for production if needed)
// For production, restrict to your frontend's origin:
// app.use(cors({ origin: 'YOUR_FRONTEND_URL' }));
app.use(cors());

// Parse JSON request bodies
app.use(express.json({ limit: '1mb' })); // Set JSON payload limit (adjust as needed)

// Optional: Parse URL-encoded request bodies (if using forms)
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// --- Routes ---

// Simple health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Resume Parser API is running!');
});

// Mount the parsing API routes
app.use('/api', parseRoutes); // All routes in parse.routes.ts will be prefixed with /api

// --- Error Handling ---

// Catch-all for 404 Not Found errors (after specific routes)
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
});

// Global error handling middleware (must be defined AFTER routes and 404 handler)
app.use(globalErrorHandler);

// --- Start Server ---

/**
 * Initializes necessary services (like embeddings) and then starts the Express listener.
 */
async function startServer() {
  try {
    // Initialize embeddings BEFORE starting the listener.
    // This ensures the cache is ready before accepting requests.
    // The initializeEmbeddings function should handle its own errors or throw
    // if startup should be prevented.
    await initializeEmbeddings();

    // If initialization is successful, start listening for requests
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
      // Verify API key presence (good practice)
      if (!process.env.GEMINI_API_KEY) {
        console.warn(`[server]: WARNING - GEMINI_API_KEY environment variable is not set.`);
      } else {
        // Avoid logging keys, just confirm it's loaded
        console.log(`[server]: GEMINI_API_KEY loaded.`);
      }
    });
  } catch (error) {
    // If initializeEmbeddings() throws an error, catch it here
    console.error("[server]: Failed to start server due to initialization error:", error);
    // Exit the process if critical initialization fails
    process.exit(1);
  }
}

// Call the async start function to initiate the process
startServer();