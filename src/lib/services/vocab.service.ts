import { ID, Query, Models } from "appwrite";
import type { VocabItem } from "@/types";
import { getDatabases } from "@/lib/appwrite/client";
import { APPWRITE_CONFIG } from "@/lib/appwrite/config";

type VocabDoc = Models.Document & {
	$id: string;
	word: string;
	definition: string;
	example?: string;
	tags?: string[];
};

const { databaseId, collections } = APPWRITE_CONFIG;

const mapDocToItem = (doc: VocabDoc): VocabItem => ({
	id: doc.$id,
	word: doc.word,
	definition: doc.definition,
	example: doc.example ?? "",
	tags: doc.tags ?? [],
});

export async function fetchVocab(): Promise<VocabItem[]> {
	const databases = getDatabases();
	const response = await databases.listDocuments<VocabDoc>(
		databaseId,
		collections.vocab,
		[Query.orderDesc("$createdAt")]
	);
	return response.documents.map(mapDocToItem);
}

export async function fetchVocabById(id: string): Promise<VocabItem | null> {
	try {
		const databases = getDatabases();
		const doc = await databases.getDocument<VocabDoc>(databaseId, collections.vocab, id);
		return mapDocToItem(doc);
	} catch {
		return null;
	}
}

export async function createVocab(item: Omit<VocabItem, "id">): Promise<VocabItem> {
	const databases = getDatabases();
	const doc = await databases.createDocument<VocabDoc>(
		databaseId,
		collections.vocab,
		ID.unique(),
		{
			word: item.word,
			definition: item.definition,
			example: item.example ?? "",
			tags: item.tags,
		}
	);
	return mapDocToItem(doc);
}

export async function updateVocab(id: string, item: Omit<VocabItem, "id">): Promise<VocabItem> {
	const databases = getDatabases();
	const doc = await databases.updateDocument<VocabDoc>(
		databaseId,
		collections.vocab,
		id,
		{
			word: item.word,
			definition: item.definition,
			example: item.example ?? "",
			tags: item.tags,
		}
	);
	return mapDocToItem(doc);
}

export async function deleteVocab(id: string): Promise<void> {
	const databases = getDatabases();
	await databases.deleteDocument(databaseId, collections.vocab, id);
}
