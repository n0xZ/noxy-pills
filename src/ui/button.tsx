import { JSX } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
}
export function Button(props: Props) {
  return (
    <button
      {...props}
      class="inline-flex items-center p-3 w-full text-black justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      {props.children}
    </button>
  );
}
