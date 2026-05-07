import type { ReviseItem } from "@/types";

export async function fetchReviseItems(): Promise<ReviseItem[]> {
	const response = await fetch("/api/revise");
	if (!response.ok) throw new Error("Failed to load revise items");
	return response.json();
}

export async function removeReviseItem(id: string): Promise<void> {
	await fetch(`/api/revise/${id}`, { method: "DELETE" });
}
