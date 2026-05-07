import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { GrammarRule } from "@/types";

export function GrammarCard({ rule, onSelect }: { rule: GrammarRule; onSelect?: (rule: GrammarRule) => void }) {
	return (
		<Card className="transition hover:border-primary/40" onClick={() => onSelect?.(rule)}>
			<CardHeader>
				<CardTitle className="text-lg">{rule.title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<div className="flex flex-wrap gap-2">
					{rule.tags.map((tag) => (
						<span key={tag} className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
							{tag}
						</span>
					))}
				</div>
				<p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: rule.body.slice(0, 120) + "…" }} />
			</CardContent>
		</Card>
	);
}
