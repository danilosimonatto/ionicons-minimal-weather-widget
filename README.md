# Ionicons Minimal Weather Widget

A tiny, framework-agnostic weather widget custom element powered by Ionicons. Displays current weather for a city using beautiful icons.

## Install

```sh
npm install @danilosimonatto/ionicons-minimal-weather-widget
# or
yarn add @danilosimonatto/ionicons-minimal-weather-widget
```

## Usage

Just include the bundled JS file on your site/app:

```js
import "@danilosimonatto/ionicons-minimal-weather-widget";
```

You can then use the custom element in your HTML:

```html
<weather-widget
	city="Milan"
	scale="C"
	icon-style="filled"
	api-key="YOUR_OPENWEATHER_API_KEY"
></weather-widget>
```

## Astro

Astro frontmatter runs on the server/build step, but this package registers a **browser custom element** (it uses `window`, `HTMLElement`, and `customElements`). That means the widget must still be loaded **client-side**.

To make this easy, the package ships an Astro wrapper component that includes the needed module import for you:

```astro
---
import WeatherWidget from "@danilosimonatto/ionicons-minimal-weather-widget/astro";
---

<WeatherWidget city="Milan" apiKey={import.meta.env.PUBLIC_OPENWEATHER_API_KEY} />
```

Props:

- `city` (string, required)
- `apiKey` (string, required)
- `scale` ("C" | "F", optional, default "C")
- `iconStyle` ("filled" | "outline" | "sharp", optional, default "filled")

## Options

| Attribute    | Type                             | Description                                        | Example      |
| ------------ | -------------------------------- | -------------------------------------------------- | ------------ |
| `city`       | `string` (required)              | City name to fetch weather for                     | `Milan`      |
| `scale`      | `"C"`/`"F"`                      | Temperature units. Celsius (default) or Fahrenheit | `F`          |
| `icon-style` | `"filled"`/`"outline"`/`"sharp"` | Ionicon style (default: `filled`)                  | `outline`    |
| `api-key`    | `string` (required)              | OpenWeatherMap API key                             | `yourApiKey` |

## Example

```html
<weather-widget
	city="San Francisco"
	scale="F"
	icon-style="outline"
	api-key="YOUR_OPENWEATHER_API_KEY"
></weather-widget>
```

## Features

- 🌀 Framework-agnostic — use anywhere (Astro, React, Vue, plain HTML, etc.)
- ⛅ Uses Ionicons for beautiful weather icons
- 🎨 Customizable icon style and units
- 🔐 Uses your OpenWeather API key via the `api-key` attribute

## Development (editing HTML/CSS with formatting)

The published widget bundle is **generated** so consumers can keep importing a single file.

- Edit:
  - `src/styles.css`
  - `src/template.html`
  - `src/weather-widget.vite.js`
- Then run:

```sh
npm run build
```

For auto-rebuild while developing (e.g. with `npm link`), run:

```sh
npm run dev
```

## License

MIT
