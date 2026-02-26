<script lang="ts">
	import { goto } from '$app/navigation';
	import { equipmentData } from '$lib/data/equipment-data';
	import { companyInfo } from '$lib/data/company';
	import ParallaxHero from '$lib/components/hero/ParallaxHero.svelte';
	import FeaturedEquipmentCarousel from '$lib/components/equipment/FeaturedEquipmentCarousel.svelte';
	import HowItWorks from '$lib/components/home/HowItWorks.svelte';
	import ValueProps from '$lib/components/home/ValueProps.svelte';
	import GlassCard from '$lib/components/animations/GlassCard.svelte';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import Headphones from '@lucide/svelte/icons/headphones';
	import Phone from '@lucide/svelte/icons/phone';
	import Mail from '@lucide/svelte/icons/mail';

	function handleContactClick(): void {
		// Navigate to contact page or scroll to contact section
		goto('/contact');
	}
</script>

<svelte:head>
	<title>Главная - ООО "Радиотехника-К"</title>
	<meta
		name="description"
		content="ООО Радиотехника-К - профессиональная аренда оборудования для кинопроизводства. Осветительное оборудование, генераторы, системы бесперебойного питания и многое другое."
	/>
	<meta
		name="keywords"
		content="ООО Радиотехника-К, аренда оборудования, кинопроизводство, осветительное оборудование, генераторы, видеопродукция"
	/>
</svelte:head>

<main class="min-h-screen">
	<!-- 1. Hero Section with Parallax -->
	<ScrollReveal>
		<ParallaxHero
			title="Аренда профессионального оборудования для съемок"
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

		<div class="text-center mt-8">
			<a
				href="/equipment"
				class="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
			>
				Все оборудование
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
					aria-hidden="true"
				>
					<path d="M5 12h14" />
					<path d="m12 5 7 7-7 7" />
				</svg>
			</a>
		</div>
	</section>

	<!-- 3. How It Works Section -->
	<HowItWorks />

	<!-- 4. Value Props Section -->
	<ValueProps />

	<!-- 5. Contact CTA Section -->
	<section id="contact" class="py-20 md:py-32 bg-background">
		<div class="container mx-auto px-4">
			<ScrollReveal>
				<GlassCard
					blur="lg"
					opacity={10}
					border
					hover={false}
					class="max-w-4xl mx-auto text-center p-12 md:p-16"
				>
					<div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
						<Headphones class="w-8 h-8 text-primary" />
					</div>

					<h2 class="text-3xl md:text-4xl font-bold mb-6">Готовы начать?</h2>
					<p class="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
						Позвоните нам или напишите, чтобы обсудить детали аренды и подобрать идеальное
						оборудование для вашего проекта.
					</p>

					<!-- Contact Info -->
					<div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
						<a
							href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}
							class={cn(
								'flex items-center gap-3 text-lg font-medium',
								'text-primary hover:text-primary/80 transition-colors'
							)}
						>
							<Phone class="w-5 h-5" />
							{companyInfo.phone}
						</a>
						<a
							href={`mailto:${companyInfo.email}`}
							class={cn(
								'flex items-center gap-3 text-lg font-medium',
								'text-primary hover:text-primary/80 transition-colors'
							)}
						>
							<Mail class="w-5 h-5" />
							{companyInfo.email}
						</a>
					</div>

					<Button size="lg" href="/contact" class="text-lg px-8 py-6">
						Связаться с нами
					</Button>
				</GlassCard>
			</ScrollReveal>
		</div>
	</section>
</main>
