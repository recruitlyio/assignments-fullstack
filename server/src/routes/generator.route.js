const express = require("express");
const router = express.Router();
const { generator } = require("../controllers/generator.controller");

router.post("/", generator);

module.exports = router;
