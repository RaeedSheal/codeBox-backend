const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

const Idea = mongoose.model("idea", ideaSchema);

module.exports = Idea;
