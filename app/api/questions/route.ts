import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Question from "@/models/Question";

export async function GET() {
    try {
        await dbConnect();
        const questions = await Question.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: questions });
    } catch (error) {
        console.error("API Error (GET):", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { text, authorName } = body;

        if (!text || !authorName) {
            return NextResponse.json({ success: false, message: "Name and text are required" }, { status: 400 });
        }

        const newQuestion = await Question.create({
            text: text.trim(),
            authorName: authorName.trim()
        });

        return NextResponse.json({ success: true, data: newQuestion }, { status: 201 });
    } catch (error) {
        console.error("API Error (POST):", error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
