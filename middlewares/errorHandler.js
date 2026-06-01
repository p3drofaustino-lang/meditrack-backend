const { ERROR_SERVER } = require('../utils/errors');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;

  res.status(statusCode).send({
    message: statusCode === ERROR_SERVER ? 'Server error' : message,
  });

  next();
};
