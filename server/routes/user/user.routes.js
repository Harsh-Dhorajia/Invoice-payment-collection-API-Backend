const express = require("express");
const { login, register } = require("../../controllers/Users");
const router = express.Router();
const userValidation = require("../../validators/users/user-validation");

// route to Register a user
router.post("/register", userValidation.register, register);

// route to Login a user
router.post("/login", userValidation.login, login);

module.exports = router;
