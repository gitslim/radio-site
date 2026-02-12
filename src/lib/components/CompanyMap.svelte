<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const companyAddress = [55.67, 37.66]; // [latitude, longitude]
	const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
	let Map = $state<any>();
	let TileLayer = $state<any>();
	let Marker = $state<any>();
	let Popup = $state<any>();
	let mapLoaded = $state(false);

	onMount(async () => {
		if (browser) {
			const sveaflet = await import('sveaflet');
			Map = sveaflet.Map;
			TileLayer = sveaflet.TileLayer;
			Marker = sveaflet.Marker;
			Popup = sveaflet.Popup;
			mapLoaded = true;
		}
	});
</script>

 {#if browser && mapLoaded}
	<div class="map-container w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-md">
		<svelte:component this={Map}
			options={{
				center: companyAddress,
				zoom: 15,
				zoomControl: true,
				attributionControl: true
			}}
		>
			<svelte:component this={TileLayer}
				url={tileUrl}
				options={{
					maxZoom: 19,
					attribution:
						'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				}}
			/>

			<svelte:component this={Marker} latLng={companyAddress}>
				<svelte:component this={Popup}
					options={{
						maxWidth: 300,
						closeButton: true,
						className: 'custom-popup'
					}}
				>
					<div class="p-2">
						<h3 class="font-bold text-lg mb-2">ООО «Радиотехника-к»</h3>
						<p class="text-sm mb-1">
							<strong>Адрес:</strong><br />
							115533, город Москва,<br />
							Нагатинская наб., д. 10 к. 3, кв. 56
						</p>
						<p class="text-sm">
							<strong>Телефон:</strong> 8 495 921 9550
						</p>
					</div>
				</svelte:component>
			</svelte:component>
		</svelte:component>
	</div>
{/if}

<style>
	:global(.leaflet-container) {
		font-family: inherit;
	}

	:global(.custom-popup .leaflet-popup-content-wrapper) {
		border-radius: 8px;
	}
</style>
