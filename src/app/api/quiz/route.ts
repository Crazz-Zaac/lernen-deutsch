import { NextResponse } from "next/server";
import { QUIZ_QUESTIONS } from "@/lib/mock-data";

export async function GET() {
	return NextResponse.json(QUIZ_QUESTIONS);
}
