"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parse_controller_1 = require("../controllers/parse.controller");
const router = (0, express_1.Router)();
// Define the POST endpoint for parsing resumes
// POST /api/parse
router.post('/parse', parse_controller_1.parseResumeController);
exports.default = router;
