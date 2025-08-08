import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {v4 as uuidv4} from 'uuid';

// simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirInputs = path.join(__dirname,"inputs");

if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs,{
        recursive: true
    });
}

const generateInputFile = (content) => {
    const jobID = uuidv4();
    const filename = `${jobID}.txt`;
    const inputfilePath = path.join(dirInputs,filename);
    fs.writeFileSync(inputfilePath,content);
    return inputfilePath;
}

export default generateInputFile;