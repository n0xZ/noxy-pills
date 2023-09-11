import { JSX } from "solid-js";

type Props = {
	children?: JSX.Element;
};
export function FormField(props: Props) {
	return (
		<aside class="flex flex-col space-y-2 justify-center w-full max-w-3xl">
			{props.children}
		</aside>
	);
}
