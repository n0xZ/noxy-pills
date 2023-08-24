/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { MetaProvider } from "@solidjs/meta";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import "virtual:uno.css";
import "@unocss/reset/tailwind-compat.css";
import App from "./App";

const root = document.getElementById("root");
const client = new QueryClient();
render(
  () => (
    <QueryClientProvider client={client}>
      <MetaProvider>
        <Router>
          <App />
        </Router>
      </MetaProvider>
    </QueryClientProvider>
  ),
  root!
);
