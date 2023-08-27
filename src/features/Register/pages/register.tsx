import { Title } from "@solidjs/meta";
import { Link } from "@solidjs/router";
import { Show } from "solid-js";

import { Button } from "~/ui/button";
import { FormField } from "~/ui/form/field";
import { Input } from "~/ui/form/input";
import { Label } from "~/ui/form/label";

import { handleFirebaseErrors } from "~/utils/firebase-errors";
import { createAuth } from "~/features/Primitives/auth";

export default function Register() {
  const { containsFormErrors, errorFromField, signUpMutation, signUp } =
    createAuth();

  return (
    <main class="h-screen">
      <Title>Pills - Crear nueva cuenta</Title>
      <article class="grid place-items-center  w-full h-full">
        <form
          onSubmit={signUp}
          class="  xl:p-0 p-3 flex flex-col items-center justify-center items-center w-full   xl:max-w-2xl lg:max-w-lg md:max-w-lg container mx-auto space-y-5  "
        >
          <h2 class="text-center xl:text-3xl text-lg font-bold mb-3">
            Crea tu nueva cuenta en Pills!
          </h2>
          <FormField>
            <Label>Correo electrónico</Label>
            <Input
              autocomplete="off"
              type="email"
              name="email"
              disabled={signUpMutation.isLoading}
              required
              placeholder="o.gonzalo1232131@miemail.com"
              data-test-id="email-input"
            />
            <span class="text-xs h-4 text-red-500" data-test-id="auth-errors">
              <Show when={containsFormErrors("email")}>
                {errorFromField("email")}
              </Show>
            </span>
          </FormField>
          <FormField>
            <Label>Contraseña</Label>
            <Input
              type="password"
              name="password"
              required
              disabled={signUpMutation.isLoading}
              placeholder="gonzalo12313*"
              data-test-id="password-input"
            />
            <span class="text-xs h-4 text-red-500" data-test-id="auth-errors">
              <Show when={containsFormErrors("email")}>
                {errorFromField("email")}
              </Show>
            </span>
          </FormField>

          <Button
            class={`px-8 py-4 ${
              signUpMutation.isLoading ? "bg-teal-600" : "bg-teal-500"
            } font-bold w-full  c-light-500 rounded-lg max-w-2xl`}
            type="submit"
            data-test-id="submit-login"
            disabled={signUpMutation.isLoading}
          >
            {signUpMutation.isLoading ? "Creando..." : "Crear cuenta"}
          </Button>

          <span class="text-xs h-4 text-red-500" data-test-id="auth-errors">
            <Show when={signUpMutation}>
              {handleFirebaseErrors(signUpMutation?.error?.message)}
            </Show>
          </span>

          <Link href="/login" class="text-center underline">
            Ya tengo una cuenta
          </Link>
        </form>
      </article>
    </main>
  );
}
