import { Button } from "@/components/ui/button";

export function QuizResults({ score, total, onRestart }: { score: number; total: number; onRestart: () => void }) {
	const message = score >= total * 0.8 ? "Ausgezeichnet!" : score >= total * 0.5 ? "Gut gemacht!" : "Üb weiter!";

	return (
		<div className="rounded-2xl border bg-card p-10 text-center">
			<p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Quiz complete</p>
			<div className="mt-4 text-5xl font-semibold">
				{score}/{total}
			</div>
			<p className="mt-3 text-sm text-muted-foreground">{message}</p>
			<Button className="mt-6" onClick={onRestart}>
				Try again
			</Button>
		</div>
	);
}
