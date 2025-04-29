import { Request, Response, NextFunction } from 'express';

/**
 * Basic global error handling middleware.
 * Logs the error and sends a generic server error response.
 * Customize based on error types for more specific responses.
 */
export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction // Required signature for Express error handlers
): void => {

    console.error("================ Global Error Handler ================");
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error(`Request Path: ${req.path}`);
    console.error(`Error Name: ${err.name}`);
    console.error(`Error Message: ${err.message}`);
    // Avoid logging the full stack in production environments unless necessary
    // Consider logging stack to a file or error tracking service instead
    if (process.env.NODE_ENV === 'development') {
        console.error(`Error Stack: ${err.stack}`);
    }
    console.error("====================================================");


    // Check for specific error types if needed, e.g., validation errors
    // if (err instanceof SpecificValidationError) {
    //    return res.status(400).json({ message: err.message, details: err.details });
    // }

    // Default to 500 Internal Server Error
    // Avoid sending detailed internal error messages to the client in production
    const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode : 500; // Respect existing error codes if set
    const message = (statusCode === 500 && process.env.NODE_ENV === 'production')
        ? 'An unexpected error occurred on the server.' // Generic message for production 500s
        : err.message || 'Internal Server Error'; // Use error message otherwise

    res.status(statusCode).json({ message });
};