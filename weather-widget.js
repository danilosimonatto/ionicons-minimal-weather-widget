import { defineCustomElements } from "ionicons/loader";
import { addIcons } from "ionicons";
import {
	sunny,
	sunnyOutline,
	sunnySharp,
	moon,
	moonOutline,
	moonSharp,
	partlySunny,
	partlySunnyOutline,
	partlySunnySharp,
	cloudy,
	cloudyOutline,
	cloudySharp,
	cloudyNight,
	cloudyNightOutline,
	cloudyNightSharp,
	rainy,
	rainyOutline,
	rainySharp,
	thunderstorm,
	thunderstormOutline,
	thunderstormSharp,
	snow,
	snowOutline,
	snowSharp,
	helpCircle,
	helpCircleOutline,
	helpCircleSharp,
} from "ionicons/icons";

let ioniconsInitPromise;
function ensureIonicons() {
	if (!ioniconsInitPromise) {
		addIcons({
			sunny,
			sunnyOutline,
			sunnySharp,
			moon,
			moonOutline,
			moonSharp,
			partlySunny,
			partlySunnyOutline,
			partlySunnySharp,
			cloudy,
			cloudyOutline,
			cloudySharp,
			cloudyNight,
			cloudyNightOutline,
			cloudyNightSharp,
			rainy,
			rainyOutline,
			rainySharp,
			thunderstorm,
			thunderstormOutline,
			thunderstormSharp,
			snow,
			snowOutline,
			snowSharp,
			helpCircle,
			helpCircleOutline,
			helpCircleSharp,
		});
		ioniconsInitPromise = defineCustomElements(window);
	}
	return ioniconsInitPromise;
}

const normalizeScale = (value) =>
	String(value || "").toUpperCase() === "F" ? "F" : "C";

const normalizeIconStyle = (value) => {
	if (value === "outline" || value === "sharp" || value === "filled")
		return value;
	return "filled";
};

const styleIonicon = (baseName, style) => {
	if (style === "filled") return baseName;
	return `${baseName}-${style}`;
};

// OpenWeather icon code mapping to Ionicons
const ICON_CODE_TO_IONICON = {
	// 01d - sunny
	"01d": "sunny",
	"01n": "moon",

	// 02d - partly-sunny
	"02d": "partly-sunny",
	"02n": "cloudy-night",

	// 03d, 04d, 50d - cloudy
	"03d": "cloudy",
	"03n": "cloudy",
	"04d": "cloudy",
	"04n": "cloudy",
	"50d": "cloudy",
	"50n": "cloudy",

	// 09d, 10d - rainy
	"09d": "rainy",
	"09n": "rainy",
	"10d": "rainy",
	"10n": "rainy",

	// 11d - thunderstorm
	"11d": "thunderstorm",
	"11n": "thunderstorm",

	// 13d - snow
	"13d": "snow",
	"13n": "snow",
};

const escapeHtml = (input) => {
	return String(input)
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");
};

class WeatherWidgetElement extends HTMLElement {
	static observedAttributes = ["city", "scale", "icon-style", "api-key"];

	#abort = null;
	#shadow = this.attachShadow({ mode: "open" });

	connectedCallback() {
		ensureIonicons().then(() => {
			this.#renderShell();
			this.#load();
		});
	}

	disconnectedCallback() {
		if (this.#abort) this.#abort.abort();
	}

	attributeChangedCallback() {
		if (!this.isConnected) return;
		this.#load();
	}

	get city() {
		return (this.getAttribute("city") || "").trim();
	}

	get scale() {
		return normalizeScale(this.getAttribute("scale"));
	}

	get iconStyle() {
		return normalizeIconStyle(this.getAttribute("icon-style"));
	}

	get apiKey() {
		return (this.getAttribute("api-key") || "").trim();
	}

	#renderShell() {
		this.#shadow.innerHTML = `
			<style>
				:host {
					display: inline-block;
				}
				.weather-widget {
					display: inline-flex;
					flex-direction: column;
					gap: 8px;
					padding: 1.5rem;
					background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
					border-radius: 16px;
					color: white;
					text-align: center;
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
					min-width: 250px;
					font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
				}
				.loading,
				.error {
					font-size: 1rem;
					padding: 1rem;
				}
				.error {
					color: #ffebee;
					background: rgba(255, 0, 0, 0.2);
					border-radius: 8px;
				}
				.weather-content {
					display: flex;
					flex-direction: column;
					gap: 12px;
				}
				.city-name {
					font-size: 1.5rem;
					font-weight: 600;
					text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}
				.weather {
					display: flex;
					gap: 12px;
					align-items: center;
					justify-content: center;
					font-size: 2.5rem;
					font-weight: 700;
				}
				.icon {
					font-size: 3rem;
					text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
				}
				.temperature {
					text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
				}
			</style>
			<div class="weather-widget" part="root">
				<div class="loading" part="loading">Loading…</div>
			</div>
		`;
	}

	#setInner(html) {
		const root = this.#shadow.querySelector(".weather-widget");
		if (!root) return;
		root.innerHTML = html;
	}

	async #load() {
		const city = this.city;
		if (!city) {
			this.#setInner(`<div class="error" part="error">Missing city</div>`);
			return;
		}

		if (this.#abort) this.#abort.abort();
		this.#abort = new AbortController();

		this.#setInner(`<div class="loading" part="loading">Loading…</div>`);

		try {
			// Mirrors the old Vue component's behavior:
			// - OpenWeatherMap geocoding -> lat/lon
			// - OpenWeatherMap weather in metric
			// - Convert to Fahrenheit client-side if needed
			const apiKey = this.apiKey;
			if (!apiKey) throw new Error("Missing API key");

			// Step 1: Geocode
			const geoUrl = new URL("https://api.openweathermap.org/geo/1.0/direct");
			geoUrl.searchParams.set("q", city);
			geoUrl.searchParams.set("limit", "1");
			geoUrl.searchParams.set("appid", apiKey);

			const geoRes = await fetch(geoUrl, { signal: this.#abort.signal });
			if (!geoRes.ok) throw new Error("City not found");
			const geoJson = await geoRes.json();
			const geo = geoJson && geoJson[0];
			if (!geo) throw new Error("City not found");

			// Step 2: Weather (metric, then optional conversion)
			const weatherUrl = new URL(
				"https://api.openweathermap.org/data/2.5/weather"
			);
			weatherUrl.searchParams.set("lat", String(geo.lat));
			weatherUrl.searchParams.set("lon", String(geo.lon));
			weatherUrl.searchParams.set("units", "metric");
			weatherUrl.searchParams.set("appid", apiKey);

			const weatherRes = await fetch(weatherUrl, {
				signal: this.#abort.signal,
			});
			if (!weatherRes.ok) throw new Error("Weather not available");
			const weather = await weatherRes.json();

			const celsius = weather?.main?.temp;
			const temp =
				this.scale === "F"
					? Math.round((celsius * 9) / 5 + 32)
					: Math.round(celsius);

			const iconCode = weather?.weather?.[0]?.icon;
			const baseIcon =
				(iconCode && ICON_CODE_TO_IONICON[iconCode]) || "help-circle";
			const iconName = styleIonicon(baseIcon, this.iconStyle);

			const cityName = weather?.name || city;

			this.#setInner(`
				<div class="weather-content" part="content">
					<div class="city-name" part="city">${escapeHtml(cityName)}</div>
					<div class="weather" part="weather">
						<ion-icon name="${iconName}" class="icon" aria-hidden="true"></ion-icon>
						<span class="temperature" part="temperature">${temp}°${this.scale}</span>
					</div>
				</div>
			`);
		} catch (e) {
			if (e instanceof DOMException && e.name === "AbortError") return;
			const message =
				e instanceof Error ? e.message : "Failed to fetch weather";
			this.#setInner(
				`<div class="error" part="error">${escapeHtml(message)}</div>`
			);
		}
	}
}

if (!customElements.get("weather-widget")) {
	customElements.define("weather-widget", WeatherWidgetElement);
}
