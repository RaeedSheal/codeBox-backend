import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const ideaSchema = new Schema(
    {
        name: { type: String, required: true },
        instructions: { type: String, required: true },
        inputA: { type: String, required: true },
        inputB: { type: String, required: true },
        outputA: { type: String, required: true },
        outputB: { type: String, required: true },
    },
    { timestamps: true }
);

const Idea = model("idea", ideaSchema);

export default Idea;
