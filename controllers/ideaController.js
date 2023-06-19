import Idea from "../models/Idea.js";

export async function CreateIdea(req, res) {
    try {
        const idea = await Idea.create({
            name: req.body.name,
            instructions: req.body.instructions,
            inputA: req.body.inputA,
            inputB: req.body.inputB,
            outputA: req.body.outputA,
            outputB: req.body.outputB,
        });
        res.json(idea);
    } catch (err) {
        console.log("Error In Create Idea: " + err);
        res.status(500).json({ errMsg: "Error in Creating Idea" });
    }
}
export async function getIdea(req, res) {
    try {
        const ideas = await Idea.find();
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        res.json({ idea: randomIdea });
    } catch (err) {
        console.log("Error In Finding Random Idea: " + err);
        res.status(404).json({ errMsg: "Idea Not found" });
    }
}
export async function getIdeas(req, res) {
    try {
        const ideas = await Idea.find();
        res.json({ ideas });
    } catch (err) {
        console.log("Error In Finding Random Idea: " + err);
        res.status(404).json({ errMsg: "Ideas Not found" });
    }
}
export async function deleteIdea(req, res) {
    try {
        const ideaId = req.params.id;
        const idea = await Idea.findByIdAndDelete(ideaId);
        res.json(idea);
    } catch (err) {
        console.log("Error In Deleting Idea: " + err);
        res.status(404).json({ errMsg: "Idea Not found" });
    }
}
export async function editIdea(req, res) {
    try {
        let name = req.body.name;
        let instructions = req.body.instructions;
        let inputA = req.body.inputA;
        let inputB = req.body.inputB;
        let outputA = req.body.outputA;
        let outputB = req.body.outputB;
        const editedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            {
                name,
                instructions,
                inputA,
                inputB,
                outputA,
                outputB,
            },
            { new: true }
        );
        res.json(editedIdea);
    } catch (err) {
        console.log("Error In Editing Idea: " + err);
        res.status(404).json({ errMsg: "Idea Not found" });
    }
}
