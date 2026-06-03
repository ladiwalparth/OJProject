import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema({
  problem: { type: String, required: true },
  problemCode: { type: String },
  verdict: {
    type: String,
    enum: ["Accepted", "Wrong Answer", "Time Limit Exceeded", "Runtime Error", "Compilation Error", "Error"],
  },
  language: { type: String, default: "cpp" },
  code: { type: String },
  submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);
export { Submission };