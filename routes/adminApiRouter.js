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
import { AuthenticateCookie, Authorize } from "../middleware/auth.js";

// SignUp - once
router.post("/createadmin", Create);

// Login
router.post("/loginadmin", Login);

// Get all Users

router.get("/getusers", AuthenticateCookie, Authorize, GetUsers);

// Get a specifc user

router.get("/getuser/:id", AuthenticateCookie, Authorize, GetUser);

// Delete a user

router.delete("/eleteuser/:id", AuthenticateCookie, Authorize, DeleteUser);

// Export
export default router;
