import mongoose,{Schema} from "mongoose";

const submissionSchema = new Schema({
    problem:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    },
    verdict:{
        type: String,
        enum: ["Accepted, Rejected"]
    },
    submitted_at:{
        type: Date,
        default: Date.now 
    },
    submitted_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    code: {
        type: String,
        required: true
    }
});

const Submission = mongoose.model("Submission",submissionSchema);

export {Submission};