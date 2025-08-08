import mongoose,{Schema} from "mongoose";

const submissionSchema = new Schema({
    problem:{
        type: String,
        required: true
    },
    verdict:{
        type: String,
        enum: ["Accepted","Rejected"]
    },
    submitted_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
},{timestamps: true});

const Submission = mongoose.model("Submission",submissionSchema);

export {Submission};