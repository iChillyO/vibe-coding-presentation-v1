import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Answer from "@/models/Answer";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const answers = await Answer.find({ questionId: params.id }).sort({ createdAt: 1 });
        return NextResponse.json({ success: true, data: answers });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const body = await request.json();
        const { text, authorName } = body;

        if (!text || !authorName) {
            return NextResponse.json({ success: false, message: "Name and text are required" }, { status: 400 });
        }

        const newAnswer = await Answer.create({
            questionId: params.id,
            text: text.trim(),
            authorName: authorName.trim(),
        });

        return NextResponse.json({ success: true, data: newAnswer }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}

