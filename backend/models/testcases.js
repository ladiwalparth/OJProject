import mongoose,{Schema} from "mongoose";

const testcaseSchema = new Schema({
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
});

const Testcase = mongoose.model("Testcase",testcaseSchema);

export {Testcase};