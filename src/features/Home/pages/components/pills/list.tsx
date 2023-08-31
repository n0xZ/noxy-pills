import { For } from "solid-js";
import { PillItem } from "./item";
import { PillsOutput } from "~/utils/valibot";

type Props = {
	pills: PillsOutput[];
};
export function PillList(props: Props) {
	return (
		<article class="grid grid-rows-3 container mx-auto max-w-4xl gap-5 mt-3">
			<For each={props.pills}>{(p) => <PillItem pill={p} />}</For>
		</article>
	);
}
