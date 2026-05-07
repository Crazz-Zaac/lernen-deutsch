import { account } from "@/lib/appwrite/client";
import { ID } from "appwrite";

export type AuthSession = {
	userId: string;
	email: string;
};

export async function login(email: string, password: string): Promise<AuthSession> {
	if (!email || !password) throw new Error("Missing credentials");
	try {
		await account.get();
		await account.deleteSession("current");
	} catch {
		// No active session, continue.
	}
	await account.createEmailPasswordSession(email, password);
	const user = await account.get();
	return { userId: user.$id, email: user.email };
}

export async function logout(): Promise<void> {
	await account.deleteSession("current");
}

export async function getSession(): Promise<AuthSession | null> {
	try {
		const user = await account.get();
		return { userId: user.$id, email: user.email };
	} catch {
		return null;
	}
}

export async function register(email: string, password: string, name?: string): Promise<AuthSession> {
	const user = await account.create(ID.unique(), email, password, name);
	return { userId: user.$id, email: user.email };
}
