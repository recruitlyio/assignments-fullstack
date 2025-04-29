#!/bin/bash

# Function to handle cleanup on script exit
cleanup() {
    echo "Stopping all services..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit 0
}

# Set up trap to catch script termination
trap cleanup SIGINT SIGTERM

# Start backend service
echo "Starting backend service..."
cd backend
npm install
npm run dev &
BACKEND_PID=$!
cd ..

# Start frontend service
echo "Starting frontend service..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo "Services are running:"
echo "- Frontend: http://localhost:5173"
echo "- Backend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for both processes
wait $FRONTEND_PID $BACKEND_PID 