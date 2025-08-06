import express from 'express'
import cors from 'cors'
import fs from 'fs'


import generateFile from './generateFile.js'
import generateInputFile from './generateInputFile.js'
import executeCpp from './executeCpp.js'


const app = express();


//middlewares
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ online: 'compiler' });
});

app.post("/getOutput", async (req, res) => {

    const { language = 'cpp', code, input } = req.body;
    let filePath, inputfilePath, output, outpath;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        filePath = generateFile(language, code);
        inputfilePath = generateInputFile(input);
        const result = await executeCpp(filePath, inputfilePath);
        output = result.stdout;
        outpath = result.outPath;

        res.status(200).json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error });
    } finally {
        try {
            if (filePath && fs.existsSync(filePath)) fs.unlinkSync(filePath);
            if (inputfilePath && fs.existsSync(inputfilePath)) fs.unlinkSync(inputfilePath);
            if (outpath && fs.existsSync(outpath)) fs.unlinkSync(outpath);
        } catch (cleanupErr) {
            console.error("Error cleaning up files:", cleanupErr);
        }
    }
});

app.post("/getVerdict", async (req, res) => {
    const { language, testcase, code } = req.body;
    const inputString = testcase.input.join('\n');
    // generate input file expects inputs as one string with each test case on new line.
    let filePath, inputfilePath, output, outpath;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        filePath = generateFile(language, code);
        inputfilePath = generateInputFile(inputString);
        const result = await executeCpp(filePath, inputfilePath);
        output = result.stdout;
        outpath = result.outPath;

        const expectedOutputs = testcase.output;
        const actualOutputs = output.trim().split('\n');

        expectedOutputs.forEach((expected, index) => {
            const actual = actualOutputs[index] || '[no output]';
            if (expected.trim() === actual.trim()) {
                console.log(`Test Case ${index + 1}: passed`);
            } else {
                console.log(`Test Case ${index + 1}: Failed`);
            }
        });

    } catch (error) {

    }

})

const PORT = 8400;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});