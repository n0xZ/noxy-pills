/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { FirebaseProvider } from "solid-firebase";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import App from "./App";

import { firebase } from "./lib/firebase";
const root = document.getElementById("root");
const client = new QueryClient();
render(
	() => (
		<QueryClientProvider client={client}>
			<FirebaseProvider app={firebase}>
				<MetaProvider>
					<Router>
						<App />
					</Router>
				</MetaProvider>
			</FirebaseProvider>
		</QueryClientProvider>
	),
	root!,
);
