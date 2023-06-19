//Imports
import { Router } from "express";
const router = Router();
import { Signup, Login, EditUser } from "../controllers/userController.js";

// SignUp
router.post("/createuser", Signup);

// Login
router.post("/loginuser", Login);

// Edit User
router.post("/edituser/:id", EditUser);

// Export
export default router;
