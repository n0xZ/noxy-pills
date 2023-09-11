import { NavLink, Outlet } from "@solidjs/router";
import { createAuth } from "~/features/Primitives/auth";
import { Button } from "~/ui/button";
export default function HomeOutlet() {
	const { logout } = createAuth();

	return (
		<>
			<header class="p-5 border-b-2 border-light-400 ">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-3xl">
					<NavLink inactiveClass="opacity-60" href="/home">
						Pills!
					</NavLink>
					<ul class="flex flex-row items-center gap-5">
						<li>
							<NavLink href="/home/pills/create" inactiveClass="opacity-60">
								Agregar nueva pastilla
							</NavLink>
						</li>
						<li>
							<Button
								class="bg-dark-700 c-white hover:opacity-80 font-bold"
								onClick={logout}
							>
								Cerrar sesión
							</Button>
						</li>
					</ul>
				</nav>
			</header>
			<main class="bg-zinc-100 min-h-screen h-full pt-3">
				<Outlet />
			</main>
		</>
	);
}
