import mongoose, { Schema, model, models } from "mongoose";

export interface IAnswer {
    _id?: string;
    questionId: mongoose.Types.ObjectId;
    text: string;
    authorName: string;
    createdAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
    questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    text: { type: String, required: true },
    authorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Answer = (models.Answer as mongoose.Model<IAnswer>) ||
    model<IAnswer>("Answer", AnswerSchema);

export default Answer;
