<script lang="ts">
	import { companyInfo } from '$lib/data/company';
	import { env } from '$env/dynamic/public';
	import CompanyMap from '$lib/components/CompanyMap.svelte';
	import YandexMap from '$lib/components/YandexMap.svelte';
	import Mail from '@lucide/svelte/icons/mail';
	import Phone from '@lucide/svelte/icons/phone';

	// Get map provider from environment variable, default to yandex
	const mapProvider = env.PUBLIC_MAP_PROVIDER || 'yandex';
</script>

<svelte:head>
	<title>Контакты - Радиотехника-К</title>
	<meta
		name="description"
		content="Свяжитесь с ООО Радиотехника-К для аренды профессионального оборудования"
	/>
	<meta
		name="keywords"
		content="контакты, ООО Радиотехника-К, email, телефон, адрес"
	/>
</svelte:head>

<main class="container mx-auto px-4 py-12 max-w-6xl">
	<header class="text-center mb-12">
		<h1 class="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
		<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
			Свяжитесь с нами для консультации и подбора оборудования для вашего проекта
		</p>
	</header>

	<!-- Contact Information & Map -->
	<div class="grid lg:grid-cols-2 gap-12">
		<!-- Left Column: Contact Information -->
		<section class="space-y-8">
			<header class="mb-8">
				<h2 class="text-2xl font-bold mb-2">Контактная информация</h2>
				<p class="text-muted-foreground">
					Свяжитесь с нами любым удобным способом
				</p>
			</header>

			<!-- Direct Email -->
			<a
				href={`mailto:${companyInfo.email}`}
				class="group flex items-center gap-5 p-6 rounded-xl border bg-card transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20"
			>
				<div class="flex-shrink-0">
					<div class="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
						<Mail class="h-7 w-7 text-primary" aria-hidden="true" />
					</div>
				</div>
				<div class="flex-1">
					<h3 class="font-semibold mb-1 text-lg">Email</h3>
					<p class="text-primary text-lg font-medium group-hover:underline decoration-2 underline-offset-4 transition-all">
						{companyInfo.email}
					</p>
				</div>
				<div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
					<span class="text-primary">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</span>
				</div>
			</a>

			<!-- Phone -->
			<a
				href={`tel:${companyInfo.phone.replace(/ /g, '')}`}
				class="group flex items-center gap-5 p-6 rounded-xl border bg-card transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:border-primary/20"
			>
				<div class="flex-shrink-0">
					<div class="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
						<Phone class="h-7 w-7 text-primary" aria-hidden="true" />
					</div>
				</div>
				<div class="flex-1">
					<h3 class="font-semibold mb-1 text-lg">Телефон</h3>
					<p class="text-primary text-lg font-medium group-hover:underline decoration-2 underline-offset-4 transition-all">
						{companyInfo.phone}
					</p>
				</div>
				<div class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
					<span class="text-primary">
						<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
						</svg>
					</span>
				</div>
			</a>

			<!-- Company Information -->
			<div class="p-6 rounded-xl border bg-card space-y-4">
				<h3 class="font-semibold text-lg">Информация о компании</h3>
				<div class="space-y-3">
					<div class="flex flex-col gap-1">
						<span class="text-sm font-medium text-muted-foreground">Название</span>
						<span class="text-base">{companyInfo.name}</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-sm font-medium text-muted-foreground">Юридический адрес</span>
						<span class="text-base">{companyInfo.legalAddress}</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-sm font-medium text-muted-foreground">ОГРН</span>
						<span class="text-base">{companyInfo.ogrn}</span>
					</div>
				</div>
			</div>
		</section>

		<!-- Right Column: Map -->
		<section class="space-y-6">
			<header>
				<h2 class="text-2xl font-bold mb-2">Наше местоположение</h2>
				<p class="text-muted-foreground">
					Найдите нас на карте
				</p>
			</header>

			{#if mapProvider === 'yandex'}
				<YandexMap />
			{:else}
				<CompanyMap />
			{/if}
		</section>
	</div>
</main>
