const mongoose = require("mongoose");
const { CONFIGS, MODEL_CONSTANTS } = require("../utils/constants");

// question schema
const questionSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: [...CONFIGS.EXPERIENCE_LEVELS],
      default: CONFIGS.EXPERIENCE_LEVELS[0],
    },
    evaluationCriteria: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// model
const QuestionModel = mongoose.model(
  MODEL_CONSTANTS.QUESTION.MODEL,
  questionSchema,
  MODEL_CONSTANTS.QUESTION.TABLE
);

// exporting model
module.exports = QuestionModel;
