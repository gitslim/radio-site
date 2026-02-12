<script lang="ts" module>
	import type { ComponentProps } from 'svelte';

	export interface HeroSectionProps {
		/** Hero image path */
		imageUrl?: string;
		/** Parallax speed multiplier (default: 0.3) */
		speed?: number;
		/** CTA button text (default: "Смотреть каталог") */
		ctaText?: string;
		/** CTA button link (default: "/equipment") */
		ctaLink?: string;
		/** Hero tagline */
		tagline?: string;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { loadHeroImage } from '$lib/utils/image.js';
	import ParallaxSection from '$lib/components/animations/ParallaxSection.svelte';
	import { Button } from '$lib/components/ui/button';

	let {
		imageUrl = '/images/optimized/hero-001-1920w.webp',
		speed = 0.3,
		ctaText = 'Смотреть каталог',
		ctaLink = '/equipment',
		tagline = 'Профессиональное съёмочное оборудование'
	}: HeroSectionProps = $props();

	let imageLoaded = $state(false);
	let imageError = $state(false);

	function handleImageLoad(): void {
		imageLoaded = true;
	}

	function handleImageError(): void {
		imageError = true;
	}
</script>

<section class="relative w-full h-[600px] overflow-hidden bg-muted" aria-label="Hero section">
	{#if !imageError}
		<!-- Parallax background image -->
		<ParallaxSection {speed}>
			<div class="absolute inset-0 w-full h-full">
				<img
					src={imageUrl}
					alt="Hero background"
					class={cn(
						'w-full h-full object-cover transition-opacity duration-700',
						imageLoaded ? 'opacity-100' : 'opacity-0'
					)}
					onload={handleImageLoad}
					onerror={handleImageError}
					loading="eager"
					decoding="async"
				/>
			</div>
		</ParallaxSection>

		<!-- Gradient overlay for text readability -->
		<div
			class="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/80"
			aria-hidden="true"
		></div>
	{/if}

	<!-- Content overlay -->
	<div class="absolute inset-0 flex flex-col items-center justify-center px-4">
		<h1
			class="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 drop-shadow-lg max-w-4xl"
		>
			{tagline}
		</h1>

		<!-- CTA Button -->
		<Button
			variant="default"
			size="lg"
			class="group px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
			onclick={() => {
				window.location.href = ctaLink;
			}}
		>
			{ctaText}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="ml-2 transition-transform duration-300 group-hover:translate-x-1"
				aria-hidden="true"
			>
				<path d="M5 12h14" />
				<path d="m12 5 7 7-7 7" />
			</svg>
		</Button>
	</div>
</section>
