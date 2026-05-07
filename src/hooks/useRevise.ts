"use client";

import { useEffect, useState } from "react";
import type { ReviseItem } from "@/types";
import { fetchReviseItems } from "@/lib/services/revise.service";

export function useRevise() {
	const [items, setItems] = useState<ReviseItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;
		fetchReviseItems()
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
