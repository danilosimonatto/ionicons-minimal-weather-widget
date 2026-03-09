const u = `:host {
	--color-primary: #000;
	--icon-color: #fff;
	display: inline-block;
}

:host-context(:root[data-theme="light"]) {
	--icon-color: #000;
}

:host-context(:root[data-theme="dark"]) {
	--icon-color: #fff;
}

.weather-widget {
	display: inline-flex;
	flex-direction: column;
	gap: 8px;
	color: var(--color-primary, #000);
	text-align: center;
	font-size: 1rem;
	font-family:
		system-ui,
		-apple-system,
		BlinkMacSystemFont,
		"Segoe UI",
		Roboto,
		Oxygen,
		Ubuntu,
		Cantarell,
		sans-serif;
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

.icon {
	width: 1.2em;
	height: 1.2em;
	display: inline-block;
	flex-shrink: 0;
	background-color: var(--icon-color, #000);
	-webkit-mask-position: center;
	-webkit-mask-repeat: no-repeat;
	-webkit-mask-size: contain;
	mask-position: center;
	mask-repeat: no-repeat;
	mask-size: contain;
}
`, M = `<div
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
		<span
			class="icon"
			part="icon"
			aria-hidden="true"
		></span>
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
`, x = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M376 432H116c-32.37 0-60.23-8.57-80.59-24.77C12.24 388.78 0 361.39 0 328c0-57.57 42-90.58 87.56-100.75a16 16 0 0 0 12.12-12.39c7.68-36.68 24.45-68.15 49.18-92A153.57 153.57 0 0 1 256 80c35.5 0 68.24 11.69 94.68 33.8a156.24 156.24 0 0 1 42.05 56 16 16 0 0 0 11.37 9.16c27 5.61 51.07 17.33 69.18 33.85C498.61 235.88 512 267.42 512 304c0 36-14.38 68.88-40.49 92.59C446.36 419.43 412.44 432 376 432'/></svg>", y = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M340 480H106c-29.5 0-54.92-7.83-73.53-22.64C11.23 440.44 0 415.35 0 384.8c0-29.44 12.09-54.25 35-71.74 12.1-9.26 27.2-16.17 43.33-20.05a16 16 0 0 0 11.81-12.21c7.15-32.54 22.25-60.49 44.33-81.75A139.82 139.82 0 0 1 232 160c32.33 0 62.15 10.65 86.24 30.79a142.2 142.2 0 0 1 37.65 49.54 16.06 16.06 0 0 0 11.12 9c24 5.22 45.42 15.78 61.62 30.56C451.77 301 464 329.82 464 363.2c0 32.85-13.13 62.87-37 84.52-22.89 20.82-53.8 32.28-87 32.28M510.53 209.79a16.34 16.34 0 0 0-1.35-15.8 16 16 0 0 0-19.57-5.58c-10.7 4.65-24.48 7.17-39.92 7.28-55.3.4-101.38-45-101.38-100.31 0-15.75 2.48-29.84 7.18-40.76a16.3 16.3 0 0 0-1.85-16.33 16 16 0 0 0-19.1-5c-38.63 16.82-66.18 51.51-75.27 92.54a4 4 0 0 0 3.19 4.79 162.54 162.54 0 0 1 76.31 35.59 172.6 172.6 0 0 1 39.64 47.84 16.35 16.35 0 0 0 9.54 7.64c23.89 7.17 45.1 18.9 62.25 34.54q4.44 4.07 8.48 8.42a4 4 0 0 0 5.16.57 129.1 129.1 0 0 0 46.69-55.43'/></svg>", f = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M388.31 272c47.75 0 89.77-27.77 107.69-68.92-14.21 6.18-30.9 8.61-47.38 8.61A116.31 116.31 0 0 1 332.31 95.38c0-16.48 2.43-33.17 8.61-47.38C299.77 65.92 272 107.94 272 155.69a116.3 116.3 0 0 0 3.44 28.18' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/><path d='M90.61 306.85A16.07 16.07 0 0 0 104 293.6C116.09 220.17 169.63 176 232 176c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0 0 12.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H106c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95Z' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>", C = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M340 480H106c-29.5 0-54.92-7.83-73.53-22.64C11.23 440.44 0 415.35 0 384.8c0-29.44 12.09-54.25 35-71.74 14.55-11.13 33.41-18.87 53.2-22 6.06-36.92 21.92-68.53 46.29-92A139.82 139.82 0 0 1 232 160c32.33 0 62.15 10.65 86.24 30.79a142.4 142.4 0 0 1 40.83 57.05c27.18 4.48 51.59 15.68 69.56 32.08C451.77 301 464 329.82 464 363.2c0 32.85-13.13 62.87-37 84.52-22.89 20.82-53.8 32.28-87 32.28M381.55 219.93c26.5 6.93 50 19.32 68.65 36.34q3.89 3.56 7.47 7.34c25.41-18.4 45.47-44.92 54.33-71.38-16.24 7.07-35.31 9.85-54.15 9.85-73.42 0-115.93-42.51-115.93-115.93 0-18.84 2.78-37.91 9.85-54.15-40.41 13.53-81 53.19-92.52 98.13a162.6 162.6 0 0 1 79.52 36.12 173 173 0 0 1 42.78 53.68'/></svg>", k = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M100.18 241.19a15.93 15.93 0 0 0 13.37-13.25C126.6 145.59 186.34 96 256 96c64.69 0 107.79 42.36 124.92 87a16.11 16.11 0 0 0 12.53 10.18C449.36 202.06 496 239.21 496 304c0 66-54 112-120 112H116c-55 0-100-27.44-100-88 0-54.43 43.89-80.81 84.18-86.81Z' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>", A = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M376 432H116c-32.37 0-60.23-8.57-80.59-24.77C12.24 388.78 0 361.39 0 328c0-61.85 48.44-95.34 97.75-102.64 6.52-41.18 24-76.4 51.11-102.46A153.57 153.57 0 0 1 256 80c35.5 0 68.24 11.69 94.68 33.8a156.4 156.4 0 0 1 45.22 63.61c30.26 4.81 57.45 17.18 77.38 35.36C498.61 235.88 512 267.42 512 304c0 36-14.38 68.88-40.49 92.59C446.36 419.43 412.44 432 376 432'/></svg>", d = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64m-6 304a20 20 0 1 1 20-20 20 20 0 0 1-20 20m33.44-102C267.23 276.88 265 286.85 265 296a14 14 0 0 1-28 0c0-21.91 10.08-39.33 30.82-53.26C287.1 229.8 298 221.6 298 203.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 191.25 214 202.83 214 203a14 14 0 1 1-28-1.35c.11-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82C312.7 161.34 326 180.43 326 203.57c0 33.83-22.61 49.02-42.56 62.43'/></svg>", S = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M256 80a176 176 0 1 0 176 176A176 176 0 0 0 256 80Z' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><path d='M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296' stroke-linecap='round' stroke-miterlimit='10' stroke-width='28px' class='ionicon-fill-none'/><circle cx='250' cy='348' r='20'/></svg>", b = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M288.55 150.84c-8.09-3.86-20-6-32.72-5.82-18 .22-33.13 5.2-45 14.78-23 18.48-24.55 40.37-24.77 42.8a61.7 61.7 0 0 0-.09 12 3 3 0 0 0 3 2.69h21.23a3 3 0 0 0 3-3A66 66 0 0 1 214 204c0-.11 1.14-11.7 14.36-22.34 7-5.64 16.11-8.44 27.83-8.59 9.32-.11 16.93 1.47 20.34 3.09C291 183 298 192.31 298 204.57c0 18-10.9 26.23-30.18 39.18C247.08 257.68 237 275.1 237 297v11a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3v-11c0-9.16 2.23-19.13 18.44-30 19.95-13.41 42.56-28.6 42.56-62.43 0-23.14-13.3-42.23-37.45-53.73' class='ionicon-fill-none'/><path d='M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64m10.44 302h-30.21a2.57 2.57 0 0 1-2.56-2.57v-30.2a2.57 2.57 0 0 1 2.56-2.57h30.21a2.57 2.57 0 0 1 2.56 2.57v30.2a2.57 2.57 0 0 1-2.56 2.57m17-99C267.23 277.88 265 287.85 265 297v11a3 3 0 0 1-3 3h-22a3 3 0 0 1-3-3v-11c0-21.91 10.08-39.33 30.82-53.26C287.1 230.8 298 222.6 298 204.57c0-12.26-7-21.57-21.49-28.46-3.41-1.62-11-3.2-20.34-3.09-11.72.15-20.82 2.95-27.83 8.59C215.12 192.25 214 203.84 214 204a66 66 0 0 0-.84 10.28 3 3 0 0 1-3 3h-21.25a3 3 0 0 1-3-2.69 61.7 61.7 0 0 1 .09-12c.22-2.43 1.8-24.32 24.77-42.8 11.91-9.58 27.06-14.56 45-14.78 12.7-.15 24.63 2 32.72 5.82 24.21 11.51 37.51 30.6 37.51 53.74 0 33.83-22.61 49.02-42.56 62.43'/></svg>", B = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480'/></svg>", L = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>", z = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M152.62 126.77c0-33 4.85-66.35 17.23-94.77C87.54 67.83 32 151.89 32 247.38 32 375.85 136.15 480 264.62 480c95.49 0 179.55-55.54 215.38-137.85-28.42 12.38-61.8 17.23-94.77 17.23-128.47 0-232.61-104.14-232.61-232.61'/></svg>", H = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M340 480H106c-29.5 0-54.92-7.83-73.53-22.64C11.23 440.44 0 415.35 0 384.8c0-26.66 10.08-49.8 29.14-66.91 15.24-13.68 36.17-23.21 59-26.84.06 0 .08 0 .09-.05 6.44-39 23.83-72.09 50.31-95.68A140.24 140.24 0 0 1 232 160c30.23 0 58.48 9.39 81.71 27.17a142.24 142.24 0 0 1 42.19 53.21 16 16 0 0 0 11.19 9c26 5.61 48.4 17.29 65.17 34C453 304.11 464 331.71 464 363.2c0 32.85-13.13 62.87-37 84.52-22.89 20.82-53.8 32.28-87 32.28M387.89 221.68a168.8 168.8 0 0 1 34.76 14.71 4 4 0 0 0 5.82-2.44 97 97 0 0 0 3.53-26.68c-.39-52.43-43.48-95.22-95.91-95.27A95.46 95.46 0 0 0 281 129.33h-.06a3.38 3.38 0 0 0 1 6 162.5 162.5 0 0 1 51.28 26.4 173.9 173.9 0 0 1 45.32 52.51 16 16 0 0 0 9.35 7.44M496 224h-32a16 16 0 0 1 0-32h32a16 16 0 0 1 0 32M336 96a16 16 0 0 1-16-16V48a16 16 0 0 1 32 0v32a16 16 0 0 1-16 16M245.49 133.49a15.92 15.92 0 0 1-11.31-4.69l-22.63-22.62a16 16 0 0 1 22.63-22.63l22.62 22.63a16 16 0 0 1-11.31 27.31M426.51 133.49a16 16 0 0 1-11.31-27.31l22.62-22.63a16 16 0 0 1 22.63 22.63l-22.63 22.62a15.92 15.92 0 0 1-11.31 4.69'/></svg>", O = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M90.61 306.85A16.07 16.07 0 0 0 104 293.6C116.09 220.17 169.63 176 232 176c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0 0 12.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H106c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95Z' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/><path d='M384.8 271.4a80 80 0 1 0-123.55-92M464 208h32M336 48v32M222.86 94.86l22.63 22.63M449.14 94.86l-22.63 22.63' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>", E = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M340 480H106c-29.5 0-54.92-7.83-73.53-22.64C11.23 440.44 0 415.35 0 384.8c0-26.66 10.08-49.8 29.14-66.91 15.24-13.68 36.17-23.21 59-26.84.06 0 .08 0 .09-.05 6.44-39 23.83-72.09 50.31-95.68A140.24 140.24 0 0 1 232 160c30.23 0 58.48 9.39 81.71 27.17a142.7 142.7 0 0 1 45.36 60.66c29.41 4.82 54.72 17.11 73.19 35.54C453 304.11 464 331.71 464 363.2c0 32.85-13.13 62.87-37 84.52-22.89 20.82-53.8 32.28-87 32.28M381.5 219.89a169.2 169.2 0 0 1 45.44 19A96 96 0 0 0 281 129.33q-2.85 2-5.54 4.2a162.5 162.5 0 0 1 57.73 28.23 174.5 174.5 0 0 1 48.31 58.13M448 192h64v32h-64zM320 32h32v64h-32zM255.35 129.63l12.45-12.45-44.62-44.63-22.63 22.63 33.17 33.17h.6a172 172 0 0 1 21.03 1.28M404.203 117.17l44.626-44.625 22.627 22.628-44.625 44.625z'/></svg>", j = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M456.26 139.37c-16.77-16.73-39.17-28.41-65.17-34a16 16 0 0 1-11.19-9 142.24 142.24 0 0 0-42.19-53.21C314.48 25.39 286.23 16 256 16a140.24 140.24 0 0 0-93.5 35.32c-24.2 21.56-40.91 51.34-48.43 85.83a16.05 16.05 0 0 1-11.72 12.18c-25 6.3-35.71 12.54-49.21 24.56C34 190.93 24 214.14 24 240.8c0 30.55 11.23 55.64 32.47 72.56C75.08 328.17 100.5 336 130 336h234c33.2 0 64.11-11.46 87-32.28 23.84-21.65 37-51.67 37-84.52 0-31.49-11-59.09-31.74-79.83M112 448a16 16 0 0 1-13.3-24.88l32-48a16 16 0 0 1 26.62 17.76l-32 48A16 16 0 0 1 112 448M160 496a16 16 0 0 1-13.29-24.88l64-96a16 16 0 0 1 26.62 17.76l-64 96A16 16 0 0 1 160 496M272 448a16 16 0 0 1-13.3-24.88l32-48a16 16 0 0 1 26.62 17.76l-32 48A16 16 0 0 1 272 448M320 496a16 16 0 0 1-13.3-24.88l64-96a16 16 0 0 1 26.62 17.76l-64 96A16 16 0 0 1 320 496'/></svg>", q = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M114.61 162.85A16.07 16.07 0 0 0 128 149.6C140.09 76.17 193.63 32 256 32c57.93 0 96.62 37.75 112.2 77.74a15.84 15.84 0 0 0 12.2 9.87c50 8.15 91.6 41.54 91.6 99.59 0 59.4-48.6 100.8-108 100.8H130c-49.5 0-90-24.7-90-79.2 0-48.47 38.67-72.22 74.61-77.95Z' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/><path d='m144 384-32 48M224 384l-64 96M304 384l-32 48M384 384l-64 96' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>", I = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M364 336H130c-29.5 0-54.92-7.83-73.53-22.64C35.23 296.44 24 271.35 24 240.8c0-26.66 10.08-49.8 29.14-66.91 15.24-13.68 36.17-23.21 59-26.84.06 0 .08 0 .09-.05 6.44-39 23.83-72.09 50.31-95.68A140.24 140.24 0 0 1 256 16c30.23 0 58.48 9.39 81.71 27.17a142.7 142.7 0 0 1 45.36 60.66c29.41 4.82 54.72 17.11 73.19 35.54C477 160.11 488 187.71 488 219.2c0 32.85-13.13 62.87-37 84.52-22.89 20.82-53.8 32.28-87 32.28M93.82 430.422l49.75-74.626 26.626 17.75-49.751 74.627zM141.816 478.429 223.568 355.8l26.625 17.75-81.751 122.628zM253.811 430.424l49.751-74.626 26.626 17.75-49.751 74.627zM301.808 478.43l81.752-122.627 26.625 17.75-81.751 122.628z'/></svg>", V = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='m461 349-34-19.64a89.5 89.5 0 0 1 20.94-16 22 22 0 0 0-21.28-38.51 133.6 133.6 0 0 0-38.55 32.1L300 256l88.09-50.86a133.5 133.5 0 0 0 38.55 32.1 22 22 0 1 0 21.28-38.51 89.7 89.7 0 0 1-20.94-16l34-19.64A22 22 0 1 0 439 125l-34 19.63a89.7 89.7 0 0 1-3.42-26.15A22 22 0 0 0 380 96h-.41a22 22 0 0 0-22 21.59 133.6 133.6 0 0 0 8.5 49.41L278 217.89V116.18a133.5 133.5 0 0 0 47.07-17.33 22 22 0 0 0-22.71-37.69A89.6 89.6 0 0 1 278 71.27V38a22 22 0 0 0-44 0v33.27a89.6 89.6 0 0 1-24.36-10.11 22 22 0 1 0-22.71 37.69A133.5 133.5 0 0 0 234 116.18v101.71L145.91 167a133.6 133.6 0 0 0 8.52-49.43 22 22 0 0 0-22-21.59H132a22 22 0 0 0-21.59 22.41 89.7 89.7 0 0 1-3.41 26.19L73 125a22 22 0 1 0-22 38.1l34 19.64a89.7 89.7 0 0 1-20.94 16 22 22 0 1 0 21.28 38.51 133.6 133.6 0 0 0 38.55-32.1L212 256l-88.09 50.86a133.6 133.6 0 0 0-38.55-32.1 22 22 0 1 0-21.28 38.51 89.7 89.7 0 0 1 20.94 16L51 349a22 22 0 1 0 22 38.1l34-19.63a89.7 89.7 0 0 1 3.42 26.15A22 22 0 0 0 132 416h.41a22 22 0 0 0 22-21.59 133.6 133.6 0 0 0-8.5-49.41L234 294.11v101.71a133.5 133.5 0 0 0-47.07 17.33 22 22 0 1 0 22.71 37.69A89.6 89.6 0 0 1 234 440.73V474a22 22 0 0 0 44 0v-33.27a89.6 89.6 0 0 1 24.36 10.11 22 22 0 0 0 22.71-37.69A133.5 133.5 0 0 0 278 395.82V294.11L366.09 345a133.6 133.6 0 0 0-8.52 49.43 22 22 0 0 0 22 21.59h.43a22 22 0 0 0 21.59-22.41 89.7 89.7 0 0 1 3.41-26.19l34 19.63A22 22 0 1 0 461 349'/></svg>", N = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M256 32v448M313.72 80A111.47 111.47 0 0 1 256 96a111.47 111.47 0 0 1-57.72-16M198.28 432a112.11 112.11 0 0 1 115.44 0M449.99 144 62.01 368M437.27 218a112.09 112.09 0 0 1-57.71-100M74.73 294a112.09 112.09 0 0 1 57.71 100M62.01 144l387.98 224M74.73 218a112.09 112.09 0 0 0 57.71-100M437.27 294a112.09 112.09 0 0 0-57.71 100' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>", P = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='m447.88 313.27 19.25-10.64-21.28-38.51-19.25 10.64a133.4 133.4 0 0 0-38.54 32.1L300 256l88.07-50.86a133.4 133.4 0 0 0 38.54 32.1l19.25 10.64 21.28-38.51-19.25-10.64a89.3 89.3 0 0 1-20.93-16L480 152.05 458 114l-53 30.58a89 89 0 0 1-3.42-26.15l.41-22-44-.82-.41 22a133.6 133.6 0 0 0 8.49 49.39L278 217.89V116.18a133.5 133.5 0 0 0 47.06-17.33L343.9 87.5l-22.71-37.69-18.84 11.35A89.5 89.5 0 0 1 278 71.27V16h-44v55.27a89.5 89.5 0 0 1-24.35-10.11l-18.84-11.35L168.1 87.5l18.84 11.35A133.5 133.5 0 0 0 234 116.18v101.71L145.93 167a133.6 133.6 0 0 0 8.53-49.43l-.41-22-44 .82.41 22a89 89 0 0 1-3.42 26.15L54 114l-22 38.1 53.05 30.64a89.3 89.3 0 0 1-20.93 16l-19.25 10.63 21.28 38.51 19.25-10.64a133.4 133.4 0 0 0 38.54-32.1L212 256l-88.07 50.86a133.4 133.4 0 0 0-38.54-32.1l-19.24-10.64-21.28 38.51 19.25 10.64a89.3 89.3 0 0 1 20.93 16L32 360l22 38.1 53.05-30.63a89 89 0 0 1 3.42 26.15l-.41 22 44 .82.41-22a133.6 133.6 0 0 0-8.54-49.44L234 294.11v101.71a133.5 133.5 0 0 0-47.06 17.33L168.1 424.5l22.71 37.69 18.84-11.35A89.5 89.5 0 0 1 234 440.73V496h44v-55.27a89.5 89.5 0 0 1 24.35 10.11l18.84 11.35 22.71-37.69-18.84-11.35A133.5 133.5 0 0 0 278 395.82V294.11L366.07 345a133.6 133.6 0 0 0-8.53 49.43l.41 22 44-.82-.41-22a89 89 0 0 1 3.46-26.19l53 30.63L480 360l-53-30.69a89.3 89.3 0 0 1 20.88-16.04'/></svg>", $ = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M256 118a22 22 0 0 1-22-22V48a22 22 0 0 1 44 0v48a22 22 0 0 1-22 22M256 486a22 22 0 0 1-22-22v-48a22 22 0 0 1 44 0v48a22 22 0 0 1-22 22M369.14 164.86a22 22 0 0 1-15.56-37.55l33.94-33.94a22 22 0 0 1 31.11 31.11l-33.94 33.94a21.93 21.93 0 0 1-15.55 6.44M108.92 425.08a22 22 0 0 1-15.55-37.56l33.94-33.94a22 22 0 1 1 31.11 31.11l-33.94 33.94a21.94 21.94 0 0 1-15.56 6.45M464 278h-48a22 22 0 0 1 0-44h48a22 22 0 0 1 0 44M96 278H48a22 22 0 0 1 0-44h48a22 22 0 0 1 0 44M403.08 425.08a21.94 21.94 0 0 1-15.56-6.45l-33.94-33.94a22 22 0 0 1 31.11-31.11l33.94 33.94a22 22 0 0 1-15.55 37.56M142.86 164.86a21.9 21.9 0 0 1-15.55-6.44l-33.94-33.94a22 22 0 0 1 31.11-31.11l33.94 33.94a22 22 0 0 1-15.56 37.55M256 358a102 102 0 1 1 102-102 102.12 102.12 0 0 1-102 102'/></svg>", U = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94' stroke-linecap='round' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/><circle cx='256' cy='256' r='80' stroke-linecap='round' stroke-miterlimit='10' class='ionicon-fill-none ionicon-stroke-width'/></svg>", R = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M234 26h44v92h-44zM234 394h44v92h-44zM338.025 142.857l65.054-65.054 31.113 31.113-65.054 65.054zM77.815 403.074l65.054-65.054 31.113 31.113-65.054 65.054zM394 234h92v44h-92zM26 234h92v44H26zM338.029 369.14l31.112-31.113 65.054 65.054-31.112 31.112zM77.802 108.92l31.113-31.113 65.054 65.054-31.113 31.112zM256 358a102 102 0 1 1 102-102 102.12 102.12 0 0 1-102 102'/></svg>", _ = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M96 416a16 16 0 0 1-14.3-23.16l24-48a16 16 0 0 1 28.62 14.32l-24 48A16 16 0 0 1 96 416M120 480a16 16 0 0 1-14.3-23.16l16-32a16 16 0 0 1 28.62 14.32l-16 32A16 16 0 0 1 120 480M376 416a16 16 0 0 1-14.3-23.16l24-48a16 16 0 0 1 28.62 14.32l-24 48A16 16 0 0 1 376 416M400 480a16 16 0 0 1-14.3-23.16l16-32a16 16 0 0 1 28.62 14.32l-16 32A16 16 0 0 1 400 480'/><path d='M405.84 136.9a151.25 151.25 0 0 0-47.6-81.9 153 153 0 0 0-241.81 51.86C60.5 110.16 16 156.65 16 213.33 16 272.15 63.91 320 122.8 320h66.31l-12.89 77.37A16 16 0 0 0 192 416h32v64a16 16 0 0 0 29 9.3l80-112a16 16 0 0 0-13-25.3h-27.51l8-32h103.84a91.56 91.56 0 0 0 1.51-183.1'/></svg>", F = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='m120 352-24 48M136 432l-16 32M400 352l-24 48M416 432l-16 32M208 304l-16 96h48v80l80-112h-48l16-64M404.33 152.89H392.2C384.71 84.85 326.14 32 256 32a136.39 136.39 0 0 0-128.63 90.67h-4.57c-49.94 0-90.8 40.8-90.8 90.66h0C32 263.2 72.86 304 122.8 304h281.53C446 304 480 270 480 228.44h0c0-41.55-34-75.55-75.67-75.55' stroke-linecap='round' stroke-linejoin='round' class='ionicon-fill-none ionicon-stroke-width'/></svg>", Z = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' class='ionicon'><path d='M405.84 136.9a151.25 151.25 0 0 0-47.6-81.9 153 153 0 0 0-241.81 51.86C60.5 110.16 16 156.65 16 213.33 16 272.15 63.91 320 122.8 320h72.31L176 416h48v80l112-144h-43.51l8-32h103.84a91.56 91.56 0 0 0 1.51-183.1'/><path d='m74.53 407.177 38.32-76.622 28.62 14.313-38.32 76.623zM98.52 471.189l30.318-60.622 28.62 14.313-30.317 60.622zM354.541 407.189l38.32-76.623 28.62 14.314-38.32 76.622zM378.542 471.2l30.317-60.622 28.62 14.314-30.317 60.621z'/></svg>", T = (n) => String(n || "").toUpperCase() === "F" ? "F" : "C", W = (n) => n === "outline" || n === "sharp" || n === "filled" ? n : "filled", K = (n, t) => t === "filled" ? n : `${n}-${t}`, D = {
  sunny: $,
  "sunny-outline": U,
  "sunny-sharp": R,
  moon: B,
  "moon-outline": L,
  "moon-sharp": z,
  "partly-sunny": H,
  "partly-sunny-outline": O,
  "partly-sunny-sharp": E,
  cloudy: x,
  "cloudy-outline": k,
  "cloudy-sharp": A,
  "cloudy-night": y,
  "cloudy-night-outline": f,
  "cloudy-night-sharp": C,
  rainy: j,
  "rainy-outline": q,
  "rainy-sharp": I,
  thunderstorm: _,
  "thunderstorm-outline": F,
  "thunderstorm-sharp": Z,
  snow: V,
  "snow-outline": N,
  "snow-sharp": P,
  "help-circle": d,
  "help-circle-outline": S,
  "help-circle-sharp": b
}, J = {
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
class Y extends HTMLElement {
  static observedAttributes = ["city", "scale", "icon-style", "api-key"];
  #n = null;
  #a = this.attachShadow({ mode: "open" });
  #t = null;
  connectedCallback() {
    this.#i(), this.#s();
  }
  disconnectedCallback() {
    this.#n && this.#n.abort();
  }
  attributeChangedCallback() {
    this.isConnected && this.#s();
  }
  get city() {
    return (this.getAttribute("city") || "").trim();
  }
  get scale() {
    return T(this.getAttribute("scale"));
  }
  get iconStyle() {
    return W(this.getAttribute("icon-style"));
  }
  get apiKey() {
    return (this.getAttribute("api-key") || "").trim();
  }
  #i() {
    this.#a.innerHTML = `<style>${u}</style>${M}`;
    const t = this.#a.querySelector(".weather-widget");
    t && (this.#t = {
      root: t,
      loading: t.querySelector('[part="loading"]'),
      content: t.querySelector('[part="content"]'),
      city: t.querySelector('[part="city"]'),
      icon: t.querySelector('[part="icon"]'),
      temp: t.querySelector('[part="temperature"]'),
      error: t.querySelector('[part="error"]')
    });
  }
  #e() {
    this.#t && (this.#t.loading.hidden = !1, this.#t.content.hidden = !0, this.#t.error.hidden = !0);
  }
  #o(t) {
    this.#t && (this.#t.loading.hidden = !0, this.#t.content.hidden = !0, this.#t.error.hidden = !1, this.#t.error.textContent = t);
  }
  #l({ cityName: t, iconName: a, tempText: o }) {
    if (!this.#t) return;
    this.#t.loading.hidden = !0, this.#t.error.hidden = !0, this.#t.content.hidden = !1, this.#t.city.textContent = t;
    const s = D[a] || d;
    this.#t.icon.style.webkitMaskImage = `url("${s}")`, this.#t.icon.style.maskImage = `url("${s}")`, this.#t.temp.textContent = o;
  }
  async #s() {
    const t = this.city;
    if (!t) {
      this.#o("Missing city");
      return;
    }
    this.#n && this.#n.abort(), this.#n = new AbortController(), this.#e();
    try {
      const a = this.apiKey;
      if (!a) throw new Error("Missing API key");
      const o = new URL("https://api.openweathermap.org/geo/1.0/direct");
      o.searchParams.set("q", t), o.searchParams.set("limit", "1"), o.searchParams.set("appid", a);
      const s = await fetch(o, { signal: this.#n.signal });
      if (!s.ok) throw new Error("City not found");
      const c = await s.json(), e = c && c[0];
      if (!e) throw new Error("City not found");
      const i = new URL(
        "https://api.openweathermap.org/data/2.5/weather"
      );
      i.searchParams.set("lat", String(e.lat)), i.searchParams.set("lon", String(e.lon)), i.searchParams.set("units", "metric"), i.searchParams.set("appid", a);
      const r = await fetch(i, {
        signal: this.#n.signal
      });
      if (!r.ok) throw new Error("Weather not available");
      const l = await r.json(), h = l?.main?.temp, w = this.scale === "F" ? Math.round(h * 9 / 5 + 32) : Math.round(h), g = l?.weather?.[0]?.icon, v = g && J[g] || "help-circle", m = K(v, this.iconStyle), p = l?.name || t;
      this.#l({
        cityName: p,
        iconName: m,
        tempText: `${w}°${this.scale}`
      });
    } catch (a) {
      if (a instanceof DOMException && a.name === "AbortError") return;
      const o = a instanceof Error ? a.message : "Failed to fetch weather";
      this.#o(o);
    }
  }
}
customElements.get("weather-widget") || customElements.define("weather-widget", Y);
