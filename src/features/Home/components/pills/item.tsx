import { createMutation, useQueryClient } from "@tanstack/solid-query";

import { Show } from "solid-js";

import { createPillDate } from "~/features/Primitives/pillDate";
import { deletePill } from "~/services/pills";
import { Button } from "~/ui/button";

import { PillsOutput } from "~/utils/valibot";

type Props = {
	pill: PillsOutput;
};

function SpinnerIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			class="h-5 w-5"
		>
			<title>Icono de Spinner</title>
			<path
				fill="currentColor"
				d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
			>
				<animateTransform
					attributeName="transform"
					dur="0.75s"
					repeatCount="indefinite"
					type="rotate"
					values="0 12 12;360 12 12"
				/>
			</path>
		</svg>
	);
}
function DeleteIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 1024 1024"
			class=" h-10 w-10 c-light-50"
		>
			<title>Delete pill icon</title>
			<path
				fill="currentColor"
				d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"
			/>
		</svg>
	);
}
function DeletePill(props: { pilId: string }) {
	const queryClient = useQueryClient();
	const deletePillMut = createMutation(deletePill);

	const deleteSelectedOne = async () => {
		deletePillMut.mutate(props.pilId);
		queryClient.refetchQueries({ queryKey: ["pillsByUserId"] });
	};
	return (
		<Button
			class="h-10 w-10 bg-dark-900 rounded-md  hover:opacity-80"
			type="button"
			title="Eliminar pastilla"
			onClick={deleteSelectedOne}
		>
			<Show when={deletePillMut.isLoading} fallback={<DeleteIcon />}>
				<SpinnerIcon />
			</Show>
		</Button>
	);
}
export function PillItem(props: Props) {
	const { remainingTime, pillDateParsed, pillTime } = createPillDate(
		props.pill.createdAt,
		props.pill.frequency,
	);
	return (
		<article class="flex flex-col justify-center space-y-1  px-3 py-2 w-full border-b-2 ">
			<aside class="flex flex-row items-center justify-between">
				<h2 class="font-bold">
					{props.pill.name} (Cada {props.pill.frequency} horas)
				</h2>
				<DeletePill pilId={props.pill.id ?? ""} />
			</aside>
			<small class="c-gray-500">{props.pill.description}</small>

			<Show when={remainingTime !== 0}>
				<span class="flex xl:flex-row flex-col items-center justify-between ">
					<p>Próxima dosis: En {remainingTime}hs</p>
					<small class="c-gray-500">
						Agregado el día {pillDateParsed} a las {pillTime}hs
					</small>
				</span>
			</Show>
		</article>
	);
}
