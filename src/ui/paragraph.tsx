import { JSX } from "solid-js";

type ComponentType = { children: JSX.Element; class?: string };

export function Paragraph(props: ComponentType) {
  const baseStyles = "leading-7 [&:not(:first-child)]:mt-6 ";
  return <p class={`${baseStyles} ${props.class}`}>{props.children}</p>;
}
