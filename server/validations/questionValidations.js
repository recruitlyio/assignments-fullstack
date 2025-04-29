const Joi = require("joi");
const { CONFIGS } = require("../utils/constants");

const generate = Joi.object({
  jobTitle: Joi.string().required().messages({
    "string.base": "Job title must be a string",
    "any.required": "Job title is required",
  }),
  skill: Joi.string().required().messages({
    "string.base": "Skill must be a string",
    "any.required": "Skill is required",
  }),
  experienceLevel: Joi.string()
    .valid(...CONFIGS.EXPERIENCE_LEVELS)
    .required()
    .messages({
      "any.only": "Experience level must be one of 'easy', 'medium', or 'hard'",
      "any.required": "Experience level is required",
    }),
  isNew: Joi.boolean().default(false).messages({
    "boolean.base": "isNew must be a boolean",
  }),
});

module.exports = {
  generate,
};
