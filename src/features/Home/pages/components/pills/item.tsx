import { Show } from "solid-js";
import { defineRemainingTime } from "~/utils/remaining-time";
import { PillsOutput } from "~/utils/valibot";

type Props = {
	pill: PillsOutput;
};
export function PillItem(props: Props) {
	const milliseconds =
		props.pill.createdAt.seconds * 1000 +
		props.pill.createdAt.nanoseconds / 1000000;
	const pillDate = new Date(milliseconds);
	const actualDate = new Date();
	const nextDose = (pillDate.getHours() + props.pill.frequency) % 24;
	const actualHour = actualDate.getHours();
	const remaining = defineRemainingTime(actualHour, nextDose);
	return (
		<aside class="flex flex-col justify-center gap-2  p-3 w-full border-b-2 ">
			<h2 class="font-bold">
				{props.pill.name} (Cada {props.pill.frequency} horas)
			</h2>
			<small class="c-gray-500">{props.pill.description}</small>
			<Show when={remaining !== 0}>
				<p>Próxima aplicación: En {remaining}hs</p>
			</Show>
		</aside>
	);
}
