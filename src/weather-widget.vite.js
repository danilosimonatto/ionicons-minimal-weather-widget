import styles from "./styles.css?raw";
import template from "./template.html?raw";

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

class WeatherWidgetElement extends HTMLElement {
	static observedAttributes = ["city", "scale", "icon-style", "api-key"];

	#abort = null;
	#shadow = this.attachShadow({ mode: "open" });
	#els = null;

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
		this.#shadow.innerHTML = `<style>${styles}</style>${template}`;
		const root = this.#shadow.querySelector(".weather-widget");
		if (!root) return;

		this.#els = {
			root,
			loading: root.querySelector('[part="loading"]'),
			content: root.querySelector('[part="content"]'),
			city: root.querySelector('[part="city"]'),
			icon: root.querySelector("ion-icon"),
			temp: root.querySelector('[part="temperature"]'),
			error: root.querySelector('[part="error"]'),
		};
	}

	#showLoading() {
		if (!this.#els) return;
		this.#els.loading.hidden = false;
		this.#els.content.hidden = true;
		this.#els.error.hidden = true;
	}

	#showError(message) {
		if (!this.#els) return;
		this.#els.loading.hidden = true;
		this.#els.content.hidden = true;
		this.#els.error.hidden = false;
		this.#els.error.textContent = message;
	}

	#showWeather({ cityName, iconName, tempText }) {
		if (!this.#els) return;
		this.#els.loading.hidden = true;
		this.#els.error.hidden = true;
		this.#els.content.hidden = false;

		// Use textContent for safety; avoid innerHTML for dynamic content.
		this.#els.city.textContent = cityName;
		this.#els.icon.setAttribute("name", iconName);
		this.#els.temp.textContent = tempText;
	}

	async #load() {
		const city = this.city;
		if (!city) {
			this.#showError("Missing city");
			return;
		}

		if (this.#abort) this.#abort.abort();
		this.#abort = new AbortController();

		this.#showLoading();

		try {
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

			this.#showWeather({
				cityName,
				iconName,
				tempText: `${temp}°${this.scale}`,
			});
		} catch (e) {
			if (e instanceof DOMException && e.name === "AbortError") return;
			const message =
				e instanceof Error ? e.message : "Failed to fetch weather";
			this.#showError(message);
		}
	}
}

if (!customElements.get("weather-widget")) {
	customElements.define("weather-widget", WeatherWidgetElement);
}
