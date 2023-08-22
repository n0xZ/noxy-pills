import { JSX } from "solid-js";

type Props = {
  children?: JSX.Element;
};
export default function FormField(props: Props) {
  return (
    <aside class="flex flex-col space-y-2 justify-center w-full xl:max-w-2xl lg:max-w-lg md:max-w-lg ">
      {props.children}
    </aside>
  );
}
