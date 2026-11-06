// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://rodrigoamarilla.tech",
  output: "static",
  trailingSlash: "always",
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
});
