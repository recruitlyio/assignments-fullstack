const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    jobTitle: String,
    skills: [String],
    experienceLevel: String,
    questions: [
      {
        text: String,
        evaluationCriteria: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
