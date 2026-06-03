import { user } from "../models/user.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import { Problem } from "../models/problems.js";
import { Testcase } from "../models/testcases.js";
import { Submission } from "../models/submission.js";
import bcrypt from "bcryptjs";
import { setUser, getUser } from "../service/auth.js";
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';


async function handleUserRegister(req, res) {
  try {
    const { fullName, email, password, dob, userId } = req.body;
    if (await user.findOne({ email })) return res.status(409).send("user already exists with this email");
    if (await user.findOne({ userId })) return res.status(409).send("user already exists with this userId");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await user.create({ fullName, email, password: hashedPassword, dob, userId });
    return res.status(200).send("user registered successfully!");
  } catch (error) {
    return res.status(500).send("some error while registering");
  }
}

async function handleUserEnter(req, res) {
  try {
    const { userId, password } = req.body;
    const existingUser = await user.findOne({ userId });
    if (!existingUser) return res.status(409).send("user does not exists!");
    const ok = await bcrypt.compare(password, existingUser.password);
    if (!ok) return res.status(409).send("Please enter the correct password");
    const token = setUser({ id: existingUser.userId, email: existingUser.email });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none", path: "/" });
    return res.status(200).send("Entered successfully!");
  } catch (error) {
    return res.status(500).send("some error while entering!");
  }
}

async function handleLoggedInUser(req, res) {
  try {
    const token = req.cookies?.token;
    return res.status(200).json({ user: getUser(token) });
  } catch (error) {
    return res.status(500).send("Some error occured while checking logged in user");
  }
}

async function handleLogOut(req, res) {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none", path: "/" });
    return res.status(200).send("cookie cleared successfully");
  } catch (error) {
    return res.status(500).send("some error while logging out");
  }
}

async function handleOutput(req, res) {
  try {
    const r = await axios.post(`${process.env.COMPILER_URL}/getOutput`, req.body, { withCredentials: true });
    return res.status(200).json(r.data);
  } catch (error) {
    return res.status(500).send('error while sending request from backend to compiler');
  }
}

async function handleGetVerdict(req, res) {
  try {
    const { code, id, language = "cpp" } = req.body;
    const userWhoSubmitted = req.user;
    const testcase = await Testcase.findOne({ problemCode: id });
    const problem = await Problem.findOne({ code: id });
    const fullUser = await user.findOne({ userId: userWhoSubmitted.id });
    if (!testcase || !problem) return res.status(404).json({ verdict: "Error", detail: "Problem not found" });

    const compilerRes = await axios.post(
      `${process.env.COMPILER_URL}/getVerdict`,
      { language, testcase, code },
      { withCredentials: true }
    );
    const result = compilerRes.data; // { verdict, failedCase?, detail? }

    try {
      await Submission.create({
        problem: problem.name, problemCode: id,
        verdict: result.verdict || "Error",
        language, code, submitted_by: fullUser._id,
      });
    } catch (e) { console.log("submission save error:", e); }

    return res.status(200).json(result);
  } catch (error) {
    console.log(error?.response?.data || error.message);
    return res.status(500).json({ verdict: "Error", detail: "Error contacting compiler" });
  }
}

async function seedProblems() {
  try {
    await Problem.deleteMany();
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const data = fs.readFileSync(path.join(__dirname, "..", 'problems.json'), 'utf-8');
    await Problem.insertMany(JSON.parse(data));
    console.log("Problems seeded successfully!");
  } catch (error) {
    console.error("Error seeding problems:", error);
  }
}

async function seedTestCases() {
  try {
    await Testcase.deleteMany();
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const data = fs.readFileSync(path.join(__dirname, "..", 'testcases.json'), 'utf-8');
    await Testcase.insertMany(JSON.parse(data));
    console.log("TestCases seeded successfully!");
  } catch (error) {
    console.error("Error seeding testcases:", error);
  }
}

async function handleGetProblems(req, res) {
  try {
    return res.status(200).json(await Problem.find({}));
  } catch (error) {
    return res.status(500).send('Error while fetching Problems');
  }
}

async function handleGetParticularProblem(req, res) {
  try {
    return res.status(200).json(await Problem.findOne({ code: req.params.id }));
  } catch (error) {
    return res.status(500).send('Error while fetching Problem');
  }
}

async function handleGetSubmissions(req, res) {
  try {
    const fullUser = await user.findOne({ userId: req.user.id });
    return res.status(200).json(await Submission.find({ submitted_by: fullUser._id }).sort({ createdAt: -1 }));
  } catch (error) {
    return res.status(500).send('Error while fetching Submissions');
  }
}

async function handleGetParticularTestCase(req, res) {
  try {
    return res.status(200).json(await Testcase.findOne({ problemCode: req.params.id }));
  } catch (error) {
    return res.status(500).send('Error while fetching testcase');
  }
}

async function handleAIReview(req, res) {
  const { code } = req.body;
  if (!code || code.trim() === '') {
    return res.status(400).json({ success: false, error: "Empty code" });
  }
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are a code-review expert. Give a short 4-5 line review of this code, each line 10-15 words, numbered, with suggestions only — do NOT give the full solution. Code: ${code}`,
    });
    return res.status(200).json({ output: response.text });
  } catch (error) {
  console.log("AI error:", error?.message);
  return res.status(500).json({ output: 'AI error: ' + (error?.message || 'unknown') });
}
}

async function handleExplainError(req, res) {
  const { code, detail } = req.body;
  if (!detail || detail.trim() === '') {
    return res.status(400).json({ output: "No error to explain — submit something that fails to compile or crashes first." });
  }
  try {
    const prompt = `A student's C++ submission produced this compiler/runtime error.

ERROR:
${detail}

THEIR CODE:
${code}

Explain in markdown as 2-4 short numbered points:
1. What this error means in plain English.
2. The most likely line or cause in their code.
3. How to fix it conceptually.
Do NOT rewrite the full corrected program — point them to the fix.`;

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return res.status(200).json({ output: response.text });
  } catch (error) {
    console.log("explain error:", error?.message);
    return res.status(500).json({ output: 'AI error: ' + (error?.message || 'unknown') });
  }
}

export {
  handleUserRegister, handleUserEnter, handleLoggedInUser, handleLogOut,
  handleOutput, handleGetVerdict, seedProblems, seedTestCases,
  handleGetProblems, handleGetSubmissions, handleGetParticularProblem,
  handleGetParticularTestCase, handleAIReview, handleComplexityAnalysis,
  handleExplainError
}