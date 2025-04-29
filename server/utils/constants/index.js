/* ************* HTTP STATUS CONSTANT *********** */
const HTTP_STATUS = {
  // Success responses
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // Client error responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server error responses
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503,
};

/* ************* MESSAGES CONSTANT *********** */
const MESSAGES = {
  SUCCESSFULLY_GET_QUESTIONS: "Successfully get questions",
  BULK_INSERT_MUST_BE_AN_ARRAY:
    "Data for bulk insert must be a non-empty array",
  QUESTIONS_NOT_FOUND_GEMINI: "Questions not found in GEMINI",
  NO_RESPONSE_FROM_GEMINI: "No response text from Gemini",
};

/* ************* CONFIGS CONSTANT *********** */
const CONFIGS = {
  EXPERIENCE_LEVELS: ["easy", "medium", "hard"],
};

/* ************* MODEL CONSTANT *********** */
const MODEL_CONSTANTS = {
  QUESTION: {
    MODEL: "QuestionModel",
    TABLE: "questions",
  },
};

module.exports = {
  HTTP_STATUS,
  MESSAGES,
  CONFIGS,
  MODEL_CONSTANTS,
};
