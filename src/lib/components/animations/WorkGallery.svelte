<script lang="ts" module>
	import type { GalleryImage } from '$lib/data/gallery';

	export interface WorkGalleryProps {
		/** Gallery images to display */
		images: GalleryImage[];
		/** Maximum number of images to display (default: 8) */
		maxItems?: number;
		/** Show lightbox on image click (default: true) */
		showLightbox?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import GlassCard from '$lib/components/animations/GlassCard.svelte';
	import Lightbox from '$lib/components/gallery/Lightbox.svelte';

	let { images, maxItems = 8, showLightbox = true }: WorkGalleryProps = $props();

	let displayImages = $state<GalleryImage[]>([]);
	let lightboxOpen = $state(false);
	let currentLightboxIndex = $state(0);

	onMount(() => {
		// Limit to maxItems
		displayImages = images.slice(0, maxItems);
	});

	function openLightbox(index: number): void {
		if (!showLightbox) return;

		currentLightboxIndex = index;
		lightboxOpen = true;

		// Prevent body scroll when lightbox is open
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox(): void {
		lightboxOpen = false;

		// Restore body scroll
		document.body.style.overflow = '';
	}

	function navigateLightbox(index: number): void {
		currentLightboxIndex = index;
	}

	// Handle keyboard navigation
	$effect(() => {
		if (!lightboxOpen) {
			document.body.style.overflow = '';
		}
	});
</script>

<section class="w-full" aria-label="Work gallery">
	<!-- Responsive grid: 2 col mobile, 3 col tablet, 4 col desktop -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
		{#each displayImages as image, index (image.id)}
			<!-- Staggered ScrollReveal for animation -->
			<ScrollReveal delay={index * 100}>
				<div
					class="relative aspect-square w-full overflow-hidden cursor-pointer group"
					onclick={() => openLightbox(index)}
					onkeypress={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							openLightbox(index);
						}
					}}
					role="button"
					tabindex="0"
					aria-label={`View image: ${image.alt}`}
				>
					<!-- Image with lazy loading -->
					<img
						src={image.src}
						alt={image.alt}
						loading="lazy"
						decoding="async"
						class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:group-hover:scale-100"
					/>

					<!-- GlassCard overlay on hover -->
					<div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none motion-reduce:opacity-100 motion-reduce:transition-none">
						<GlassCard
							blur="lg"
							opacity={20}
							class="w-full h-full flex items-end justify-center pb-4 px-4"
						>
							{#if image.caption}
								<p class="text-white text-sm font-medium text-center drop-shadow-md line-clamp-2">
									{image.caption}
								</p>
							{/if}
						</GlassCard>
					</div>

					<!-- Optional zoom icon indicator -->
					<div
						class={cn(
							'absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2',
							'transition-opacity duration-300 ease-out opacity-0 group-hover:opacity-100'
						)}
						aria-hidden="true"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="text-white"
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
							<path d="m11 8 3 3-3 3" />
						</svg>
					</div>
				</div>
			</ScrollReveal>
		{/each}
	</div>

	<!-- Lightbox for viewing full-size images -->
	{#if showLightbox}
		<Lightbox
			images={displayImages}
			currentIndex={currentLightboxIndex}
			isOpen={lightboxOpen}
			onClose={closeLightbox}
			onNavigate={navigateLightbox}
		/>
	{/if}
</section>
