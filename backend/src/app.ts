import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generateQuestionRoute from './routes/generateQuestion';

dotenv.config();

const app = express();

// ✅ CORS fix for frontend 5174 <--> backend 5000
app.use(cors({
  origin: 'http://localhost:5174', // <-- your frontend URL
  credentials: true,
}));

app.use(express.json());

// ✅ Test route
app.get('/', (req, res) => {
  res.send('✅ Backend Server is Running Properly!');
});

// ✅ Mount routes
app.use('/api', generateQuestionRoute);

export default app;
