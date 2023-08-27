import { JSX, splitProps } from "solid-js";

interface Props extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  children: JSX.Element | string;
}
export function Button(props: Props) {
  const [splittedProps, rest] = splitProps(props, ["class", "disabled"]);
  const baseStyles =
    "inline-flex items-center p-3 w-full  justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  return (
    <button
      disabled={splittedProps.disabled}
      {...rest}
      class={`${baseStyles} ${splittedProps.class}`}
    >
      {props.children}
    </button>
  );
}
