const express = require("express");
const router = express.Router();
const { generateQuestions } = require("../controllers/questionController");

// POST route to generate technical questions
router.post("/generate", generateQuestions);

module.exports = router;
