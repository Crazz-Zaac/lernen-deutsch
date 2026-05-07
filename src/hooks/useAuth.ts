"use client";

import { useCallback, useState } from "react";
import type { AuthSession } from "@/lib/services/auth.service";
import { getSession, login as loginService, logout as logoutService } from "@/lib/services/auth.service";

export function useAuth() {
	const [session, setSession] = useState<AuthSession | null>(null);
	const [loading, setLoading] = useState(false);

	const hydrate = useCallback(async () => {
		setLoading(true);
		try {
			const current = await getSession();
			setSession(current);
			return current;
		} finally {
			setLoading(false);
		}
	}, []);

	const login = useCallback(async (email: string, password: string) => {
		setLoading(true);
		try {
			const nextSession = await loginService(email, password);
			setSession(nextSession);
			return nextSession;
		} finally {
			setLoading(false);
		}
	}, []);

	const logout = useCallback(async () => {
		setLoading(true);
		try {
			await logoutService();
			setSession(null);
		} finally {
			setLoading(false);
		}
	}, []);

	return { session, loading, login, logout, hydrate };
}
