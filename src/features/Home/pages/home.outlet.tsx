import { NavLink, Outlet } from "@solidjs/router";
import { createAuth } from "~/features/Primitives/auth";
import { Button } from "~/ui/button";
export default function HomeOutlet() {
	const { logout } = createAuth();

	return (
		<>
			<header class="p-5 border-b-2 border-light-400">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-5xl">
					<NavLink activeClass="c-teal-600" href="/home">
						Home
					</NavLink>
					<ul class="flex flex-row items-center gap-5">
						<li>
							<NavLink href="/home/pills/create" activeClass="c-teal-600">
								Agregar nueva pastilla
							</NavLink>
						</li>
						<li>
							<Button class="c-black font-bold" onClick={logout}>
								Cerrar sesión
							</Button>
						</li>
					</ul>
				</nav>
			</header>
			<Outlet />
		</>
	);
}
