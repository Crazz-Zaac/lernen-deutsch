import type { GrammarRule } from "@/types";

export async function fetchGrammar(): Promise<GrammarRule[]> {
	const response = await fetch("/api/grammar");
	if (!response.ok) throw new Error("Failed to load grammar");
	return response.json();
}

export async function fetchGrammarById(id: string): Promise<GrammarRule | null> {
	const response = await fetch(`/api/grammar/${id}`);
	if (!response.ok) return null;
	return response.json();
}

export async function createGrammar(rule: Omit<GrammarRule, "id">): Promise<GrammarRule> {
	const response = await fetch("/api/grammar", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(rule),
	});
	if (!response.ok) throw new Error("Failed to create grammar rule");
	return response.json();
}
