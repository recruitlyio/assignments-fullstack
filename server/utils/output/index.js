const success = async (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data: { response: data },
  });
};

const error = async (res, status, error) => {
  res.status(status).json({
    status,
    error,
  });
};

module.exports = {
  success,
  error,
};
