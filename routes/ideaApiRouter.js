//Imports
const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { Authenticate } = require("../middleware/auth");

// Export
module.exports = router;
