import path from "node:path";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { remixDevTools } from "remix-development-tools";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
  ],
});
