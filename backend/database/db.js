import mongoose from "mongoose";
import 'dotenv/config';
async function connectionDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connection est successfully");
    } catch (error) {
        console.log("Error while connecting to MONGODB ", error);
    }
}

export {connectionDB};