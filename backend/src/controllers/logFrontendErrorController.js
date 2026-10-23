const logger = require("../config/logger");

exports.logFrontendError = async (req, res) => {
  try {
    const {
      message,
      stack,
      component,
      url,
      userAgent,
      additionalData,
    } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Error message is required",
      });
    }

    logger.error("Frontend Error", {
      message,
      stack,
      component,
      url,
      userAgent,
      additionalData,
    });

    return res.status(200).json({
      success: true,
      message: "Frontend error logged successfully",
    });

  } catch (error) {
    logger.error("Failed to save frontend error", {
      error: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      message: "Failed to log frontend error",
    });
  }
};