# Use Node.js LTS version
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy prisma schema and generate client
COPY prisma ./prisma
RUN pnpm prisma generate

# Copy the rest of the application
COPY . .

# Build TypeScript
RUN pnpm tsc

# Expose the port the app runs on
EXPOSE 8000

# Set environment variables with default values
ENV DATABASE_URL="mongodb+srv://skeshav162:wDP0YojRGJb8afSc@cluster0.yvwp7fb.mongodb.net/interviewdb?retryWrites=true&w=majority&appName=Cluster0"
ENV GEMINI_API_KEY="AIzaSyCRIAcFy6BCYa1PUgEsD_zchs2uBGXXGJw"

# Start the application
CMD ["pnpm", "dev"]