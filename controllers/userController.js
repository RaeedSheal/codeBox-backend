import User from "../models/User.js";
import { hash, compare } from "bcrypt";
const saltRounds = parseInt(process.env.SALT);
import jsonwebtoken from "jsonwebtoken";
const { sign } = jsonwebtoken;
const JWT_PRIVATE = process.env.JWT_PRIVATE;

export async function Signup(req, res) {
    let hashedPass = "";
    // Hashing
    try {
        hashedPass = await hash(req.body.password, saltRounds);
    } catch (err) {
        console.log("-- Error In Hashing --");
        console.log(err);
        console.log("-- Error In Hashing --");
        res.status(500).json({ errMsg: "Error In Creating User" });
    }
    // Creating User
    try {
        const user = await User.create({
            name: req.body.name,
            username: req.body.username,
            password: hashedPass,
            email: req.body.email,
            date: req.body.date,
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
        res.status(500).json({ errMsg: "Error In Creating User" });
    }
}
export async function Login(req, res) {
    try {
        const user = await User.findOne({
            email: req.body.email,
        }).select("+password");

        if (await compare(req.body.password, user.password)) {
            const token = sign(
                {
                    name: user.name,
                    username: user.username,
                    id: user._id,
                },
                JWT_PRIVATE,
                { expiresIn: "1h" }
            );
            res.cookie("access_token", token, {
                httpOnly: true,
            }).json({ id: user._id, username: user.username, token });
        } else {
            res.status(401).json({ errMsg: "Incorrect Information" });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ errMsg: "Incorrect Information" });
    }
}
export async function EditUser(req, res) {
    try {
        let name = req.body.name;
        let email = req.body.email;
        let date = req.body.date;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                date,
            },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        console.log("Error in Editing User" + err);
        res.json({ errMsg: "Error in Editing" });
    }
}
