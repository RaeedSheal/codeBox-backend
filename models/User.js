import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true, select: false },
        date: Date,
    },
    { timestamps: true }
);

const User = model("user", userSchema);

export default User;
