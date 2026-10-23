const express = require("express");
const router = express.Router();
const validateRegister=require("../middleware/validateUserMiddleware.js");
const authController =require("../controllers/authController");

router.post("/login", authController.login);
router.post("/register", validateRegister,authController.register);

module.exports = router;