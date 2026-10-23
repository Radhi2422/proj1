const winston = require("winston");
const moment = require("moment-timezone");

const logger = winston.createLogger({
  // Allow info, warn, error, etc.
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp({
      format: () =>
        moment()
          .tz("Asia/Kolkata")
          .format("YYYY-MM-DD HH:mm:ss"),
    }),

    winston.format.printf(({ level, timestamp, message, ...meta }) => {
      return JSON.stringify({
        level,
        timestamp,
        message,
        ...meta,
      });
    })
  ),

  transports: [
    // Error logs
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // Info + warn + error logs
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info",
    }),

    // Show logs in terminal
    new winston.transports.Console(),
  ],
});

module.exports = logger;