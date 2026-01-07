import { defineCustomElements as f } from "ionicons/loader";
import { addIcons as w } from "ionicons";
import { helpCircleSharp as b, helpCircleOutline as S, helpCircle as x, snowSharp as C, snowOutline as O, snow as E, thunderstormSharp as k, thunderstormOutline as I, thunderstorm as v, rainySharp as A, rainyOutline as P, rainy as q, cloudyNightSharp as M, cloudyNightOutline as N, cloudyNight as U, cloudySharp as z, cloudyOutline as L, cloudy as $, partlySunnySharp as F, partlySunnyOutline as R, partlySunny as T, moonSharp as W, moonOutline as j, moon as K, sunnySharp as _, sunnyOutline as D, sunny as H } from "ionicons/icons";
const B = `:host {
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
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen, Ubuntu, Cantarell, sans-serif;
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
	flex-direction: row;
	gap: 12px;
	font-size: 2.5rem;
	font-weight: 700;
	align-items: center;
	justify-content: center;
}

.city-name {
	font-size: 1.5rem;
	font-weight: 600;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.icon {
	font-size: 3rem;
	text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.temperature {
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
`, J = `<div
	class="weather-widget"
	part="root"
>
	<div
		class="loading"
		part="loading"
	>
		Loading…
	</div>

	<div
		class="weather-content"
		part="content"
		hidden
	>
		<div
			class="city-name"
			part="city"
		></div>
		<ion-icon
			class="icon"
			aria-hidden="true"
		></ion-icon>
		<span
			class="temperature"
			part="temperature"
		></span>
	</div>

	<div
		class="error"
		part="error"
		hidden
	></div>
</div>
`;
let a;
function G() {
  return a || (w({
    sunny: H,
    sunnyOutline: D,
    sunnySharp: _,
    moon: K,
    moonOutline: j,
    moonSharp: W,
    partlySunny: T,
    partlySunnyOutline: R,
    partlySunnySharp: F,
    cloudy: $,
    cloudyOutline: L,
    cloudySharp: z,
    cloudyNight: U,
    cloudyNightOutline: N,
    cloudyNightSharp: M,
    rainy: q,
    rainyOutline: P,
    rainySharp: A,
    thunderstorm: v,
    thunderstormOutline: I,
    thunderstormSharp: k,
    snow: E,
    snowOutline: O,
    snowSharp: C,
    helpCircle: x,
    helpCircleOutline: S,
    helpCircleSharp: b
  }), a = f(window)), a;
}
const Q = (n) => String(n || "").toUpperCase() === "F" ? "F" : "C", V = (n) => n === "outline" || n === "sharp" || n === "filled" ? n : "filled", X = (n, t) => t === "filled" ? n : `${n}-${t}`, Y = {
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
  "13n": "snow"
};
class Z extends HTMLElement {
  static observedAttributes = ["city", "scale", "icon-style", "api-key"];
  #n = null;
  #e = this.attachShadow({ mode: "open" });
  #t = null;
  connectedCallback() {
    G().then(() => {
      this.#o(), this.#i();
    });
  }
  disconnectedCallback() {
    this.#n && this.#n.abort();
  }
  attributeChangedCallback() {
    this.isConnected && this.#i();
  }
  get city() {
    return (this.getAttribute("city") || "").trim();
  }
  get scale() {
    return Q(this.getAttribute("scale"));
  }
  get iconStyle() {
    return V(this.getAttribute("icon-style"));
  }
  get apiKey() {
    return (this.getAttribute("api-key") || "").trim();
  }
  #o() {
    this.#e.innerHTML = `<style>${B}</style>${J}`;
    const t = this.#e.querySelector(".weather-widget");
    t && (this.#t = {
      root: t,
      loading: t.querySelector('[part="loading"]'),
      content: t.querySelector('[part="content"]'),
      city: t.querySelector('[part="city"]'),
      icon: t.querySelector("ion-icon"),
      temp: t.querySelector('[part="temperature"]'),
      error: t.querySelector('[part="error"]')
    });
  }
  #s() {
    this.#t && (this.#t.loading.hidden = !1, this.#t.content.hidden = !0, this.#t.error.hidden = !0);
  }
  #r(t) {
    this.#t && (this.#t.loading.hidden = !0, this.#t.content.hidden = !0, this.#t.error.hidden = !1, this.#t.error.textContent = t);
  }
  #a({ cityName: t, iconName: e, tempText: r }) {
    this.#t && (this.#t.loading.hidden = !0, this.#t.error.hidden = !0, this.#t.content.hidden = !1, this.#t.city.textContent = t, this.#t.icon.setAttribute("name", e), this.#t.temp.textContent = r);
  }
  async #i() {
    const t = this.city;
    if (!t) {
      this.#r("Missing city");
      return;
    }
    this.#n && this.#n.abort(), this.#n = new AbortController(), this.#s();
    try {
      const e = this.apiKey;
      if (!e) throw new Error("Missing API key");
      const r = new URL("https://api.openweathermap.org/geo/1.0/direct");
      r.searchParams.set("q", t), r.searchParams.set("limit", "1"), r.searchParams.set("appid", e);
      const c = await fetch(r, { signal: this.#n.signal });
      if (!c.ok) throw new Error("City not found");
      const l = await c.json(), o = l && l[0];
      if (!o) throw new Error("City not found");
      const i = new URL(
        "https://api.openweathermap.org/data/2.5/weather"
      );
      i.searchParams.set("lat", String(o.lat)), i.searchParams.set("lon", String(o.lon)), i.searchParams.set("units", "metric"), i.searchParams.set("appid", e);
      const h = await fetch(i, {
        signal: this.#n.signal
      });
      if (!h.ok) throw new Error("Weather not available");
      const s = await h.json(), d = s?.main?.temp, p = this.scale === "F" ? Math.round(d * 9 / 5 + 32) : Math.round(d), u = s?.weather?.[0]?.icon, y = u && Y[u] || "help-circle", m = X(y, this.iconStyle), g = s?.name || t;
      this.#a({
        cityName: g,
        iconName: m,
        tempText: `${p}°${this.scale}`
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      const r = e instanceof Error ? e.message : "Failed to fetch weather";
      this.#r(r);
    }
  }
}
customElements.get("weather-widget") || customElements.define("weather-widget", Z);
