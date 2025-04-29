const { QuestionModel } = require("../models");
const { MESSAGES } = require("../utils/constants");

const getMany = async (query) => {
  return await QuestionModel.find(query);
};

const insertMany = async (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(MESSAGES.BULK_INSERT_MUST_BE_AN_ARRAY);
  }

  return await QuestionModel.insertMany(data);
};

module.exports = {
  getMany,
  insertMany,
};
