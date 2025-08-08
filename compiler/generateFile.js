import fs from 'fs';

import path from 'path';
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';


// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirCodes = path.join(__dirname, "codes");

if(!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, {recursive: true});
}
// whenever user clicks the frontend submit, we have to store that code in a file and also add 
// proper extension to it.
// also for file we should have a unique file name. -> we'll use uuid for that.
const generateFile = (format, content) => {
    const jobID = uuidv4();
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath,content);
    return filePath;
}

export default generateFile;