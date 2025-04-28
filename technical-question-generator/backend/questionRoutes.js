const express = require('express');
const router = express.Router();
const { askQuestion } = require('./questionController');

router.post('/', askQuestion);

module.exports = router;
