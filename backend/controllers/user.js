import { user } from "../models/user.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import { Problem } from "../models/problems.js";
import { Testcase } from "../models/testcases.js";
import { Submission } from "../models/submission.js";
import bcrypt from "bcryptjs";
import { setUser, getUser } from "../service/auth.js"
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

async function handleUserRegister(req, res) {
    try {

        const { fullName, email, password, dob, userId } = req.body;

        const existingUserWithSameEmail = await user.findOne({ email });
        const existingUserWithSameUserId = await user.findOne({ userId });


        if (existingUserWithSameEmail) return res.status(409).send("user already exists with this email");
        if (existingUserWithSameUserId) return res.status(409).send("user already exists with this userId");

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await user.create({
            fullName,
            email,
            password: hashedPassword,
            dob,
            userId
        });
        return res.status(200).send("user registered successfully!");
    } catch (error) {

        return res.status(500).send("some error while registering");
    }
}
async function handleUserEnter(req, res) {
    try {

        const { userId, password } = req.body;

        const existingUserWithSameUserId = await user.findOne({ userId });

        if (!existingUserWithSameUserId) return res.status(409).send("user does not exists!");

        const value = await bcrypt.compare(password, existingUserWithSameUserId.password);

        if (!value) return res.status(409).send("Please enter the correct password");

        const token = setUser({
            id: existingUserWithSameUserId.userId,
            email: existingUserWithSameUserId.email
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,       // must be true on HTTPS in production
            sameSite: "none",   // must be 'none' for cross-site cookies
            path: "/"
        });


        return res.status(200).send("Entered successfully!");
    } catch (error) {

        return res.status(500).send("some error while entering!");
    }
}

async function handleLoggedInUser(req, res) {
    try {
        const token = req.cookies?.token;

        const user = getUser(token);

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).send("Some error occured while checking logged in user");
    }

}

async function handleLogOut(req, res) {
    try {

        res.clearCookie("token", {
            httpOnly: true,
            secure: true,       // must be true on HTTPS in production
            sameSite: "none",   // must be 'none' for cross-site cookies
            path: "/"
        });

        return res.status(200).send("cookie cleared successfully");

    } catch (error) {
        return res.status(500).send("some error while logging out");
    }
}

async function handleOutput(req, res) {
    try {

        const responseFromAxios = await axios.post(`${process.env.COMPILER_URL}/getOutput`, req.body, {
            withCredentials: true
        });
        // note we provide a javascript object in axios which it automatically converts
        // to json.
        return res.status(200).json(responseFromAxios.data);
    } catch (error) {
        if (error.response) {
            return res.status(500).json(error.response);
        } else {
            return res.status(500).send('error while sending request from backend to compiler');
        }
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

    const result = compilerRes.data;          // { verdict, failedCase?, detail? }
    try {
      await Submission.create({
        problem: problem.name,
        problemCode: id,
        verdict: result.verdict || "Error",
        language,
        code,
        submitted_by: fullUser._id,
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
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const problemsLocation = path.join(__dirname, "..", 'problems.json');
        const data = fs.readFileSync(problemsLocation, 'utf-8');
        // console.log(data);
        const problems = JSON.parse(data);

        await Problem.insertMany(problems);
        console.log("Problems seeded successfully!");
    } catch (error) {
        console.error("Error seeding problems:", error);
    }
}

async function seedTestCases() {
    try {
        await Testcase.deleteMany();
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const testCasesLocation = path.join(__dirname, "..", 'testcases.json');
        const data = fs.readFileSync(testCasesLocation, 'utf-8');
        // console.log(data);
        const testCases = JSON.parse(data);

        await Testcase.insertMany(testCases);
        console.log("TestCases seeded successfully!");
    } catch (error) {
        console.error("Error seeding problems:", error);
    }
}

async function handleGetProblems(req, res) {
    try {
        const problems = await Problem.find({});
        // console.log(problems);
        return res.status(200).json(problems);
    } catch (error) {
        return res.status(500).send('Error while fetching Problems');
    }
}

async function handleGetParticularProblem(req, res) {
    try {
        const { id } = req.params;
        const problem = await Problem.findOne({ code: id });
        return res.status(200).json(problem);
    } catch (error) {
        return res.status(500).send('Error while fetching Problem');
    }
}

async function handleGetSubmissions(req, res) {
    try {
        const userWhoSubmitted = req.user;
        const fulluserWhoSubmitted = await user.findOne({ userId: userWhoSubmitted.id });
        const submissions = await Submission.find({ submitted_by: fulluserWhoSubmitted._id });
        return res.status(200).json(submissions);
    } catch (error) {
        return res.status(500).send('Error while fetching Submissions');
    }
}

async function handleGetParticularTestCase(req, res) {
    try {
        const { id } = req.params;
        const testcase = await Testcase.findOne({ problemCode: id });
        return res.status(200).json(testcase);
    } catch (error) {
        return res.status(500).send('Error while fetching testcase');
    }
}

async function handleAIReview(req, res) {

    const { code } = req.body;

    if (code === undefined || code.trim() === '') {
        return res.status(400).json({
            success: false,
            error: "Empty code"
        })
    }

    try {
        // The client gets the API key from the environment variable `GEMINI_API_KEY`.
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `you are a code review expert,
            you are given a code, you need to review it and give a 4-5 line review of the code, each line should contain only 10-15 words, and each line should start with ordered numbering, but please note do not provide direct answer to the user, give only suggestions,
            the code is ${code}`,
        });
        // console.log(response.text);
        res.status(200).json({
            output: response.text
        })

    } catch (error) {
        return res.status(500).send('Error in AI-review');
    }
}

export {
  handleUserRegister, handleUserEnter, handleLoggedInUser, handleLogOut,
  handleOutput, handleGetVerdict, seedProblems, seedTestCases,
  handleGetProblems, handleGetSubmissions, handleGetParticularProblem,
  handleGetParticularTestCase, handleAIReview
};