import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { chatRouter } from "./routes/chat";

// Load environment variables
dotenv.config();

// Verify required environment variables
if (!process.env.GROQ_API_KEY) {
  console.error("ERROR: GROQ_API_KEY is missing in .env file");
  process.exit(1);
}

// Verify API key on startup (optional but helpful)
async function verifyApiKey() {
  try {
    console.log("Verifying Groq API key...");

    // Simple request to check if the API key works
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192", // Using a smaller model for quick verification
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 10,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    console.log("✅ Groq API key verified successfully!");
    return true;
  } catch (error: any) {
    console.error("❌ Groq API key verification failed:", error.message);
    if (error.response?.status === 401) {
      console.error("The provided API key is invalid or expired.");
    }
    return false;
  }
}

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN || "http://localhost:5173",
  })
);

// Routes
app.use("/api/chat", chatRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Add this error handler at the end of your file
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Global error handler caught:", err);
  res.status(500).json({
    error: "An unexpected error occurred",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server with API verification
(async () => {
  await verifyApiKey();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
