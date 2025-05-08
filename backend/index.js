import dotenv from "dotenv";
import express from "express";
dotenv.config();
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: ["http://localhost:3001", "https://your-production-url.com"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());


// Your other routes
import router from "./routes/match.js"; 
app.use("/api", router);
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
