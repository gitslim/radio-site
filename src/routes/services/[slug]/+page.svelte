<script lang="ts">
	import { page } from '$app/stores';
	import { getServiceBySlug } from '$lib/data/services';
	import SpecTable from '$lib/components/services/SpecTable.svelte';
	import { loadServiceImage } from '$lib/utils/image.js';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ChevronLeft } from '@lucide/svelte';

	// Get the slug from the URL
	const slug = $derived($page.params.slug ?? '');
	const service = $derived(getServiceBySlug(slug));

	function handleBackClick(): void {
		history.back();
	}
</script>

<svelte:head>
	{#if service}
		<title>{service.name} - ТехКино</title>
		<meta name="description" content={service.shortDescription} />
	{/if}
</svelte:head>

{#if service}
	<div class="container mx-auto px-4 py-8">
		<!-- Back button -->
		<Button
			variant="ghost"
			class="mb-6"
			onclick={handleBackClick}
		>
			<ChevronLeft class="mr-2 h-4 w-4" />
			Назад к услугам
		</Button>

		<!-- Service Header -->
		<header class="mb-8">
			<h1 class="text-4xl font-bold mb-4">{service.name}</h1>
			<p class="text-lg text-muted-foreground">{service.shortDescription}</p>
		</header>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Main Content (2 columns) -->
			<div class="lg:col-span-2 space-y-8">
				<!-- Service Image -->
				<Card>
					<CardContent class="p-0">
						<img
							src={loadServiceImage(service.image)}
							alt={service.name}
							class="w-full h-auto rounded-lg"
							loading="eager"
						/>
					</CardContent>
				</Card>

				<!-- Long Description -->
				<section>
					<h2 class="text-2xl font-semibold mb-4">Описание</h2>
					<p class="text-muted-foreground leading-relaxed whitespace-pre-line">
						{service.longDescription}
					</p>
				</section>

				<!-- Specifications -->
				{#if service.specifications && service.specifications.length > 0}
					<section>
						<h2 class="text-2xl font-semibold mb-4">Характеристики</h2>
						<SpecTable specifications={service.specifications} />
					</section>
				{/if}

				<!-- Pricing Note -->
				<section class="bg-muted/50 rounded-lg p-6">
					<div class="flex items-center gap-3">
						<div class="text-2xl font-bold text-primary">Цена по запросу</div>
					</div>
					<p class="text-muted-foreground mt-2">
						Для получения точной стоимости и индивидуального предложения, пожалуйста, свяжитесь с нами.
					</p>
				</section>

				<!-- Request Quote Button -->
				<Button size="lg" class="w-full md:w-auto">
					Запросить предложение
				</Button>
			</div>

			<!-- Sidebar (1 column) -->
			<div class="space-y-6">
				<!-- Quick Info Card -->
				<Card>
					<CardContent class="p-6">
						<h3 class="font-semibold mb-4">Краткая информация</h3>
						<dl class="space-y-3">
							{#if service.specifications && service.specifications.length > 0}
								{#each service.specifications.slice(0, 3) as spec}
									<div>
										<dt class="text-sm text-muted-foreground">{spec.label}</dt>
										<dd class="font-medium">{spec.value}</dd>
									</div>
								{/each}
							{/if}
						</dl>
					</CardContent>
				</Card>

				<!-- Contact CTA -->
				<Card>
					<CardContent class="p-6">
						<h3 class="font-semibold mb-2">Нужна консультация?</h3>
						<p class="text-sm text-muted-foreground mb-4">
							Наши специалисты помогут подобрать оптимальное решение для вашего проекта
						</p>
						<Button variant="outline" class="w-full">
							Связаться с нами
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
{:else}
	<!-- 404 Not Found for invalid service slug -->
	<div class="container mx-auto px-4 py-16 text-center">
		<h1 class="text-4xl font-bold mb-4">Услуга не найдена</h1>
		<p class="text-lg text-muted-foreground mb-8">
			Запрашиваемая услуга не существует или была удалена
		</p>
		<Button onclick={handleBackClick}>
			Вернуться к услугам
		</Button>
	</div>
{/if}
