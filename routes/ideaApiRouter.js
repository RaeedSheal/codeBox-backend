//Imports
import { Router } from "express";
const router = Router();
import {
    CreateIdea,
    getIdea,
    getIdeas,
    deleteIdea,
    editIdea,
    getIdeaById,
} from "../controllers/ideaController.js";
import {
    Authenticate,
    Authorize,
    AuthenticateCookie,
} from "../middleware/auth.js";

// Create Idea
router.post("/createidea", AuthenticateCookie, Authorize, CreateIdea);

// Get Random Idea
router.get("/randomIdea", AuthenticateCookie, getIdea);

// get all Idea
router.get("/ideas", AuthenticateCookie, Authorize, getIdeas);
// get specifc Idea
router.get("/getideabyid/:id", AuthenticateCookie, Authorize, getIdeaById);

// Deleta an Idea
router.delete("/deleleidea/:id", AuthenticateCookie, Authorize, deleteIdea);

// Edit Idea
router.put("/editidea/:id", AuthenticateCookie, Authorize, editIdea);

// Export
export default router;
