<script lang="ts">
	import { getAllServices } from '$lib/data/services';
	import ServiceCard from '$lib/components/services/ServiceCard.svelte';
	import { goto } from '$app/navigation';

	const services = getAllServices();

	function handleServiceClick(slug: string): void {
		goto(`/services/${slug}`);
	}
</script>

<svelte:head>
	<title>Услуги - Радиотехника-к</title>
	<meta name="description" content="Полный спектр услуг для профессиональных видеосъемок и киносъемок" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<header class="mb-8">
		<h1 class="text-4xl font-bold mb-4">Наши услуги</h1>
		<p class="text-lg text-muted-foreground">
			Предоставляем полный спектр услуг для профессиональных видеосъемок и киносъемок любого масштаба
		</p>
	</header>

	{#if services.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each services as service}
				<ServiceCard
					service={service}
					onClick={() => handleServiceClick(service.slug)}
				/>
			{/each}
		</div>
	{:else}
		<div class="text-center py-12">
			<p class="text-xl text-muted-foreground">Услуги暂时 недоступны</p>
			<p class="text-muted-foreground mt-2">Свяжитесь с нами для получения информации</p>
		</div>
	{/if}
</div>
