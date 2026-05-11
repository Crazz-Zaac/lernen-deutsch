import { ID, Query, Models } from "appwrite";
import type { GrammarRule } from "@/types";
import { getDatabases } from "@/lib/appwrite/client";
import { APPWRITE_CONFIG } from "@/lib/appwrite/config";

type GrammarDoc = Models.Document & {
	$id: string;
	title: string;
	body: string;
	tags?: string[];
};

const { databaseId, collections } = APPWRITE_CONFIG;

const mapDocToRule = (doc: GrammarDoc): GrammarRule => ({
	id: doc.$id,
	title: doc.title,
	body: doc.body,
	tags: doc.tags ?? [],
});

export async function fetchGrammar(): Promise<GrammarRule[]> {
	const databases = getDatabases();
	const response = await databases.listDocuments<GrammarDoc>(
		databaseId,
		collections.grammar,
		[Query.orderDesc("$createdAt")]
	);
	return response.documents.map(mapDocToRule);
}

export async function fetchGrammarById(id: string): Promise<GrammarRule | null> {
	try {
		const databases = getDatabases();
		const doc = await databases.getDocument<GrammarDoc>(databaseId, collections.grammar, id);
		return mapDocToRule(doc);
	} catch {
		return null;
	}
}

export async function createGrammar(rule: Omit<GrammarRule, "id">): Promise<GrammarRule> {
	const databases = getDatabases();
	const doc = await databases.createDocument<GrammarDoc>(
		databaseId,
		collections.grammar,
		ID.unique(),
		{
			title: rule.title,
			body: rule.body,
			tags: rule.tags,
		}
	);
	return mapDocToRule(doc);
}

export async function updateGrammar(id: string, rule: Omit<GrammarRule, "id">): Promise<GrammarRule> {
	const databases = getDatabases();
	const doc = await databases.updateDocument<GrammarDoc>(
		databaseId,
		collections.grammar,
		id,
		{
			title: rule.title,
			body: rule.body,
			tags: rule.tags,
		}
	);
	return mapDocToRule(doc);
}

export async function deleteGrammar(id: string): Promise<void> {
	const databases = getDatabases();
	await databases.deleteDocument(databaseId, collections.grammar, id);
}
