const express = require("express");
const router = express.Router();
const questionsController = require("../controller/questionsController");

// generate questions
router.post("/generate", questionsController.generate);

module.exports = router;
