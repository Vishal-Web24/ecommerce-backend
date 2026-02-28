// middleware/errorHandler.js
const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(`Unhandled Error: ${err.message} | Route: ${req.originalUrl}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

const notFound = (req, res, next) => {
  logger.warn(`404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};

module.exports = { errorHandler, notFound };