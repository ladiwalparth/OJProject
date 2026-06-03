import express from 'express';
import cors from 'cors';
import fs from 'fs';
import 'dotenv/config';

import generateFile from './generateFile.js';
import generateInputFile from './generateInputFile.js';
import executeCpp from './executeCpp.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const cleanup = (paths) =>
  paths.forEach((p) => { try { if (p && fs.existsSync(p)) fs.unlinkSync(p); } catch {} });

app.get('/', (req, res) => res.json({ online: 'compiler' }));

// Run with custom input
app.post('/getOutput', async (req, res) => {
  const { language = 'cpp', code, input } = req.body;
  if (code === undefined) return res.status(400).json({ error: 'Empty code!' });
  let filePath, inputfilePath, outPath;
  try {
    filePath = generateFile(language, code);
    inputfilePath = generateInputFile(input || '');
    try {
      const result = await executeCpp(filePath, inputfilePath);
      outPath = result.outPath;
      return res.status(200).json({ output: result.stdout });
    } catch (e) {
      // show the user the compile/runtime/TLE message in the output box
      return res.status(200).json({ output: e.detail || e.message, error: e.type || 'error' });
    }
  } catch (error) {
    return res.status(500).json({ error: String(error) });
  } finally {
    cleanup([filePath, inputfilePath, outPath]);
  }
});

// Submit against hidden test cases
app.post('/getVerdict', async (req, res) => {
  const { language = 'cpp', testcase, code } = req.body;
  if (!code) return res.status(400).json({ verdict: 'Error', detail: 'Empty code!' });

  const inputString = (testcase?.input || []).join('\n');
  let filePath, inputfilePath, outPath;
  try {
    filePath = generateFile(language, code);
    inputfilePath = generateInputFile(inputString);

    let result;
    try {
      result = await executeCpp(filePath, inputfilePath);
    } catch (e) {
      if (e.type === 'CE') return res.status(200).json({ verdict: 'Compilation Error', detail: e.detail });
      if (e.type === 'TLE') return res.status(200).json({ verdict: 'Time Limit Exceeded' });
      if (e.type === 'RE') return res.status(200).json({ verdict: 'Runtime Error', detail: e.detail });
      return res.status(200).json({ verdict: 'Error', detail: String(e.message || e) });
    }
    outPath = result.outPath;

    const expected = testcase?.output || [];
    const actual = result.stdout.trim().split('\n');
    for (let i = 0; i < expected.length; i++) {
      if ((expected[i] ?? '').trim() !== (actual[i] ?? '').trim()) {
        return res.status(200).json({ verdict: 'Wrong Answer', failedCase: i + 1 });
      }
    }
    return res.status(200).json({ verdict: 'Accepted' });
  } catch (error) {
    return res.status(500).json({ verdict: 'Error', detail: String(error) });
  } finally {
    cleanup([filePath, inputfilePath, outPath]);
  }
});

const PORT = process.env.PORT || 8400;
app.listen(PORT, () => console.log(`Compiler listening on port ${PORT}!`));