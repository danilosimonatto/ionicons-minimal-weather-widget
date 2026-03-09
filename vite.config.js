import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
	build: {
		// Output into dist/ to avoid overwriting source files.
		outDir: "dist",
		emptyOutDir: true,
		lib: {
			entry: path.resolve(__dirname, "src/weather-widget.entry.js"),
			formats: ["es"],
			fileName: () => "weather-widget.js",
		},
		rollupOptions: {
			output: {
				// Emit a single browser-ready module so plain servers do not need to
				// resolve bare `ionicons/*` imports at runtime.
				inlineDynamicImports: true,
			},
		},
	},
});
