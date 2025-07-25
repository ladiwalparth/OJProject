import { user } from "../models/user.js"

async function handleUserRegister(req, res){
    try {
        
        const {fullName, email, password, dob, userId} = req.body;
        
        const existingUserWithSameEmail = await user.findOne({email});
        const existingUserWithSameUserId = await user.findOne({userId});
        

        if(existingUserWithSameEmail) return res.status(409).send("user already exists with this email");
        if(existingUserWithSameUserId) return res.status(409).send("user already exists with this userId");

        await user.create({
            fullName,
            email,
            password,
            dob,
            userId
        });
        return res.status(200).send("user registered successfully!");
    } catch (error) {
        
        return res.status(500).send("some error while registering");
    }
}

export default handleUserRegister;