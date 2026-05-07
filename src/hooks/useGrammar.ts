"use client";

import { useEffect, useState } from "react";
import type { GrammarRule } from "@/types";
import { fetchGrammar } from "@/lib/services/grammar.service";

export function useGrammar() {
	const [rules, setRules] = useState<GrammarRule[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;
		fetchGrammar()
			.then((data) => {
				if (active) setRules(data);
			})
			.finally(() => {
				if (active) setLoading(false);
			});
		return () => {
			active = false;
		};
	}, []);

	return { rules, loading, setRules };
}
