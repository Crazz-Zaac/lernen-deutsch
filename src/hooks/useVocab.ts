"use client";

import { useEffect, useState } from "react";
import type { VocabItem } from "@/types";
import { fetchVocab } from "@/lib/services/vocab.service";

export function useVocab() {
	const [items, setItems] = useState<VocabItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;
		fetchVocab()
			.then((data) => {
				if (active) setItems(data);
			})
			.finally(() => {
				if (active) setLoading(false);
			});
		return () => {
			active = false;
		};
	}, []);

	return { items, loading, setItems };
}
