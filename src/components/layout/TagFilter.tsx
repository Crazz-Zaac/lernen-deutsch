export function TagFilter({ tags, active, onChange }: { tags: string[]; active: string; onChange: (tag: string) => void }) {
	return (
		<div className="flex flex-wrap gap-2">
			{tags.map((tag) => (
				<button
					key={tag}
					onClick={() => onChange(tag)}
					className={`rounded-full border px-3 py-1 text-xs font-medium ${active === tag ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}
				>
					{tag}
				</button>
			))}
		</div>
	);
}
