import Admin from "../models/Admin.js";

import { verify } from "jsonwebtoken";
const JWT_PRIVATE = process.env.JWT_PRIVATE;

export async function Authenticate(req, res, next) {
    const tokenHeader = req.headers.authorization;
    // No Token
    if (!tokenHeader) {
        res.json({ error: "No Token" });
        return;
    }
    // Token
    const token = tokenHeader.split(" ")[1];
    // Get token and split it form bearer
    try {
        res.locals.verifiedToken = verify(token, JWT_PRIVATE);
        next();
    } catch (err) {
        console.log("Authenticate: " + err);
        res.json({ error: "Not Authenticated" });
    }
}
export async function Authorize(req, res, next) {
    try {
        res.locals.admin = await Admin.findById(res.locals.verifiedToken.id);
        // Only admin can do this
        if (res.locals.admin) {
            next();
        } else {
            res.json({ err: "Only admin can access this" });
        }
    } catch (err) {
        console.log("error authorizing: " + err);
        res.json({ err: "Only admin can access this" });
    }
}
