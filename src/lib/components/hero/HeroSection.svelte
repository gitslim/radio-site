<script lang="ts" module>
	import type { ComponentProps } from 'svelte';

	export interface HeroSectionProps {
		tagline?: string;
	}

	export type HeroImage = {
		id: string;
		src: string;
		alt: string;
		title: string;
		category: string;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { loadHeroImage } from '$lib/utils/image.js';
	import {
		Carousel,
		CarouselContent,
		CarouselItem,
		CarouselNext,
		CarouselPrevious
	} from '$lib/components/ui/carousel';

	let { tagline = 'Профессиональное съёмочное оборудование' }: HeroSectionProps = $props();

	let heroImages = $state<HeroImage[]>([]);
	let isLoading = $state(true);
	let error = $state<string | null>(null);
	let loadedImages = $state<Record<string, boolean>>({});

	async function loadHeroManifest(): Promise<void> {
		try {
			const response = await fetch('/images/hero-manifest.json');
			if (!response.ok) {
				throw new Error(`Failed to load hero manifest: ${response.statusText}`);
			}
			const data = await response.json();
			heroImages = data.images || [];
			isLoading = false;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unknown error occurred';
			isLoading = false;
		}
	}

	function handleImageLoad(imageId: string): void {
		loadedImages[imageId] = true;
	}

	function handleImageError(imageId: string): void {
		loadedImages[imageId] = false;
	}

	onMount(() => {
		loadHeroManifest();
	});
</script>

<section class="relative w-full h-[600px] overflow-hidden bg-muted" aria-label="Hero section">
	{#if isLoading}
		<div
			class="flex items-center justify-center h-full w-full"
			role="status"
			aria-live="polite"
		>
			<div class="text-center">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
				<p class="mt-4 text-muted-foreground">Загрузка...</p>
			</div>
		</div>
	{:else if error}
		<div
			class="flex items-center justify-center h-full w-full"
			role="alert"
			aria-live="assertive"
		>
			<div class="text-center p-6">
				<p class="text-destructive font-medium mb-2">Ошибка загрузки изображений</p>
				<p class="text-muted-foreground text-sm">{error}</p>
			</div>
		</div>
	{:else if heroImages.length > 0}
		<Carousel
			opts={{
				loop: true,
				align: 'center'
			}}
			class="w-full h-full"
		>
			<CarouselContent class="h-full">
				{#each heroImages as image (image.id)}
					<CarouselItem class="h-full">
						<div class="relative w-full h-full">
							<img
								src={loadHeroImage(image.id)}
								alt={image.alt}
								loading="lazy"
								class={cn(
									'w-full h-full object-cover transition-opacity duration-500',
									loadedImages[image.id] === false ? 'opacity-0' : 'opacity-100'
								)}
								onload={() => handleImageLoad(image.id)}
								onerror={() => handleImageError(image.id)}
							/>
							<!-- Gradient overlay for text readability -->
							<div
								class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"
								aria-hidden="true"
							></div>
							<!-- Tagline overlay -->
							<div class="absolute inset-0 flex items-center justify-center">
								<h1
									class="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center px-4 drop-shadow-lg"
								>
									{tagline}
								</h1>
							</div>
						</div>
					</CarouselItem>
				{/each}
			</CarouselContent>
			<CarouselPrevious class="hidden md:flex" />
			<CarouselNext class="hidden md:flex" />
		</Carousel>
	{:else}
		<!-- Fallback if no images are available -->
		<div class="flex items-center justify-center h-full w-full bg-gradient-to-br from-primary/10 to-primary/5">
			<h1
				class="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-center px-4"
			>
				{tagline}
			</h1>
		</div>
	{/if}
</section>
