import { user } from "../models/user.js"

async function handleUserRegister(req, res){
    try {
        console.log(req.body);
        const {fullName, email, password, dob, userId} = req.body;
        
        const existingUser = await user.findOne({email});

        if(existingUser) return res.status(409).send("user already exists with this email");

        await user.create({
            fullName,
            email,
            password,
            dob,
            userId
        });
        return res.status(200).send("user registered successfully!");
    } catch (error) {
        console.log("error -> ", error);
        return res.status(500).send("some error while registering");
    }
}

export default handleUserRegister;