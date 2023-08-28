import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import Unocss from "unocss/vite";
import { presetWebFonts, presetUno } from "unocss";
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
  ],
  resolve: { alias: { "~": resolve(__dirname, "src") } },
});
