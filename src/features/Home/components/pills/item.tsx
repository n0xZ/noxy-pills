import { createMutation, useQueryClient } from "@tanstack/solid-query";

import { Show } from "solid-js";

import { createPillRemainingTime } from "~/features/Primitives/pillRemainingTime";
import { deletePill } from "~/services/pills";
import { Button } from "~/ui/button";

import { PillsOutput } from "~/utils/valibot";

type Props = {
	pill: PillsOutput;
};

function DeletePill(props: { pilId: string }) {
	const queryClient = useQueryClient();
	const deletePillMut = createMutation(deletePill);

	const deleteSelectedOne = async () => {
		deletePillMut.mutate(props.pilId);
		queryClient.refetchQueries({ queryKey: ["pillsByUserId"] });
	};
	return (
		<Button
			class=" h-5 w-5 hover:opacity-60"
			type="button"
			onClick={deleteSelectedOne}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32"
				height="32"
				viewBox="0 0 1024 1024"
				class="h-5 w-5"
			>
				<title>Delete pill icon</title>
				<path
					fill="currentColor"
					d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"
				/>
			</svg>
		</Button>
	);
}
export function PillItem(props: Props) {
	const { remaining } = createPillRemainingTime(
		props.pill.createdAt,
		props.pill.frequency,
	);
	return (
		<article class="flex flex-col justify-center gap-2  p-3 w-full border-b-2 ">
			<aside class="flex flex-row items-center justify-between">
				<h2 class="font-bold">
					{props.pill.name} (Cada {props.pill.frequency} horas)
				</h2>
				<DeletePill pilId={props.pill.id} />
			</aside>
			<small class="c-gray-500">{props.pill.description}</small>
			<Show when={remaining !== 0}>
				<p>Próxima aplicación: En {remaining}hs</p>
			</Show>
		</article>
	);
}
