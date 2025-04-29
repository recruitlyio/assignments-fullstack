const express = require("express");
const router = express.Router();

// questions route
const questionRoutes = require("./questionRoutes");

// map
router.use("/questions", questionRoutes);

module.exports = router;
