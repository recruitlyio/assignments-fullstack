require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const matchRoutes = require('./src/routes/match');

const app = express();
app.use(bodyParser.json());

app.use('/api', matchRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
