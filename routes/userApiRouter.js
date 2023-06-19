//Imports
import { Router } from "express";
const router = Router();
import { Signup, Login } from "../controllers/userController.js";

// SignUp
router.post("/createuser", Signup);

// Login
router.post("/loginuser", Login);

// Export
export default router;
