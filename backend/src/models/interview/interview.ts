import { ObjectId } from "../../types/mongoose";
import mongoose, { Schema, model, Types } from "mongoose";

export enum InterviewStatusEnum {
  Init = "init",
  Finished = "finished",
}

const QuestionsAndAnswersSchema = new Schema(
  {
    question: { type: String, required: true },
    answers: { type: String, required: true },
    maxMarks: { type: Number, required: true },
    marksObtained: { type: Number, required: true },
  },
  { _id: false }
);

const InterviewSchema = new Schema(
  {
    candidateId: { type: ObjectId, ref: "Candidate", required: true },
    questionsAndAnswers: {
      type: [QuestionsAndAnswersSchema],
      required: false,
    },
    totalMarks: { type: Number, required: false, default: 0 },
    totalObtainedMarks: { type: Number, required: false, default: 0 },
    status: {
      type: String,
      required: true,
      default: InterviewStatusEnum.Init,
      enum: InterviewStatusEnum,
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

export const Interview = model("Interview", InterviewSchema);
