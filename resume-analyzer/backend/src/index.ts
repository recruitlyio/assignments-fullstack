import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import parseRoute from "./routes/parse";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", parseRoute);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
