import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const adminSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true, select: false },
    },
    { timestamps: true }
);

const Admin = model("admin", adminSchema);

export default Admin;
