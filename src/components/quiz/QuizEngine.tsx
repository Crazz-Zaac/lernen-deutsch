"use client";

import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/lib/mock-data";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";

export function QuizEngine() {
	const [index, setIndex] = useState(0);
	const [selected, setSelected] = useState<string | null>(null);
	const [score, setScore] = useState(0);
	const [done, setDone] = useState(false);

	const question = QUIZ_QUESTIONS[index];
	const total = QUIZ_QUESTIONS.length;

	const choose = (option: string) => {
		if (selected) return;
		setSelected(option);
		if (option === question.correct) setScore((current) => current + 1);
	};

	const next = () => {
		if (index + 1 >= total) {
			setDone(true);
			return;
		}
		setIndex((current) => current + 1);
		setSelected(null);
	};

	const restart = () => {
		setIndex(0);
		setSelected(null);
		setScore(0);
		setDone(false);
	};

	if (!question) return null;
	if (done) {
		return <QuizResults score={score} total={total} onRestart={restart} />;
	}

	return (
		<div className="space-y-8">
			<div className="h-1 w-full overflow-hidden rounded-full bg-muted">
				<div className="h-full bg-primary" style={{ width: `${(index / total) * 100}%` }} />
			</div>
			<QuizQuestion question={question} selected={selected} onSelect={choose} />
			{selected && (
				<div className="flex justify-end">
					<button className="text-sm font-medium text-primary" onClick={next}>
						{index + 1 >= total ? "See results" : "Next →"}
					</button>
				</div>
			)}
		</div>
	);
}
