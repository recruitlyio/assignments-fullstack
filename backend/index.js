const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const verifyToken = require('./middleware/verifyToken');
const resumeAnalyzerRouter = require('./router/resume');


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
});
// app.use(verifyToken);
app.use('/api/resume-analyzer', resumeAnalyzerRouter);
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

