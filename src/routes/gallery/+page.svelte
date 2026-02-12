<script lang="ts">
	import Lightbox from "$lib/components/gallery/Lightbox.svelte";
	import GalleryFilter from "$lib/components/gallery/GalleryFilter.svelte";
	import { onMount } from "svelte";
	import type { GalleryImage, GalleryCategory } from "$lib/data/gallery";

	interface ManifestImage {
		id: string;
		src: string;
		alt: string;
		title: string;
		category: string;
	}

	interface GalleryManifest {
		images: ManifestImage[];
	}

	// State
	let allImages = $state<GalleryImage[]>([]);
	let currentCategory = $state<GalleryCategory | undefined>(undefined);
	let isLightboxOpen = $state(false);
	let currentImageIndex = $state(0);

	// Default category mapping for "gallery" category
	const DEFAULT_CATEGORY: GalleryCategory = "equipment-in-action";

	// Load images from manifest
	onMount(async () => {
		try {
			const response = await fetch("/images/gallery-manifest.json");
			const manifest: GalleryManifest = await response.json();

			// Transform manifest images to GalleryImage format
			// Map "gallery" category to default category
			allImages = manifest.images.map((img) => ({
				id: img.id,
				src: img.src,
				alt: img.alt,
				category: (img.category as GalleryCategory) || DEFAULT_CATEGORY,
				caption: img.title || img.alt,
				thumbnail: img.src // Use same image for thumbnail
			}));

			// Set default category
			currentCategory = DEFAULT_CATEGORY;
		} catch (error) {
			console.error("Failed to load gallery manifest:", error);
		}
	});

	// Filter images by category
	let filteredImages = $derived(
		!currentCategory ? allImages : allImages.filter((img) => img.category === currentCategory)
	);

	function handleCategoryChange(category: GalleryCategory) {
		currentCategory = category;
		// Reset to first image when category changes
		currentImageIndex = 0;
	}

	function openLightbox(index: number) {
		currentImageIndex = index;
		isLightboxOpen = true;
	}

	function closeLightbox() {
		isLightboxOpen = false;
	}

	function navigateLightbox(index: number) {
		currentImageIndex = index;
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-6">Галерея</h1>

	<!-- Category Filter -->
	<div class="mb-8">
		<GalleryFilter
			currentCategory={currentCategory}
			onCategoryChange={handleCategoryChange}
		/>
	</div>

	<!-- Gallery Grid -->
	{#if filteredImages.length > 0}
		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each filteredImages as image (image.id)}
				<button
					class="relative aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
					onclick={() => openLightbox(filteredImages.indexOf(image))}
					aria-label={`Открыть изображение: ${image.alt}`}
				>
					<img
						src={image.thumbnail || image.src}
						alt={image.alt}
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				</button>
			{/each}
		</div>
	{:else}
		<div class="text-center py-12 text-muted-foreground">
			<p>Изображения в этой категории отсутствуют</p>
		</div>
	{/if}

	<!-- Lightbox -->
	{#if isLightboxOpen}
		<Lightbox
			images={filteredImages}
			currentIndex={currentImageIndex}
			isOpen={isLightboxOpen}
			onClose={closeLightbox}
			onNavigate={navigateLightbox}
		/>
	{/if}
</div>
