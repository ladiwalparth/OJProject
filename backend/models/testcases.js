import mongoose,{Schema} from "mongoose";

const testcaseSchema = new Schema({
    problemCode: {
        type: String,
        required: true
    },
    input: {
        type: [String],
        required: true
    },
    output: {
        type: [String],
        required: true
    }
});

const Testcase = mongoose.model("Testcase",testcaseSchema);

export {Testcase};