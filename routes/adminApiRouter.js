//Imports
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// SignUp - once
router.post("/createadmin", adminController.Create);

// Login
router.post("/loginadmin", adminController.Login);

// Export
module.exports = router;
