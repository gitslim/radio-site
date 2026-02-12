<script lang="ts">
	import { goto } from '$app/navigation';
	import { services } from '$lib/data/services';
	import { equipmentData } from '$lib/data/equipment-data';
	import { companyInfo } from '$lib/data/company';
	import HeroSection from '$lib/components/hero/HeroSection.svelte';
	import FeaturedEquipmentCarousel from '$lib/components/equipment/FeaturedEquipmentCarousel.svelte';
	import ServiceCard from '$lib/components/services/ServiceCard.svelte';
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
	<!-- Hero Section -->
	<HeroSection tagline="Профессиональное съёмочное оборудование" />

	<!-- Services Section -->
	<section class="container mx-auto px-4 py-16">
		<header class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Наши услуги</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Полный спектр услуг для профессионального кинопроизводства и видеосъемки
			</p>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service (service.id)}
				<ServiceCard
					{service}
					onClick={() => goto(`/services/${service.slug}`)}
				/>
			{/each}
		</div>
	</section>

	<!-- Featured Equipment Section -->
	<section class="container mx-auto px-4 py-16">
		<header class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Рекомендуемое оборудование</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Высококачественное оборудование, проверенное временем и профессионалами
			</p>
		</header>

		<FeaturedEquipmentCarousel equipment={equipmentData} />
	</section>

	<!-- Quick Contact Section -->
	<section class="container mx-auto px-4 py-16">
		<div
			class="max-w-3xl mx-auto text-center bg-muted/50 rounded-lg p-12 border"
		>
			<h2 class="text-3xl md:text-4xl font-bold mb-6">Свяжитесь с нами</h2>
			<p class="text-lg text-muted-foreground mb-8">
				Готовы обсудить ваш проект? Свяжитесь с нами для консультации и
				подбора оборудования.
			</p>
			<a
				href="mailto:{companyInfo.email}"
				class="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-lg"
			>
				{companyInfo.email}
			</a>
		</div>
	</section>
</main>
