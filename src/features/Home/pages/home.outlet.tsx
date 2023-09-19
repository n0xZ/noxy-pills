import { NavLink, Outlet, useLocation, useNavigate } from "@solidjs/router";

import { Show, createEffect } from "solid-js";
import { createAuth } from "~/features/Primitives/auth";

import { createUser } from "~/features/Primitives/user";

import { Button } from "~/ui/button";
import { HomeMenu } from "../components/home/menu";
export default function HomeOutlet() {
	const { user } = createUser();
	const { logout } = createAuth();
	const navigate = useNavigate();
	const location = useLocation();

	createEffect(() => {
		if (location.pathname.includes("/home")) {
			if (!user.data && !user.loading) {
				navigate("/");
			}
		}
	});
	return (
		<>
			<Show when={!user.loading}>{user.data?.displayName}</Show>
			<header class="p-5 border-b-2 border-light-400  bg-light-100">
				<nav class="flex flex-row items-center justify-between container mx-auto max-w-3xl">
					<NavLink inactiveClass="opacity-60" href="/home">
						Home!
					</NavLink>
					<ul class=" flex-row items-center gap-5 hidden xl:flex ">
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
					<HomeMenu />
				</nav>
			</header>
			<main class="bg-zinc-100 min-h-screen h-full pt-3">
				<Outlet />
			</main>
		</>
	);
}
