import express from "express";
import cors from "cors";
import questionRouter from "./routes/question";


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/questions", questionRouter);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
