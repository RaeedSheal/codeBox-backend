//Imports
import { Router } from "express";
const router = Router();
import { Create, Login } from "../controllers/adminController.js";

// SignUp - once
router.post("/createadmin", Create);

// Login
router.post("/loginadmin", Login);

// Export
export default router;
