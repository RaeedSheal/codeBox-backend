//Imports
import { Router } from "express";
const router = Router();
import {
    Create,
    Login,
    GetUsers,
    GetUser,
    DeleteUser,
} from "../controllers/adminController.js";
import { Authenticate, Authorize } from "../middleware/auth.js";

// SignUp - once
router.post("/createadmin", Create);

// Login
router.post("/loginadmin", Login);

// Get all Users

router.get("/getusers", Authenticate, Authorize, GetUsers);

// Get a specifc user

router.get("/getuser/:id", Authenticate, Authorize, GetUser);

// Delete a user

router.delete("/eleteuser/:id", Authenticate, Authorize, DeleteUser);

// Export
export default router;
