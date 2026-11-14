/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// One build per country: COUNTRY=fr npm run build (fr is the default).
// The app imports the country's data through "@country/…".
const country = process.env.COUNTRY ?? "fr";
const dir = resolve(__dirname, "src/countries", country);
if (!existsSync(dir)) throw new Error(`No country folder at src/countries/${country}`);
const meta = JSON.parse(readFileSync(resolve(dir, "meta.json"), "utf8")) as Record<string, string>;

// Relative base so the built site works from a GitHub Pages project path,
// a subdirectory, or the filesystem without reconfiguration.
export default defineConfig({
  base: "./",
  resolve: { alias: { "@country": dir } },
  plugins: [
    react(),
    { name: "country-meta", transformIndexHtml: (html) => html.replace(/%(\w+)%/g, (m, k) => meta[k] ?? m) },
  ],
  build: { outDir: process.env.OUT_DIR ?? "dist", sourcemap: false },
  // the shared contract, plus the active country's own tests
  test: { include: ["src/countries/*.test.ts", "src/lib/**/*.test.ts", `src/countries/${country}/**/*.test.ts`] },
});
