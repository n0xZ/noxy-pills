import { formateDateToISO } from "~/utils/format-date";
import { PillsOutput } from "~/utils/valibot";

type Props = {
	pill: PillsOutput;
};
export function PillItem(props: Props) {
	const milliseconds =
		props.pill.createdAt.seconds * 1000 +
		props.pill.createdAt.nanoseconds / 1000000;
	const actualDate = new Date(milliseconds);

	return (
		<aside class="flex flex-col justify-center gap-2  p-3 w-full border-b-2 ">
			<h2 class="font-bold">{props.pill.name}</h2>
			<small class="c-gray-500">{props.pill.description}</small>
			<p>Próxima aplicación: {}</p>
		</aside>
	);
}
