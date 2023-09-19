import { Portal } from "solid-js/web";
import {
	Menu,
	MenuContent,
	MenuItem,
	MenuPositioner,
	MenuTrigger,
} from "@ark-ui/solid";

import { NavLink } from "@solidjs/router";
import { Button } from "~/ui/button";
import { createAuth } from "~/features/Primitives/auth";

function AddPillIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			class="h-5 w-5 rounded-md "
		>
			<title>Add pill icon</title>
			<g
				id="fePlus0"
				fill="none"
				fill-rule="evenodd"
				stroke="none"
				stroke-width="1"
			>
				<g id="fePlus1" fill="currentColor">
					<path
						id="fePlus2"
						d="M13 13v7a1 1 0 0 1-2 0v-7H4a1 1 0 0 1 0-2h7V4a1 1 0 0 1 2 0v7h7a1 1 0 0 1 0 2h-7Z"
					/>
				</g>
			</g>
		</svg>
	);
}

function LogoutIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 24 24"
			class="h-5 w-5 rounded-md "
		>
			<title>Logout icon</title>
			<g
				id="feLogout0"
				fill="none"
				fill-rule="evenodd"
				stroke="none"
				stroke-width="1"
			>
				<g id="feLogout1" fill="currentColor">
					<path
						id="feLogout2"
						d="M3 5c0-1.1.9-2 2-2h8v2H5v14h8v2H5c-1.1 0-2-.9-2-2V5Zm14.176 6L14.64 8.464l1.414-1.414l4.95 4.95l-4.95 4.95l-1.414-1.414L17.176 13H10.59v-2h6.586Z"
					/>
				</g>
			</g>
		</svg>
	);
}

function HamburgerIcon() {
	return (
		<svg
			fill="currentColor"
			stroke-width="0"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			style="overflow: visible;"
			height="1rem"
			width="1rem"
			class="h-5 w-5 rounded-md "
		>
			<title>Hamburguer icon</title>
			<path
				fill-rule="evenodd"
				d="M14 5H2V3h12v2zm0 4H2V7h12v2zM2 13h12v-2H2v2z"
				clip-rule="evenodd"
			/>
		</svg>
	);
}
export function HomeMenu() {
	const { logout } = createAuth();
	return (
		<Menu>
			<MenuTrigger class="bg-transparent     xl:hidden block">
				<HamburgerIcon />
			</MenuTrigger>
			<Portal>
				<MenuPositioner>
					<MenuContent class="  w-64 min-h-72 h-full shadow-md  data-[state=open]:bg-light-100 data-[disabled]:pointer-events-none     flex flex-col justify-between  w-full rounded-md ">
						<MenuItem
							id="create-pills"
							class="border-b-2 p-2 w-full  duration-100 ease-in-out rounded-md "
						>
							<NavLink
								href="/home/pills/create"
								inactiveClass="opacity-80"
								class=" flex flex-row items-center gap-1 "
							>
								<AddPillIcon />
								<span>Agregar nueva pastilla</span>
							</NavLink>
						</MenuItem>
						<MenuItem id="logout" class="  place-self-end w-full ">
							<Button
								class="w-full rounded-none bg-dark-900 hover:bg-opacity-80 flex flex-row items-center gap-1 c-white"
								onClick={logout}
							>
								<LogoutIcon />
								<span>Cerrar sesión</span>
							</Button>
						</MenuItem>
					</MenuContent>
				</MenuPositioner>
			</Portal>
		</Menu>
	);
}
