"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { GrammarRule } from "@/types";

export function GrammarForm({ onSubmit }: { onSubmit?: (rule: GrammarRule) => void }) {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [tags, setTags] = useState("");

	const handleSubmit = () => {
		if (!title) return;
		const rule: GrammarRule = {
			id: crypto.randomUUID(),
			title,
			body: body || "<p>Write your rule…</p>",
			tags: tags
				.split(",")
				.map((tag) => tag.trim())
				.filter(Boolean),
		};
		onSubmit?.(rule);
		setTitle("");
		setBody("");
		setTags("");
	};

	return (
		<div className="grid gap-4">
			<div className="grid gap-2">
				<Label htmlFor="rule-title">Rule title</Label>
				<Input id="rule-title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Konjunktiv II" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="rule-body">Rule body (HTML)</Label>
				<Input id="rule-body" value={body} onChange={(event) => setBody(event.target.value)} placeholder="<p>Write the grammar rule…</p>" />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="rule-tags">Tags</Label>
				<Input id="rule-tags" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="mood, subjunctive" />
			</div>
			<Button onClick={handleSubmit}>Save grammar rule</Button>
		</div>
	);
}
