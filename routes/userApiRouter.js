//Imports
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// SignUp
router.post("/createuser", userController.Signup);

// Login
router.post("/loginuser", userController.Login);

// Export
module.exports = router;
