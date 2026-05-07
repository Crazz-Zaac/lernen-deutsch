"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { VocabItem } from "@/types";

export function VocabForm({ onSubmit }: { onSubmit?: (item: VocabItem) => void }) {
	const [word, setWord] = useState("");
	const [definition, setDefinition] = useState("");
	const [example, setExample] = useState("");
	const [tags, setTags] = useState("");

	const handleSubmit = () => {
		if (!word || !definition) return;
		const item: VocabItem = {
			id: crypto.randomUUID(),
			word,
			definition,
			example: example || undefined,
			tags: tags
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean),
		};
		onSubmit?.(item);
		setWord("");
		setDefinition("");
		setExample("");
		setTags("");
	};

	return (
		<div className="grid gap-4">
			<div className="grid gap-2">
				<Label htmlFor="word">German word</Label>
				<Input id="word" value={word} onChange={(event) => setWord(event.target.value)} placeholder="die Erfahrung" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="definition">Definition</Label>
				<Input id="definition" value={definition} onChange={(event) => setDefinition(event.target.value)} placeholder="experience" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="example">Example</Label>
				<Input id="example" value={example} onChange={(event) => setExample(event.target.value)} placeholder="Das war eine wichtige Erfahrung." />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="tags">Tags</Label>
				<Input id="tags" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="nouns, abstract" />
			</div>
			<Button onClick={handleSubmit}>Save vocabulary</Button>
		</div>
	);
}
