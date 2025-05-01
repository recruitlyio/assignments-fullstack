const express = require("express");
const cors = require("cors");
require("dotenv").config();

const generatorRoutes = require("./routes/generator.route");

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:3000", // Explicitly allow your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-api-key"], // Add x-api-key to allowed headers
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// API Key Authentication Middleware

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is working" });
});
app.use((req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.VALID_API_KEY) {
    return res.status(401).json({ error: "Unauthorized: Invalid API key" });
  }

  next();
});

app.use("/api/generator", generatorRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
