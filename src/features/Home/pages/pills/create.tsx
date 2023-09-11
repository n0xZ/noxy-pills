import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { createMutation } from "@tanstack/solid-query";
import { useAuth } from "solid-firebase";
import { Show, createEffect, createSignal } from "solid-js";
import { ValiError, safeParse } from "valibot";
import { createAuth } from "~/features/Primitives/auth";
import { auth } from "~/lib/firebase";

import { createPill } from "~/services/pills";
import { Button } from "~/ui/button";
import { FormField } from "~/ui/form/field";
import { Input } from "~/ui/form/input";
import { Label } from "~/ui/form/label";
import { Paragraph } from "~/ui/paragraph";
import { pillSchema } from "~/utils/valibot";

function SpinnerIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			class="h-5 w-5"
		>
			<title>Spinner icon</title>
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

export default function CreatePillsForm() {
	const navigate = useNavigate();
	const { data } = useAuth(auth);
	const createPillMut = createMutation(createPill, {
		onError(e: Error) {
			throw new Error(e.message);
		},
	});
	const [formErrors, setFormErrors] = createSignal<ValiError>({} as ValiError);
	const { errorFromField, containsFormErrors } = createAuth();
	createEffect(() => {
		const redirectIfSuccess = () => {
			if (createPillMut.isSuccess) {
				navigate("/home");
			}
		};
		redirectIfSuccess();
	});
	const onSubmit = (
		e: Event & { submitter: HTMLElement } & {
			currentTarget: HTMLFormElement;
			target: Element;
		},
	) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const fields = Object.fromEntries(formData);
		const pillsData = {
			...fields,
			frequency: Number(fields.frequency),
			duration: Number(fields.duration),
			userId: data?.uid ?? "",
		};
		const formResult = safeParse(pillSchema, pillsData);
		if (!formResult.success) {
			console.log(formResult.error.issues);
			setFormErrors({ ...formErrors(), formErrors: formResult.error });
		} else {
			createPillMut.mutate(formResult.data);
		}
	};
	return (
		<main class="h-screen grid place-items-center w-full">
			<Title>Pills - Agregar nueva pastilla</Title>
			<form
				class="container mx-auto max-w-3xl flex flex-col justify-center gap-2 w-full"
				onSubmit={onSubmit}
			>
				<h2 class="text-center font-bold text-3xl">Crear nueva pastilla!</h2>
				<Paragraph class=" mb-3 text-md opacity-80">
					Agrega tu pastilla a controlar completando este formulario.
				</Paragraph>
				<FormField>
					<Label>Nombre de la pastilla</Label>
					<Input
						type="text"
						name="name"
						disabled={createPillMut.isLoading}
						required
						placeholder="Cafiaspirina"
						data-test-id="name-input"
					/>
					<span class="text-xs h-4 text-red-500" data-test-id="auth-errors">
						<Show when={containsFormErrors("name")}>
							{errorFromField("name")}
						</Show>
					</span>
				</FormField>
				<FormField>
					<Label>Descripción de la pastilla</Label>
					<Input
						type="text"
						name="description"
						disabled={createPillMut.isLoading}
						required
						placeholder="Sirve para el dolor de cabeza"
						data-test-id="description-input"
					/>
					<span class="text-xs h-4 text-red-500" data-test-id="auth-errors">
						<Show when={containsFormErrors("description")}>
							{errorFromField("description")}
						</Show>
					</span>
				</FormField>
				<FormField>
					<Label>Frecuencia de la aplicación de la pastilla (horas)</Label>
					<Input
						autocomplete="off"
						type="number"
						name="frequency"
						disabled={createPillMut.isLoading}
						required
						placeholder="3"
						data-test-id="frequency-input"
					/>
					<span class="text-xs h-4 text-red-500" data-test-id="auth-errors">
						<Show when={containsFormErrors("frequency")}>
							{errorFromField("frequency")}
						</Show>
					</span>
				</FormField>
				<FormField>
					<Label>Duración del tratamiento (en días)</Label>
					<Input
						autocomplete="off"
						type="number"
						name="duration"
						disabled={createPillMut.isLoading}
						required
						placeholder="11"
						data-test-id="duration-input"
					/>
					<span class="text-xs h-4 text-red-500" data-test-id="auth-errors">
						<Show when={containsFormErrors("duration")}>
							{errorFromField("duration")}
						</Show>
					</span>
				</FormField>
				<Button
					type="submit"
					disabled={createPillMut.isLoading}
					class="flex flex-row items-center gap-2"
				>
					<Show when={createPillMut.isLoading} fallback="Agregar pastilla">
						<>
							<SpinnerIcon />
							<span>Agregando...</span>
						</>
					</Show>
				</Button>
			</form>
		</main>
	);
}
