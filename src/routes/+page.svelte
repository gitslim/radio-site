<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { services } from '$lib/data/services';
	import { equipmentData } from '$lib/data/equipment-data';
	import { companyInfo } from '$lib/data/company';
	import type { GalleryImage } from '$lib/data/gallery';
	import HeroSection from '$lib/components/hero/HeroSection.svelte';
	import FeaturedEquipmentCarousel from '$lib/components/equipment/FeaturedEquipmentCarousel.svelte';
	import CategoryCard from '$lib/components/animations/CategoryCard.svelte';
	import WorkGallery from '$lib/components/animations/WorkGallery.svelte';
	import GlassCard from '$lib/components/animations/GlassCard.svelte';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { Button } from '$lib/components/ui/button';

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

	// State for gallery images
	let galleryImages = $state<GalleryImage[]>([]);
	let galleryLoaded = $state(false);

	// Load gallery images on mount
	onMount(async () => {
		try {
			const response = await fetch('/images/gallery-manifest.json');
			const manifest: GalleryManifest = await response.json();

			// Filter to "equipment-in-action" category and limit to 8 images
			galleryImages = manifest.images
				.filter((img) => img.category === 'equipment-in-action')
				.slice(0, 8)
				.map((img) => ({
					id: img.id,
					src: img.src,
					alt: img.alt,
					category: 'equipment-in-action' as const,
					caption: img.title || img.alt,
					thumbnail: img.src
				}));

			galleryLoaded = true;
		} catch (error) {
			console.error('Failed to load gallery manifest:', error);
		}
	});

	function handleContactClick(): void {
		// Navigate to contact page or scroll to contact section
		goto('/contact');
	}
</script>

<svelte:head>
	<title>Главная - ООО "Радиотехника-к"</title>
	<meta
		name="description"
		content="ООО Радиотехника-к - профессиональная аренда оборудования для кинопроизводства. Осветительное оборудование, генераторы, системы бесперебойного питания и многое другое."
	/>
	<meta
		name="keywords"
		content="ООО Радиотехника-к, аренда оборудования, кинопроизводство, осветительное оборудование, генераторы, видеопродукция"
	/>
</svelte:head>

<main class="min-h-screen">
	<!-- 1. Hero Section with Parallax -->
	<ScrollReveal>
		<HeroSection tagline="Профессиональное съёмочное оборудование" />
	</ScrollReveal>

	<!-- 2. Equipment Categories Section -->
	<section class="container mx-auto px-4 py-16 md:py-24">
		<header class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Что мы предоставляем</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Полный спектр услуг для профессионального кинопроизводства и видеосъемки
			</p>
		</header>

		<!-- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service, index (service.id)}
				<ScrollReveal delay={index * 100}>
					<CategoryCard
						category={service}
						href={`/services/${service.slug}`}
					/>
				</ScrollReveal>
			{/each}
		</div>
	</section>

	<!-- 3. Featured Equipment Section -->
	<section class="container mx-auto px-4 py-16 md:py-24">
		<header class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Рекомендуемое оборудование</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Высококачественное оборудование, проверенное временем и профессионалами
			</p>
		</header>

		<ScrollReveal>
			<FeaturedEquipmentCarousel equipment={equipmentData} />
		</ScrollReveal>
	</section>

	<!-- 4. Work Gallery Section -->
	<section class="container mx-auto px-4 py-16 md:py-24">
		<header class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Оборудование в работе</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Наши проекты и оборудование в действии
			</p>
		</header>

		<ScrollReveal>
			{#if galleryLoaded && galleryImages.length > 0}
				<WorkGallery images={galleryImages} maxItems={8} />
			{:else if galleryLoaded}
				<p class="text-center text-muted-foreground">Галерея в данный момент недоступна</p>
			{:else}
				<p class="text-center text-muted-foreground">Загрузка галереи...</p>
			{/if}
		</ScrollReveal>
	</section>

	<!-- 5. Contact CTA Section -->
	<section id="contact" class="container mx-auto px-4 py-16 md:py-24">
		<ScrollReveal>
			<GlassCard
				blur="lg"
				opacity={10}
				border
				hover={false}
				class="max-w-4xl mx-auto text-center p-12 md:p-16"
			>
				<h2 class="text-3xl md:text-4xl font-bold mb-6">Готовы обсудить ваш проект?</h2>
				<p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
					Свяжитесь с нами для консультации и подбора оборудования.
					Наши специалисты помогут подобрать оптимальное решение для вашей съемки.
				</p>

				<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
					<a
						href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
						class="flex items-center gap-2 text-2xl md:text-3xl font-semibold text-primary hover:text-primary/80 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
						</svg>
						{companyInfo.phone}
					</a>
				</div>

				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<Button
						size="lg"
						class="text-lg px-8 py-6"
						onclick={handleContactClick}
					>
						Связаться
					</Button>
					<a
						href={`mailto:${companyInfo.email}`}
						class="inline-flex items-center justify-center px-8 py-6 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all text-lg"
					>
						Написать email
					</a>
				</div>
			</GlassCard>
		</ScrollReveal>
	</section>
</main>
