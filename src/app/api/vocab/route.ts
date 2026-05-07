import { NextResponse } from "next/server";
import { SAMPLE_VOCAB } from "@/lib/mock-data";

export async function GET() {
	return NextResponse.json(SAMPLE_VOCAB);
}

export async function POST(request: Request) {
	const body = await request.json();
	return NextResponse.json({ id: crypto.randomUUID(), ...body });
}
