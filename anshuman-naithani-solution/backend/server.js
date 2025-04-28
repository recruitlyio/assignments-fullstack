// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const questionRoutes = require("./routes/questionRoutes");

const corsOptions = {
  origin: "http://localhost:3000", // Adjust the frontend URL here
  methods: "GET,POST",
  allowedHeaders: "Content-Type",
};

const app = express();
// Middleware
app.use(cors(corsOptions)); // For handling cross-origin requests
app.use(bodyParser.json());

// Routes
app.use("/api", questionRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
