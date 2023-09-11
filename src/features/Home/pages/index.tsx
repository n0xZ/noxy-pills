import { Title } from "@solidjs/meta";
import { createQuery } from "@tanstack/solid-query";
import { useAuth } from "solid-firebase";
import { Match, Switch } from "solid-js";
import { auth } from "~/lib/firebase";
import { getPillsByUserId } from "~/services/pills";
import { PillList } from "../components/pills/list";

export default function Home() {
	const { data } = useAuth(auth);
	const q = createQuery(
		() => ["pillsByUserId"],
		async () => await getPillsByUserId(data?.uid ?? ""),
	);

	return (
		<main class="container mx-auto max-w-5xl border-2 border-light-400 min-h-screen h-full rounded-md mt-5">
			<Title>Pills - Home</Title>
			<h2 class="text-center font-bold text-3xl mt-3 mb-3">
				Lista de pastillas actuales
			</h2>
			<Switch>
				<Match when={q.isLoading}>
					<p>Cargando...</p>
				</Match>
				<Match when={q.isSuccess && q.data}>
					<PillList pills={q.data!} />
				</Match>
			</Switch>
		</main>
	);
}
