import mongoose, { Schema, model, models } from "mongoose";

export interface IQuestion {
    _id?: string;
    text: string;
    authorName: string;
    createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
    text: { type: String, required: true },
    authorName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const Question = (models.Question as mongoose.Model<IQuestion>) ||
    model<IQuestion>("Question", QuestionSchema);

export default Question;
