import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VocabItem } from "@/types";

export function VocabCard({ item, onSelect }: { item: VocabItem; onSelect?: (item: VocabItem) => void }) {
	return (
		<Card className="transition hover:border-primary/40" onClick={() => onSelect?.(item)}>
			<CardHeader>
				<CardTitle className="text-lg">{item.word}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-muted-foreground">{item.definition}</p>
				{item.example ? <p className="text-xs italic text-muted-foreground">“{item.example}”</p> : null}
				<div className="flex flex-wrap gap-2">
					{item.tags.map((tag) => (
						<span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
							{tag}
						</span>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
