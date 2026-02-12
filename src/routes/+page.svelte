<script lang="ts">
	import { goto } from '$app/navigation';
	import { equipmentData } from '$lib/data/equipment-data';
	import { companyInfo } from '$lib/data/company';
	import HeroSection from '$lib/components/hero/HeroSection.svelte';
	import FeaturedEquipmentCarousel from '$lib/components/equipment/FeaturedEquipmentCarousel.svelte';
	import HowItWorks from '$lib/components/home/HowItWorks.svelte';
	import ValueProps from '$lib/components/home/ValueProps.svelte';
	import GlassCard from '$lib/components/animations/GlassCard.svelte';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { Button } from '$lib/components/ui/button';

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
		<HeroSection
			tagline="Аренда профессионального оборудования для съемок"
			ctaText="Перейти в каталог"
			ctaLink="/equipment"
		/>
	</ScrollReveal>

	<!-- 2. Featured Equipment Section -->
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

	<!-- 3. How It Works Section -->
	<HowItWorks />

	<!-- 4. Value Props Section -->
	<ValueProps />

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
				<h2 class="text-3xl md:text-4xl font-bold mb-6">Готовы начать?</h2>
				<p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
					Позвоните нам или напишите, чтобы обсудить детали аренды и подобрать идеальное
					оборудование для вашего проекта.
				</p>

				<div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
					<a
						href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
						class="flex items-center gap-3 text-2xl md:text-3xl font-semibold text-primary hover:text-primary/80 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
