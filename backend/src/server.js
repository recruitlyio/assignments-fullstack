"use strict";
// src/server.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const parse_routes_1 = __importDefault(require("./routes/parse.routes")); // Import the routes
const errorHandler_1 = require("./utils/errorHandler"); // Import the global error handler
const validation_service_1 = require("./services/validation.service"); // Import the initialization function
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5001; // Use port from .env or default
// --- Middleware ---
// Enable CORS for all origins (adjust for production if needed)
// For production, restrict to your frontend's origin:
// app.use(cors({ origin: 'YOUR_FRONTEND_URL' }));
app.use((0, cors_1.default)());
// Parse JSON request bodies
app.use(express_1.default.json({ limit: '1mb' })); // Set JSON payload limit (adjust as needed)
// Optional: Parse URL-encoded request bodies (if using forms)
app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
// --- Routes ---
// Simple health check endpoint
app.get('/', (req, res) => {
    res.send('Resume Parser API is running!');
});
// Mount the parsing API routes
app.use('/api', parse_routes_1.default); // All routes in parse.routes.ts will be prefixed with /api
// --- Error Handling ---
// Catch-all for 404 Not Found errors (after specific routes)
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});
// Global error handling middleware (must be defined AFTER routes and 404 handler)
app.use(errorHandler_1.globalErrorHandler);
// --- Start Server ---
/**
 * Initializes necessary services (like embeddings) and then starts the Express listener.
 */
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Initialize embeddings BEFORE starting the listener.
            // This ensures the cache is ready before accepting requests.
            // The initializeEmbeddings function should handle its own errors or throw
            // if startup should be prevented.
            yield (0, validation_service_1.initializeEmbeddings)();
            // If initialization is successful, start listening for requests
            app.listen(port, () => {
                console.log(`[server]: Server is running at http://localhost:${port}`);
                // Verify API key presence (good practice)
                if (!process.env.GEMINI_API_KEY) {
                    console.warn(`[server]: WARNING - GEMINI_API_KEY environment variable is not set.`);
                }
                else {
                    // Avoid logging keys, just confirm it's loaded
                    console.log(`[server]: GEMINI_API_KEY loaded.`);
                }
            });
        }
        catch (error) {
            // If initializeEmbeddings() throws an error, catch it here
            console.error("[server]: Failed to start server due to initialization error:", error);
            // Exit the process if critical initialization fails
            process.exit(1);
        }
    });
}
// Call the async start function to initiate the process
startServer();
