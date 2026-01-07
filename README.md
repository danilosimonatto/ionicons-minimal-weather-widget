# Ionicons Minimal Weather Widget

A tiny, framework-agnostic weather widget custom element powered by Ionicons. Displays current weather for a city using beautiful icons.

## Install

```sh
npm install @ionicons-minimal-weather-widget
# or
yarn add @ionicons-minimal-weather-widget
```

## Usage

Just include the bundled JS file on your site/app:

```js
import "@ionicons-minimal-weather-widget";
```

Or, if importing directly:

```js
import "@ionicons-minimal-weather-widget/weather-widget.js";
```

You can then use the custom element in your HTML:

```html
<weather-widget
	city="Milan"
	scale="C"
	icon-style="filled"
></weather-widget>
```

## Options

| Attribute    | Type                             | Description                                          | Example      |
| ------------ | -------------------------------- | ---------------------------------------------------- | ------------ |
| `city`       | `string` (required)              | City name to fetch weather for                       | `Milan`      |
| `scale`      | `"C"`/`"F"`                      | Temperature units. Celsius (default) or Farenheit    | `F`          |
| `icon-style` | `"filled"`/`"outline"`/`"sharp"` | Ionicon style (default: `filled`)                    | `outline`    |
| `api-key`    | `string` (optional)              | OpenWeatherMap API key override (usually not needed) | `yourApiKey` |

## Example

```html
<weather-widget
	city="San Francisco"
	scale="F"
	icon-style="outline"
></weather-widget>
```

## Features

- 🌀 Framework-agnostic — use anywhere (Astro, React, Vue, plain HTML, etc.)
- ⛅ Uses Ionicons for beautiful weather icons
- 🎨 Customizable icon style and units
- 🔐 Optionally set your own OpenWeather API key

## License

MIT
