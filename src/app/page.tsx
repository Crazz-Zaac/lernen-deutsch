import { redirect } from "next/navigation";

export default function HomePage() {
	// Server-side redirect to learner view as the homepage
	redirect("/learn");
}
