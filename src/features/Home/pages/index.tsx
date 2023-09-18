import { Match, Switch } from "solid-js";
import { Title } from "@solidjs/meta";
import { createQuery } from "@tanstack/solid-query";
import { useAuth } from "solid-firebase";
import { auth } from "~/lib/firebase";
import { getPillsByUserId } from "~/services/pills";
import { PillList } from "../components/pills/list";
import { PillSkeletonList } from "../components/pills/skeleton";

export default function Home() {
	const { data } = useAuth(auth);
	const q = createQuery(
		() => ["pillsByUserId"],
		async () => await getPillsByUserId(data?.uid ?? ""),
		{ networkMode: "offlineFirst", cacheTime: 1000 * 60 * 60 * 24 },
	);

	return (
		<section class="max-w-3xl  container mx-auto border-2 min-h-screen bg-light-100 h-full w-full  rounded-sm  ">
			<Title>Pills - Home</Title>
			<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center text-center pt-4">
				Lista de pastillas actuales
			</h2>
			<Switch>
				<Match when={q.isLoading}>
					<PillSkeletonList />
				</Match>
				<Match when={q.isSuccess && q.data && q.data.length !== 0}>
					<PillList pills={q.data ?? []} />
				</Match>
			</Switch>
		</section>
	);
}
