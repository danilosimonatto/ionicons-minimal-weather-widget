export {};

type WeatherScale = "C" | "F";
type IoniconStyle = "outline" | "filled" | "sharp";

/**
 * Type definitions for the framework-agnostic `<weather-widget>` custom element.
 *
 * This file is meant to be shipped alongside `weather-widget.js` when publishing to npm,
 * so TypeScript users get autocomplete + type-checking.
 */
declare class WeatherWidgetElement extends HTMLElement {
	static observedAttributes: readonly [
		"city",
		"scale",
		"icon-style",
		"api-key"
	];

	/** City name to search (required). Example: "Milan" */
	get city(): string;

	/** Temperature scale (defaults to "C") */
	get scale(): WeatherScale;

	/** Ionicon style (defaults to "filled") */
	get iconStyle(): IoniconStyle;

	/** Optional OpenWeather API key override */
	get apiKey(): string;
}

declare global {
	interface HTMLElementTagNameMap {
		"weather-widget": WeatherWidgetElement;
	}
}
