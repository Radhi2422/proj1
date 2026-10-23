const logger = require("../logs/logger");
const errorMiddleware = (err, req, res, next) => {
  const errorData = {
    message: err?.message || "Internal Server Error",
    name: err?.name || "Error",
    statusCode: Number(err?.statusCode) || 500,
    stack: err?.stack || null,
    method: req.method,
    url: req.originalUrl
  };

  // Logger
  logger.error(errorData);

  // API response
  res.status(errorData.statusCode).json({
    success: false,
    message: errorData.message,
    statusCode: errorData.statusCode
  });
};

module.exports = errorMiddleware;