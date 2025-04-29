const openAIService = require("./openAiService");
const questionValidations = require("../validations/questionValidations");
const questionRepository = require("../repository/questionRepository");
const { MESSAGES } = require("../utils/constants");

const generate = async (payload) => {
  console.log(1);
  // validation
  const { error, value } = questionValidations.generate.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }
  console.log(1);
  //   destructure
  const { jobTitle, skill, experienceLevel, isNew } = payload;

  //   check in db, if questions already exist by same title, skill & level
  const questions = await questionRepository.getMany({
    jobTitle,
    skill,
    difficulty: experienceLevel,
  });
  console.log(2);
  let result = [];

  if (!questions?.length || (questions.length && isNew)) {
    console.log(4);
    // call gemini ai to generate questions
    result = await openAIService.generate({
      jobTitle,
      skill,
      experienceLevel,
    });
    console.log(5);

    if (!result || !result?.length)
      throw new Error(MESSAGES.QUESTIONS_NOT_FOUND_GEMINI);

    // form payload
    const insertPayload = result?.map((data) => {
      return {
        jobTitle,
        skill: data?.skill,
        question: data?.question,
        difficulty: data?.difficulty,
        evaluationCriteria: data?.evaluationCriteria,
      };
    });

    // save into db
    result = await questionRepository.insertMany(insertPayload);
    console.log(6);
  } else {
    console.log(3);
    result = questions;
  }
  console.log(7);
  return result;
};

module.exports = {
  generate,
};
