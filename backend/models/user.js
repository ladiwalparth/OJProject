import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},
{ timestamps: true }
);

const user = mongoose.model("user", userSchema);

export {user}
