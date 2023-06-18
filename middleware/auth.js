const Admin = require("../models/Admin");

const jwt = require("jsonwebtoken");
const JWT_PRIVATE = process.env.JWT_PRIVATE;

module.exports = {
    Authenticate: async (req, res, next) => {
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
            res.locals.verifiedToken = jwt.verify(token, JWT_PRIVATE);
            next();
        } catch (err) {
            console.log("Authenticate: " + err);
            res.json({ error: "Not Authenticated" });
        }
    },
};
