 <script lang="ts">
	// Yandex Maps JavaScript API - Enhanced version with custom balloon and large marker

	// Import Svelte 5 runes for reactive state management
	import { onMount } from 'svelte';
	import { companyInfo } from '$lib/data/company';
	import { PUBLIC_YANDEX_MAPS_API_KEY } from '$env/static/public';

	// Reactive state using Svelte 5 runes
	let mapError = $state<string | false>(false);
	let mapLoaded = $state(false);
	let mapContainer: HTMLDivElement;

	// Company coordinates [latitude, longitude] for Yandex Maps JS API
	// Note: Yandex Maps JS API uses [latitude, longitude] order (different from iframe)
	const companyCoords = [55.67, 37.66];

	// Company information
	const COMPANY_NAME = 'ООО «Радиотехника-К»';
	const COMPANY_ADDRESS = '115533, город Москва, Нагатинская наб., д. 10 к. 3, кв. 56';

	// API key from environment variable
	const API_KEY = PUBLIC_YANDEX_MAPS_API_KEY || '';

	onMount(async () => {
		try {
			// Validate API key presence
			if (!API_KEY) {
				throw new Error(
					'Yandex Maps API key is missing. Please add VITE_YANDEX_MAPS_API_KEY to .env file. ' +
						'Get API key from: https://developer.tech.yandex.ru/'
				);
			}

			// Load Yandex Maps JS API dynamically
			await loadYandexMapsScript(API_KEY);

			// Initialize map after script loads
			initMap();

			mapLoaded = true;
		} catch (error) {
			console.error('Yandex Maps initialization failed:', error);
			mapError = error instanceof Error ? error.message : 'Unknown error occurred';
		}
	});

	/**
	 * Dynamically load Yandex Maps JavaScript API script
	 */
	async function loadYandexMapsScript(apiKey: string): Promise<void> {
		return new Promise((resolve, reject) => {
			// Check if ymaps is already loaded
			// @ts-ignore - ymaps is a global from Yandex Maps API
			if (typeof ymaps !== 'undefined') {
				resolve();
				return;
			}

			// Create and append script element
			const script = document.createElement('script');
			script.src = `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`;
			script.onload = () => resolve();
			script.onerror = () => reject(new Error('Failed to load Yandex Maps API script'));
			document.head.appendChild(script);
		});
	}

	/**
	 * Initialize Yandex Map with placemark and balloon
	 */
	function initMap() {
		// @ts-ignore - ymaps is a global from Yandex Maps API
		ymaps.ready(() => {
			// @ts-ignore
			const map = new ymaps.Map('yandex-map', {
				center: companyCoords,
				zoom: 16,
				controls: ['zoomControl']
			});

			// Create placemark with custom balloon content
			// @ts-ignore
			const placemark = new ymaps.Placemark(
				companyCoords,
				{
					hintContent: COMPANY_NAME,
					balloonContentHeader: `<strong>${COMPANY_NAME}</strong>`,
					balloonContentBody: `
            <div style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.5;">
              <p style="margin: 0 0 12px 0;">
                <strong style="display: block; margin-bottom: 4px;">Адрес:</strong>
                ${COMPANY_ADDRESS}
              </p>
              <p style="margin: 0 0 12px 0;">
                <strong style="display: block; margin-bottom: 4px;">Телефон:</strong>
                ${companyInfo.phone}
              </p>
              <a
                href="tel:${companyInfo.phone.replace(/ /g, '')}"
                style="
                  display: inline-block;
                  padding: 8px 16px;
                  background-color: #ef4444;
                  color: white;
                  text-decoration: none;
                  border-radius: 6px;
                  font-weight: 500;
                  font-size: 14px;
                  transition: background-color 0.2s;
                "
                onmouseover="this.style.backgroundColor='#dc2626'"
                onmouseout="this.style.backgroundColor='#ef4444'"
              >
                📞 Позвонить
              </a>
            </div>
          `,
					balloonContentFooter: 'Нажмите для получения маршрута'
				},
				{
					// Use large red dot icon (more prominent)
					preset: 'islands#redDotIconWithCaption',
					iconColor: '#ef4444',
					iconCaptionMaxWidth: 200
				}
			);

			// Add placemark to map
			// @ts-ignore
			map.geoObjects.add(placemark);

			// Open balloon automatically on map load
			placemark.balloon.open();
		});
	}
</script>

<div class="map-container w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-md">
	{#if mapError}
		<!-- Error state: display user-friendly error message -->
		<div
			class="flex flex-col items-center justify-center h-full bg-red-50 border border-red-200 p-6 text-center"
		>
			<svg
				class="w-12 h-12 text-red-400 mb-3"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<p class="text-red-800 font-medium mb-2">Карта временно недоступна</p>
			<p class="text-red-600 text-sm max-w-md">{mapError}</p>
			<p class="text-red-600 text-xs mt-3">
				Пожалуйста, свяжитесь с администратором для решения проблемы.
			</p>
		</div>
	{:else}
		<!-- Map container: Yandex Maps will render here -->
		<div
			id="yandex-map"
			bind:this={mapContainer}
			style="width: 100%; height: 100%;"
			title="Карта расположения ООО Радиотехника-К"
			aria-label="Карта расположения ООО Радиотехника-К"
		></div>
	{/if}
</div>
