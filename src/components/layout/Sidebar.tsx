import Link from "next/link";

export type SidebarItem = {
	href: string;
	label: string;
};

export function Sidebar({ title, subtitle, items }: { title: string; subtitle?: string; items: SidebarItem[] }) {
	return (
		<aside className="flex h-full w-60 flex-col border-r bg-card px-4 py-6">
			<div className="mb-6">
				<div className="text-lg font-semibold">{title}</div>
				{subtitle ? <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{subtitle}</div> : null}
			</div>
			<nav className="flex flex-1 flex-col gap-2">
				{items.map((item) => (
					<Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
						{item.label}
					</Link>
				))}
			</nav>
		</aside>
	);
}
