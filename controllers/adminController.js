const Admin = require("../models/Admin");

const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.SALT);
const jwt = require("jsonwebtoken");
const JWT_PRIVATE = process.env.JWT_PRIVATE;

module.exports = {
    // Create Admin
    Create: async (req, res) => {
        let hashedPass = "";
        // Hashing
        try {
            hashedPass = await bcrypt.hash("admin", saltRounds);
        } catch (err) {
            console.log("-- Error In Hashing --");
            console.log(err);
            console.log("-- Error In Hashing --");
            res.json({ errMsg: "Error In Creating User" });
        }
        // Creating User
        try {
            const user = await Admin.create({
                username: "admin",
                password: hashedPass,
            });
            // Signup Return
            res.json({
                username: user.username,
                email: user.email,
                id: user._id,
            });
        } catch (err) {
            console.log("-- Error In Creating User --");
            console.log(err);
            console.log("-- Error In Creating User --");
            res.json({ errMsg: "Error In Creating User" });
        }
    },
    // Login User
    Login: async (req, res) => {
        try {
            const admin = await Admin.findOne({
                username: req.body.username,
            }).select("+password");

            if (await bcrypt.compare(req.body.password, admin.password)) {
                const token = jwt.sign(
                    {
                        username: admin.username,
                        id: admin._id,
                    },
                    JWT_PRIVATE,
                    { expiresIn: "1h" }
                );
                res.cookie("access_token", token, {
                    httpOnly: true,
                }).json({ id: admin._id, username: admin.username, token });
            } else {
                res.status(401).json({ errMsg: "Incorrect Information" });
            }
        } catch (err) {
            console.log(err);
            res.status(401).json({ errMsg: "Incorrect Information" });
        }
    },
};
