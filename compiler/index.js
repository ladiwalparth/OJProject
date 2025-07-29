import express from 'express'
import cors from 'cors'


import generateFile from './generateFile.js'
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
    
    
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = generateFile(language, code);
        const output = await executeCpp(filePath);
        res.status(200).json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

const PORT = 8400;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});