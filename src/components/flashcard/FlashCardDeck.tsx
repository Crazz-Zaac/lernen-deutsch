"use client";

import { useState } from "react";
import type { VocabItem } from "@/types";
import { FlashCard } from "./FlashCard";
import { ReviseButton } from "./ReviseButton";

export function FlashCardDeck({ items }: { items: VocabItem[] }) {
	const [index, setIndex] = useState(0);
	const [revise, setRevise] = useState<Set<string>>(new Set());

	const current = items[index % items.length];

	const next = () => setIndex((currentIndex) => (currentIndex + 1) % items.length);
	const prev = () => setIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length);

	if (!current) return null;

	return (
		<div className="flex flex-col items-center gap-6">
			<FlashCard vocab={current} />
			<div className="flex items-center gap-4">
				<button className="text-sm font-medium text-muted-foreground" onClick={prev}>
					← Prev
				</button>
				<ReviseButton
					active={revise.has(current.id)}
					onToggle={() =>
						setRevise((currentSet) => {
							const nextSet = new Set(currentSet);
							nextSet.has(current.id) ? nextSet.delete(current.id) : nextSet.add(current.id);
							return nextSet;
						})
					}
				/>
				<button className="text-sm font-medium text-muted-foreground" onClick={next}>
					Next →
				</button>
			</div>
		</div>
	);
}
