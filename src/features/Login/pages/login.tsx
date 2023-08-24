import { Title } from "@solidjs/meta";
import { Link, useNavigate } from "@solidjs/router";
import { Show, createSignal } from "solid-js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ValiError, safeParse } from "valibot";
import { Button } from "~/ui/button";
import { FormField } from "~/ui/form/field";
import { Input } from "~/ui/form/input";
import { Label } from "~/ui/form/label";
import { auth } from "~/lib/firebase";
import { credentialsSchema } from "~/utils/valibot";
import { handleFirebaseErrors } from "~/utils/firebase-errors";

type Errors = {
  authErrors?: string;
  formErrors: ValiError;
};
export default function Login() {
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [errors, setErrors] = createSignal<Errors>({} as Errors);
  const navigate = useNavigate();
  const onSubmit = async (
    e: Event & { submitter: HTMLElement } & {
      currentTarget: HTMLFormElement;
      target: Element;
    }
  ) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const formData = new FormData(e.currentTarget);
      const fields = Object.fromEntries(formData);
      const formResult = safeParse(credentialsSchema, fields);

      console.log(formResult);
      if (!formResult.success) {
        setIsSubmitting(false);
        setErrors({ ...errors(), formErrors: formResult.error });
      } else {
        const { user } = await signInWithEmailAndPassword(
          auth,
          formResult.data.email,
          formResult.data.password
        );

        if (user) navigate("/home");
      }
    } catch (e) {
      setIsSubmitting(false);
      if (e instanceof Error) {
        setErrors({ ...errors(), authErrors: e.message });
      }
    }
  };
  return (
    <main class="h-screen">
      <Title>Solyx - Iniciar sesión</Title>
      <article class="grid place-items-center  w-full h-full">
        <form
          onSubmit={onSubmit}
          class="  xl:p-0 p-3 flex flex-col items-center justify-center items-center w-full   xl:max-w-2xl lg:max-w-lg md:max-w-lg container mx-auto space-y-5  "
        >
          <h2 class="text-center xl:text-3xl text-lg font-bold mb-3">
            Inicia sesión en Pills!
          </h2>
          <FormField>
            <Label>Correo electrónico</Label>
            <Input
              autocomplete="off"
              type="email"
              name="email"
              required
              placeholder="o.gonzalo1232131@miemail.com"
              data-test-id="email-input"
            />
          </FormField>
          <Input
            type="password"
            name="password"
            required
            placeholder="gonzalo12313*"
            data-test-id="password-input"
          />
          <Button
            class={`px-8 py-4 ${
              isSubmitting() ? "bg-emerald-600" : "bg-emerald-500"
            } font-bold w-full  text-light-500 rounded-lg max-w-2xl`}
            type="submit"
            data-test-id="submit-login"
            disabled={isSubmitting()}
          >
            {isSubmitting() ? "Iniciando..." : "Iniciar sesión"}
          </Button>

          <span class="h-6 text-red-500" data-test-id="auth-errors">
            <Show when={errors().authErrors}>
              {handleFirebaseErrors(errors().authErrors)}
            </Show>
          </span>

          <Link href="/register" class="text-center underline">
            No tengo una cuenta
          </Link>
        </form>
      </article>
    </main>
  );
}
