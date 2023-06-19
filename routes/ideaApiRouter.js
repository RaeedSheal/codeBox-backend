//Imports
const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const { Authenticate, Authorize } = require("../middleware/auth");

// Create Idea
router.post("/createidea", Authenticate, Authorize, ideaController.CreateIdea);

// Get Random Idea
router.get("/randomIdea", Authenticate, ideaController.getIdea);

// Delete Idea
router.get("/ideas", Authenticate, Authorize, ideaController.getIdeas);

// Deleta an Idea
router.delete(
    "/deleleidea/:id",
    Authenticate,
    Authorize,
    ideaController.deleteIdea
);

// Edit Idea
router.patch("/editidea/:id", Authenticate, Authorize, ideaController.editIdea);

// Export
module.exports = router;
