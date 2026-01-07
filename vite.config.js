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
			// Keep dependency behavior identical to the hand-written module:
			// consumers will still resolve `ionicons` from this package's dependencies.
			external: (id) => id === "ionicons" || id.startsWith("ionicons/"),
		},
	},
});
