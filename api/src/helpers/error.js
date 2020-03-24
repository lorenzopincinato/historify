const querystring = require('querystring');

class CustomError extends Error {
  constructor(options) {
    super();
    this.custom = true;
    this.statusCode = options.statusCode || 500;
    this.message = options.message || 'unexpected_error';
    this.query = options.query || false;
  }
}

function customErrorHandler(err, req, res, next) {
  const { custom, query, statusCode, message } = err;

  if (custom) {
    if (query) res.redirect(`#?${querystring.stringify({ error: message })}`);
    else res.status(statusCode).json({ error: message });
  } else {
    next(err);
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).json({ error: 'unexpected_error' });
}

module.exports = {
  CustomError,
  customErrorHandler,
  errorHandler,
};
