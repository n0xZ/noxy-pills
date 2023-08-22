import { JSX, splitProps } from "solid-js";

interface ComponentType extends JSX.LabelHTMLAttributes<HTMLLabelElement> {
  children?: JSX.Element;
}
export function Label(props: ComponentType) {
  const [childrenKey, rest] = splitProps(props, ["children"]);
  return (
    <label
      {...rest}
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {childrenKey.children}
    </label>
  );
}
