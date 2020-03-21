class CustomError extends Error {
  constructor(statusCode, message, query = false) {
    super();
    this.custom = true;
    this.statusCode = statusCode;
    this.message = message;
    this.query = query;
  }
}

function customErrorHandler(err, req, res, next) {
  const isCustom = err.custom;

  if (isCustom) {
    const isQuery = err.query;
    const statusCode = err.statusCode || 500;
    const message = err.message || 'unexpected_error';

    if (isQuery)
      res.redirect(
        statusCode,
        '/#?' + querystring.stringify({ error: message })
      );
    else res.status(statusCode).json({ error: message });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500).json({ error: 'unexpected_error' });
}

module.exports = { CustomError, customErrorHandler, errorHandler };
