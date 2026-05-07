import { NextResponse } from "next/server";
import { SAMPLE_VOCAB } from "@/lib/mock-data";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const item = SAMPLE_VOCAB.find((entry) => entry.id === id);
	if (!item) {
		return NextResponse.json({ message: "Not found" }, { status: 404 });
	}
	return NextResponse.json(item);
}

export async function DELETE() {
	return NextResponse.json({ ok: true });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const body = await request.json();
	return NextResponse.json({ id, ...body });
}
