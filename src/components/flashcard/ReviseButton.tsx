import { Button } from "@/components/ui/button";

export function ReviseButton({ active, onToggle }: { active: boolean; onToggle: () => void }) {
	return (
		<Button variant={active ? "default" : "outline"} onClick={onToggle}>
			{active ? "★ Saved" : "☆ Revise later"}
		</Button>
	);
}
