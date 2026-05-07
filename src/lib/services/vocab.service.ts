import type { VocabItem } from "@/types";

export async function fetchVocab(): Promise<VocabItem[]> {
	const response = await fetch("/api/vocab");
	if (!response.ok) throw new Error("Failed to load vocab");
	return response.json();
}

export async function fetchVocabById(id: string): Promise<VocabItem | null> {
	const response = await fetch(`/api/vocab/${id}`);
	if (!response.ok) return null;
	return response.json();
}

export async function createVocab(item: Omit<VocabItem, "id">): Promise<VocabItem> {
	const response = await fetch("/api/vocab", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});
	if (!response.ok) throw new Error("Failed to create vocab");
	return response.json();
}
