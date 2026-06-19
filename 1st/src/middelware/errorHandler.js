const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err.stack);

  return res.status(statusCode).json({
    success : false,
    status : statusCode,
    message : message
  })
};

module.exports = errorHandler;
