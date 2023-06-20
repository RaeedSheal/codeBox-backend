//Imports
import { Router } from "express";
const router = Router();
import {
    CreateIdea,
    getIdea,
    getIdeas,
    deleteIdea,
    editIdea,
} from "../controllers/ideaController.js";
import {
    Authenticate,
    Authorize,
    AuthenticateCookie,
} from "../middleware/auth.js";

// Create Idea
router.post("/createidea", Authenticate, Authorize, CreateIdea);

// Get Random Idea
router.get("/randomIdea", AuthenticateCookie, getIdea);

// Delete Idea
router.get("/ideas", Authenticate, Authorize, getIdeas);

// Deleta an Idea
router.delete("/deleleidea/:id", Authenticate, Authorize, deleteIdea);

// Edit Idea
router.patch("/editidea/:id", Authenticate, Authorize, editIdea);

// Export
export default router;
