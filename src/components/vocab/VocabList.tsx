import type { VocabItem } from "@/types";
import { VocabCard } from "./VocabCard";

export function VocabList({ items, onSelect }: { items: VocabItem[]; onSelect?: (item: VocabItem) => void }) {
	return (
		<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
			{items.map((item) => (
				<VocabCard key={item.id} item={item} onSelect={onSelect} />
			))}
		</div>
	);
}
