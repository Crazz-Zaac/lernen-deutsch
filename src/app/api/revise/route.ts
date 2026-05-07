import { NextResponse } from "next/server";
import { SAMPLE_VOCAB } from "@/lib/mock-data";

export async function GET() {
	const items = SAMPLE_VOCAB.slice(0, 3).map((entry) => ({
		id: entry.id,
		type: "vocab" as const,
		title: entry.word,
		subtitle: entry.definition,
	}));
	return NextResponse.json(items);
}
