import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-background px-6 py-12">
			<div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
				<header className="space-y-3">
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">Deutsch B1</p>
					<h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Choose your workspace</h1>
					<p className="max-w-2xl text-base text-muted-foreground">
						Jump into the learner experience or open the admin dashboard to curate vocabulary and grammar.
					</p>
				</header>

				<div className="grid gap-6 md:grid-cols-2">
					<Card className="border-muted-foreground/10">
						<CardHeader>
							<CardTitle>Learning App</CardTitle>
							<CardDescription>Flashcards, quizzes, grammar, and revise lists.</CardDescription>
						</CardHeader>
						<CardContent>
							<Button asChild className="w-full sm:w-auto">
								<Link href="/learn">Open learner view</Link>
							</Button>
						</CardContent>
					</Card>

					<Card className="border-muted-foreground/10">
						<CardHeader>
							<CardTitle>Admin Dashboard</CardTitle>
							<CardDescription>Manage vocabulary, grammar rules, and bulk uploads.</CardDescription>
						</CardHeader>
						<CardContent>
							<Button asChild variant="outline" className="w-full sm:w-auto">
								<Link href="/admin">Open admin panel</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
	);
}
