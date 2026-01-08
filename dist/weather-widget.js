import { defineCustomElements as w } from "ionicons/loader";
import { addIcons as f } from "ionicons";
import { helpCircleSharp as S, helpCircleOutline as b, helpCircle as C, snowSharp as O, snowOutline as x, snow as E, thunderstormSharp as k, thunderstormOutline as I, thunderstorm as v, rainySharp as A, rainyOutline as P, rainy as q, cloudyNightSharp as M, cloudyNightOutline as N, cloudyNight as U, cloudySharp as L, cloudyOutline as $, cloudy as F, partlySunnySharp as R, partlySunnyOutline as T, partlySunny as W, moonSharp as j, moonOutline as z, moon as K, sunnySharp as _, sunnyOutline as D, sunny as H } from "ionicons/icons";
const B = `:host {
	--color-primary: #000;
	display: inline-block;
}

.weather-widget {
	display: inline-flex;
	flex-direction: column;
	gap: 8px;
	color: var(--color-primary, #000);
	text-align: center;
	font-size: 1rem;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen, Ubuntu, Cantarell, sans-serif;
}

.error {
	color: #ffebee;
	background: rgba(255, 0, 0, 0.2);
	border-radius: 8px;
}

.weather-content {
	display: flex;
	flex-direction: row;
	gap: 5px;
	align-items: center;
	justify-content: center;
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
  return a || (f({
    sunny: H,
    sunnyOutline: D,
    sunnySharp: _,
    moon: K,
    moonOutline: z,
    moonSharp: j,
    partlySunny: W,
    partlySunnyOutline: T,
    partlySunnySharp: R,
    cloudy: F,
    cloudyOutline: $,
    cloudySharp: L,
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
    snowOutline: x,
    snowSharp: O,
    helpCircle: C,
    helpCircleOutline: b,
    helpCircleSharp: S
  }), a = w(window)), a;
}
const Q = (e) => String(e || "").toUpperCase() === "F" ? "F" : "C", V = (e) => e === "outline" || e === "sharp" || e === "filled" ? e : "filled", X = (e, t) => t === "filled" ? e : `${e}-${t}`, Y = {
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
  #e = null;
  #n = this.attachShadow({ mode: "open" });
  #t = null;
  connectedCallback() {
    G().then(() => {
      this.#o(), this.#i();
    });
  }
  disconnectedCallback() {
    this.#e && this.#e.abort();
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
    this.#n.innerHTML = `<style>${B}</style>${J}`;
    const t = this.#n.querySelector(".weather-widget");
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
  #a({ cityName: t, iconName: n, tempText: r }) {
    this.#t && (this.#t.loading.hidden = !0, this.#t.error.hidden = !0, this.#t.content.hidden = !1, this.#t.city.textContent = t, this.#t.icon.setAttribute("name", n), this.#t.temp.textContent = r);
  }
  async #i() {
    const t = this.city;
    if (!t) {
      this.#r("Missing city");
      return;
    }
    this.#e && this.#e.abort(), this.#e = new AbortController(), this.#s();
    try {
      const n = this.apiKey;
      if (!n) throw new Error("Missing API key");
      const r = new URL("https://api.openweathermap.org/geo/1.0/direct");
      r.searchParams.set("q", t), r.searchParams.set("limit", "1"), r.searchParams.set("appid", n);
      const c = await fetch(r, { signal: this.#e.signal });
      if (!c.ok) throw new Error("City not found");
      const l = await c.json(), o = l && l[0];
      if (!o) throw new Error("City not found");
      const i = new URL(
        "https://api.openweathermap.org/data/2.5/weather"
      );
      i.searchParams.set("lat", String(o.lat)), i.searchParams.set("lon", String(o.lon)), i.searchParams.set("units", "metric"), i.searchParams.set("appid", n);
      const h = await fetch(i, {
        signal: this.#e.signal
      });
      if (!h.ok) throw new Error("Weather not available");
      const s = await h.json(), d = s?.main?.temp, y = this.scale === "F" ? Math.round(d * 9 / 5 + 32) : Math.round(d), u = s?.weather?.[0]?.icon, p = u && Y[u] || "help-circle", m = X(p, this.iconStyle), g = s?.name || t;
      this.#a({
        cityName: g,
        iconName: m,
        tempText: `${y}°${this.scale}`
      });
    } catch (n) {
      if (n instanceof DOMException && n.name === "AbortError") return;
      const r = n instanceof Error ? n.message : "Failed to fetch weather";
      this.#r(r);
    }
  }
}
customElements.get("weather-widget") || customElements.define("weather-widget", Z);
