const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./questionRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/questions', questionRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
