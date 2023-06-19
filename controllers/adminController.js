import Admin from "../models/Admin.js";

import { hash, compare } from "bcrypt";
const saltRounds = parseInt(process.env.SALT);
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
const JWT_PRIVATE = process.env.JWT_PRIVATE;

export async function Create(req, res) {
    let hashedPass = "";
    // Hashing
    try {
        hashedPass = await hash("admin", saltRounds);
    } catch (err) {
        console.log("-- Error In Hashing --");
        console.log(err);
        console.log("-- Error In Hashing --");
        res.status(500).json({ errMsg: "Error In Creating admin" });
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
        console.log("-- Error In Creating admin --");
        console.log(err);
        console.log("-- Error In Creating admin --");
        res.status(500).json({ errMsg: "Error In Creating admin" });
    }
}
export async function Login(req, res) {
    try {
        const admin = await Admin.findOne({
            username: req.body.username,
        }).select("+password");

        if (await compare(req.body.password, admin.password)) {
            const token = sign(
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
}
