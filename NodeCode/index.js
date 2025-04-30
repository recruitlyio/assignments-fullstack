import express from 'express';
import appRouter from './app.js';
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use(appRouter)
//SERVER START
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server running on  http://localhost:${PORT}`);
})
