import { exec } from 'node:child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filePath);

const outputPath = path.join(__dirname,'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {
        recursive: true
    })
}

const executeCpp = async (filePath,inputfilePath) => {
    const jobId = path.basename(filePath).split('.')[0];
    const outPath = path.join(outputPath,`${jobId}.out`);
    // execute function takes 2 argument one is command which is compulsory and other is callback
    // which is optional
    return new Promise((resolve, reject)=>{
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputfilePath}`,(error, stdout, stderr) => {
            if(error){
                console.log(error);
                reject({error, stderr});
                // it makes a javascript object of error, stderr which we can use in the try catch block.
                // error is the nodejs error object, not able to run any command
                // stderr error we get on compilation like missing a semicolon etc.
            }
            if(stderr){
                reject(stderr);
            }
            resolve({stdout,outPath});
        });
    });
}; 
// async function usage() {
//     try {
//         await = executeCpp(filePath);
//     } catch (error) {
//         console.log(error);
//         // here error will be logged as a object with keys error and stderr
//     }
// }
export default executeCpp;

// executeCpp compiler the file and stored the binary file outPath in the outputs folder.