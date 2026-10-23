const express= require("express") ;
const logger=require("../logs/logger.js"); //create routing

const router = express.Router();

router.post("/", (req, res) => {
  const { level, message, data, } = req.body;

  if (level === "error") {
    logger.error(message, data);
  } else if (level === "warn") {
    logger.warn(message, data);
  } else {
    logger.info(message, data);
  }

  res.status(200).json({
    success: true,
  });
});

module.exports = router;