import { notFound } from "next/navigation";
import { GRAMMAR_RULES } from "@/lib/mock-data";

export default async function GrammarRulePage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const rule = GRAMMAR_RULES.find((item) => item.id === id);

	if (!rule) {
		notFound();
	}

	return (
		<div className="min-h-screen bg-background px-6 py-12">
			<div className="mx-auto max-w-3xl space-y-6">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Grammar rule</p>
					<h1 className="text-3xl font-semibold tracking-tight">{rule.title}</h1>
				</div>
				<div className="flex flex-wrap gap-2">
					  {rule.tags.map((tag: string) => (
						<span key={tag} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
							{tag}
						</span>
					))}
				</div>
				<div className="prose max-w-none text-base text-foreground" dangerouslySetInnerHTML={{ __html: rule.body }} />
			</div>
		</div>
	);
}
