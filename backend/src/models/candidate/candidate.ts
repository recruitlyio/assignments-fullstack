import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Candidate Name is required."],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required."],
      trim: true,
    },
    jobId: {
      type: String,
      required: [true, "Job Id is required."],
      trim: true,
    },
    exprerienceYears: {
      type: Number,
      required: [true, "Candidate experience is required."],
      min: [0, "Invalid Candidate Experience."],
    },
    experienceMonths: {
      type: Number,
      required: [true, "Candidate experience is required."],
      min: [0, "Invalid Candidate Experience."],
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is mandatory."],
      trim: true,
    },
  },
  {
    strict: true,
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.isDeleted;
      },
    },
  }
);

export const Candidate = mongoose.model("Candidate", candidateSchema);
