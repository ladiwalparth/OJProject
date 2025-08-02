import mongoose,{Schema} from "mongoose";

const problemSchema = new Schema({
    statement: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    code: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["Easy","Medium","Hard"]
    }
});

const Problem = mongoose.model("Problem",problemSchema);

export {Problem};
