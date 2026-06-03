import { exec } from 'node:child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

const TIME_LIMIT_S = 5;
const MEMORY_LIMIT_KB = 262144; // 256 MB

const sh = (cmd, options = {}) =>
  new Promise((resolve) => {
    exec(cmd, options, (error, stdout, stderr) => resolve({ error, stdout, stderr }));
  });

// strip the temp file path out of compiler messages (cleaner + no path leak)
const clean = (text, filePath) => (text || '').split(filePath).join('solution.cpp');

const executeCpp = async (filePath, inputfilePath) => {
  const jobId = path.basename(filePath).split('.')[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  // 1) Compile
  const compile = await sh(`g++ "${filePath}" -o "${outPath}" 2>&1`);
  if (compile.error) {
    const err = new Error('Compilation Error');
    err.type = 'CE';
    err.detail = clean(compile.stdout || 'Compilation failed', filePath);
    throw err;
  }

  // 2) Run with memory + time limits
  const runCmd = `ulimit -v ${MEMORY_LIMIT_KB}; timeout -s KILL ${TIME_LIMIT_S}s "${outPath}" < "${inputfilePath}"`;
  const res = await sh(runCmd, {
    shell: '/bin/sh',
    maxBuffer: 1024 * 1024,
    timeout: (TIME_LIMIT_S + 3) * 1000,
    killSignal: 'SIGKILL',
  });

  if (res.error) {
    const code = res.error.code;
    const sig = res.error.signal;
    // GNU timeout=124, SIGKILL=137, SIGTERM=143, plus Node's own timeout kill
    const timedOut =
      code === 124 || code === 137 || code === 143 ||
      res.error.killed || sig === 'SIGKILL' || sig === 'SIGTERM';
    if (timedOut) {
      const err = new Error('Time Limit Exceeded');
      err.type = 'TLE';
      throw err;
    }
    const err = new Error('Runtime Error'); // segfault, memory-limit kill, etc.
    err.type = 'RE';
    err.detail = clean(res.stderr || `Process exited with code ${code}`, filePath);
    throw err;
  }

  return { stdout: res.stdout, outPath };
};

export default executeCpp;