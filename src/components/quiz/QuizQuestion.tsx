import { Button } from "@/components/ui/button";

export type QuizQuestionData = {
	id: string;
	word: string;
	options: string[];
	correct: string;
};

export function QuizQuestion({
	question,
	selected,
	onSelect,
}: {
	question: QuizQuestionData;
	selected: string | null;
	onSelect: (option: string) => void;
}) {
	return (
		<div className="space-y-6">
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Translate</p>
				<h2 className="text-3xl font-semibold tracking-tight">{question.word}</h2>
			</div>
			<div className="grid gap-3 md:grid-cols-2">
				{question.options.map((option) => {
					const isCorrect = selected && option === question.correct;
					const isWrong = selected && option === selected && selected !== question.correct;
					return (
						<Button
							key={option}
							variant={isCorrect ? "default" : isWrong ? "destructive" : "outline"}
							className="justify-start"
							onClick={() => onSelect(option)}
							disabled={!!selected}
						>
							{option}
						</Button>
					);
				})}
			</div>
		</div>
	);
}
