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
            secure: false,
            sameSite: "strict",
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
            secure: false,
            sameSite: "strict",
            path: "/"
        });

        return res.status(200).send("cookie cleared successfully");

    } catch (error) {
        return res.status(500).send("some error while logging out");
    }
}

async function handleOutput(req, res) {
    try {
        const responseFromAxios = await axios.post('http://localhost:8400/getOutput', req.body, {
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
    let code, id, user, testcase, problem, newRequestBody;
    try {
        // json from axios in the front end parser to javascript object then again axios call to compiler
        // stringifies it to json.
        ({ code, id } = req.body);
        // to treat it as a expression and not a block statement.

        user = req.user;

        testcase = await Testcase.findOne({ problemCode: id });
        problem = await Problem.findOne({ code: id });
        newRequestBody = {
            language: "cpp",
            testcase,
            code
        }
        // user method temporarily created only for backend.
        const responseFromAxios = await axios.post('http://localhost:8400/getVerdict', newRequestBody, {
            withCredentials: true
        });
        try {
            await Submission.create({
                problem: problem.name,
                verdict: "Accepted",
                submitted_by: user._id
            });
        } catch (error) {
            console.log(error);
        }

        if (responseFromAxios?.status === 200) {
            return (res.status(200).json(responseFromAxios.data));
        }


    } catch (error) {
        if (error.response?.status === 401) {
            await Submission.create({
                problem: problem.name,
                verdict: "Rejected",
                submitted_by: user._id
            })
            return res.status(200).json(error.response.data);
        } else {
            return res.status(500).send('error while sending request from backend to compiler');
        }
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

async function handleGetParticularTestCase(req, res) {
    try {
        const { id } = req.params;
        const testcase = await Testcase.findOne({ problemCode: id });
        return res.status(200).json(testcase);
    } catch (error) {
        return res.status(500).send('Error while fetching testcase');
    }
}

export { handleUserRegister, handleUserEnter, handleLoggedInUser, handleLogOut, handleOutput, handleGetVerdict, seedProblems, seedTestCases, handleGetProblems, handleGetParticularProblem, handleGetParticularTestCase };