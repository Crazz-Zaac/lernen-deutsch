import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-background px-4 py-8 sm:px-6 sm:py-12">
			<div className="mx-auto w-full max-w-md">{children}</div>
		</div>
	);
}
