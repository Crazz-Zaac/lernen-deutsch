"use client";

import { useState } from "react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
	const router = useRouter();
	const { login, loading, hydrate } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const next = "/admin";
	const hydratedRef = useRef(false);

	useEffect(() => {
		if (hydratedRef.current) return;
		hydratedRef.current = true;
		hydrate().then((session) => {
			if (session) router.push(next);
		});
	}, [hydrate, router]);

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(null);
		try {
			await login(email, password);
			router.push(next);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Login failed");
		}
	};

	return (
		<Card className="border-muted-foreground/10">
			<CardHeader>
				<CardTitle>Welcome back</CardTitle>
				<CardDescription>Sign in to manage your German learning workspace.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<form className="space-y-4" onSubmit={onSubmit}>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@domain.com"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<div className="relative">
							<Input
								id="password"
								type={showPassword ? "text" : "password"}
								placeholder="••••••••"
								value={password}
								onChange={(event) => setPassword(event.target.value)}
								required
							/>
							<button
								type="button"
								aria-label={showPassword ? "Hide password" : "Show password"}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground"
								onClick={() => setShowPassword((current) => !current)}
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</div>
					</div>
					{error ? <p className="text-sm text-destructive">{error}</p> : null}
					<Button className="w-full" type="submit" disabled={loading}>
						{loading ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
