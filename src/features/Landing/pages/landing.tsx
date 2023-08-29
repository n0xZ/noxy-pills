import { Title } from "@solidjs/meta";
import { Link } from "@solidjs/router";

import { Paragraph } from "~/ui/paragraph";

export default function Landing() {
	return (
		<>
			<Title>Bienvenido@a Noxy - pills!</Title>
			<header class="p-5 border-b-2 border-light-500">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<Link href="/">Pills</Link>
					<ul class="flex flex-row items-center gap-5">
						<li>
							<Link href="/register">Registrarse </Link>
						</li>
						<li>
							<Link href="/login">Iniciá sesión</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main class="h-screen flex flex-col justify-center gap-2 container mx-auto max-w-5xl">
				<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
					Gestionar tus pastillas, nunca fue tan fácil{" "}
					<span class="c-teal-600">como ahora.</span>
				</h1>
				<Paragraph class="opacity-80 text-center">
					Con Noxy pills, vas a poder definir un registro de pastillas, en el
					cual recibirás un aviso previo asignado por vos.
				</Paragraph>
				<Link
					href="/login"
					class="p-3 rounded-md bg-teal-600 c-white max-w-3xl w-full text-center self-center hover:opacity-70"
				>
					Empieza ya!
				</Link>
			</main>
		</>
	);
}
