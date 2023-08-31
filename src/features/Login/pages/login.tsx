import { Title } from "@solidjs/meta";
import { Link } from "@solidjs/router";
import { Show } from "solid-js";

import { Button } from "~/ui/button";
import { FormField } from "~/ui/form/field";
import { Input } from "~/ui/form/input";
import { Label } from "~/ui/form/label";

import { handleFirebaseErrors } from "~/utils/firebase-errors";
import { createAuth } from "~/features/Primitives/auth";

function SpinnerIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			class="h-5 w-5"
		>
			<path
				fill="currentColor"
				d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
			>
				<animateTransform
					attributeName="transform"
					dur="0.75s"
					repeatCount="indefinite"
					type="rotate"
					values="0 12 12;360 12 12"
				/>
			</path>
		</svg>
	);
}

export default function Login() {
	const { containsFormErrors, errorFromField, signInMutation, signIn } =
		createAuth();

	return (
		<main class="h-screen w-full">
			<Title>Solyx - Iniciar sesión</Title>
			<article class="grid place-items-center  w-full h-full">
				<form
					onSubmit={signIn}
					class="  xl:p-0 p-3 flex flex-col items-center justify-center items-center w-full  max-w-5xl container mx-auto space-y-5  "
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
							disabled={signInMutation.isLoading}
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
							disabled={signInMutation.isLoading}
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
							signInMutation.isLoading ? "bg-teal-400" : "bg-teal-500"
						} font-bold w-full  c-white font-bold rounded-lg max-w-3xl flex flex-row items-center gap-2`}
						type="submit"
						data-test-id="submit-login"
						disabled={signInMutation.isLoading}
					>
						{signInMutation.isLoading ? (
							<>
								<SpinnerIcon />
								<span>Iniciando...</span>
							</>
						) : (
							"Iniciar sesión"
						)}
					</Button>

					<span class="text-xs h-4 text-red-500" data-test-id="auth-errors">
						<Show when={signInMutation}>
							{handleFirebaseErrors(signInMutation?.error?.message)}
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
