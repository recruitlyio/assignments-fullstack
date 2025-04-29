const { HTTP_STATUS, MESSAGES } = require("../utils/constants");
const Output = require("../utils/output");
const quesionService = require("../service/questionService");

const generate = async (req, res) => {
  try {
    const response = await quesionService.generate(req.body);

    await Output.success(
      res,
      HTTP_STATUS.OK,
      MESSAGES.SUCCESSFULLY_GET_QUESTIONS,
      response
    );
  } catch (error) {
    console.log(error, "from error");
    await Output.error(res, HTTP_STATUS.BAD_REQUEST, error?.message);
  }
};

module.exports = {
  generate,
};
