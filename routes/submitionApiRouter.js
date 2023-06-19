import { Router } from "express";
const router = Router();
import { execSync } from "child_process";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import Idea from "../models/Idea.js";
const ___filename = fileURLToPath(import.meta.url);
const __dirname = dirname(___filename);
const CODE_FOLDER = "answer";
// test
router.post("/submitcode/:id", (req, res) => {
    testCode(req, res);
});

async function testCode(req, res) {
    let code = req.body.code;
    let idea = await Idea.findById(req.params.id);
    try {
        writeFileSync(join(__dirname, CODE_FOLDER, "input_code.py"), code);
        // Execute Python file
        writeFileSync(
            join(__dirname, CODE_FOLDER, "testcases.py"),
            a(idea.inputA, idea.inputB, idea.outputA, idea.outputB)
        );

        const proc = execSync(
            "python3 " + join(__dirname, CODE_FOLDER, "test.py")
        );
        const results = proc.toString();

        return res.json(results);
    } catch (error) {
        console.log("An error occurred");
        console.log(error);
        return res.send("An error occurred.");
    }
}

const a = (inputA, InputB, outputA, outputB) => {
    return `
def get_test_cases():
    return {

        # get input
        "SMALL_INPUT": ${inputA},
        "LARGE_INPUT": ${InputB},
    }


def get_expected_outputs():
    return {
        # get output
        "SMALL_INPUT": ${outputA},
        "LARGE_INPUT": ${outputB},
    }
    `;
};
export default router;
