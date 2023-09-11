import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { presetWebFonts, presetUno } from "unocss";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

export default defineConfig({
	plugins: [
		solid(),
		Unocss({
			presets: [
				presetUno(),
				presetWebFonts({
					provider: "bunny",
					fonts: {
						inter: ["Inter", "sans-serif"],
					},
				}),
			],
		}),
		VitePWA({ injectRegister: "auto" }),
	],
	resolve: { alias: { "~": resolve(__dirname, "src") } },
});
