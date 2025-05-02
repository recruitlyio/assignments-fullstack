const express = require('express');
const router = express.Router();
const { matchCandidates } = require('../services/matchEngine');

router.post('/match', async (req, res) => {
  try {
    const { jobDescription, candidates } = req.body;
    const result = await matchCandidates(jobDescription, candidates);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Matching failed' });
  }
});

module.exports = router;
