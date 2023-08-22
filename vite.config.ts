import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { resolve } from "path";
export default defineConfig({
  plugins: [solid(), Unocss()],
  resolve: { alias: { "~": resolve(__dirname, "src") } },
});
