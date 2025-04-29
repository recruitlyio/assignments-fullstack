import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from './routes/chat';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/chat', chatRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});