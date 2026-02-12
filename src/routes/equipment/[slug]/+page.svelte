<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import EquipmentCard from '$lib/components/equipment/EquipmentCard.svelte';
	import ContactForm from '$lib/components/contact/ContactForm.svelte';
	import { cn } from '$lib/utils';
	import { loadEquipmentImage } from '$lib/utils/image';

	import type { Equipment } from '$lib/data/equipment';

	interface PageData {
		equipment: Equipment;
		relatedEquipment: Equipment[];
	}

	let { data }: { data: PageData } = $props();

	// Lightbox state
	let selectedImageIndex = $state<number | null>(null);
	let isLightboxOpen = $state(false);

	// Get first image
	const primaryImage = $derived(data.equipment.images?.[0] || '');
	const imageSrc = $derived(
		primaryImage.startsWith('/') ? primaryImage : loadEquipmentImage(primaryImage)
	);

	// Handle lightbox
	const openLightbox = (index: number) => {
		selectedImageIndex = index;
		isLightboxOpen = true;
	};

	const closeLightbox = () => {
		isLightboxOpen = false;
		selectedImageIndex = null;
	};

	const navigateImage = (direction: 'next' | 'prev') => {
		if (selectedImageIndex === null || !data.equipment.images.length) return;

		if (direction === 'next') {
			selectedImageIndex = (selectedImageIndex + 1) % data.equipment.images.length;
		} else {
			selectedImageIndex =
				(selectedImageIndex - 1 + data.equipment.images.length) % data.equipment.images.length;
		}
	};

	// Navigate to related equipment
	const handleRelatedClick = (slug: string) => {
		window.location.href = `/equipment/${slug}`;
	};
</script>

<svelte:head>
	<title>{data.equipment.name} - Радиотехника-к</title>
	<meta name="description" content={data.equipment.description} />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<!-- Breadcrumb -->
	<nav class="mb-8 text-sm text-muted-foreground">
		<a href="/equipment" class="hover:text-foreground transition-colors">Оборудование</a>
		<span class="mx-2">/</span>
		<span class="text-foreground">{data.equipment.name}</span>
	</nav>

	<!-- Equipment Header -->
	<div class="mb-8">
		<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
			<div class="flex-1">
				<h1 class="text-3xl md:text-4xl font-bold text-foreground mb-3">
					{data.equipment.name}
				</h1>
				<div class="flex flex-wrap items-center gap-3">
					<span
						class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium {data.equipment.available
							? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
							: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}"
					>
						{#if data.equipment.available}
							В наличии
						{:else}
							Недоступно
						{/if}
					</span>
					<span class="text-muted-foreground text-sm">
						{data.equipment.category}
					</span>
				</div>
			</div>
			<div class="text-right">
				<p class="text-2xl font-semibold text-primary">Цена по договоренности</p>
			</div>
		</div>
	</div>

	<!-- Image Gallery -->
	<div class="mb-8">
		<h2 class="text-2xl font-bold text-foreground mb-4">Галерея</h2>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each data.equipment.images as image, index (image)}
				<button
					type="button"
					class="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted group"
					onclick={() => openLightbox(index)}
					aria-label={`Увеличить изображение ${index + 1}`}
				>
					<img
						src={image.startsWith('/') ? image : loadEquipmentImage(image)}
						alt={`${data.equipment.name} - изображение ${index + 1}`}
						class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
					<div
						class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
						aria-hidden="true"
					>
						<div
							class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						>
							<span class="text-white text-4xl">+</span>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Description -->
	<div class="mb-8">
		<h2 class="text-2xl font-bold text-foreground mb-4">Описание</h2>
		<Card>
			<CardContent class="pt-6">
				<p class="text-muted-foreground leading-relaxed">{data.equipment.description}</p>
			</CardContent>
		</Card>
	</div>

	<!-- Specifications -->
	{#if data.equipment.specifications && data.equipment.specifications.length > 0}
		<div class="mb-8">
			<h2 class="text-2xl font-bold text-foreground mb-4">Характеристики</h2>
			<Card>
				<CardHeader>
					<CardTitle>Технические спецификации</CardTitle>
				</CardHeader>
				<CardContent>
					<table class="w-full">
						<tbody>
							{#each data.equipment.specifications as spec (spec.label)}
								<tr class="border-b border-border last:border-0">
									<td class="py-3 pr-4 text-muted-foreground font-medium">
										{spec.label}
									</td>
									<td class="py-3 text-foreground">{spec.value}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</CardContent>
			</Card>
		</div>
	{/if}

	<!-- Contact Form -->
	<div class="mb-12">
		<h2 class="text-2xl font-bold text-foreground mb-4">Заявка на аренду</h2>
		<Card>
			<CardContent class="pt-6">
				<ContactForm service={data.equipment.name} />
			</CardContent>
		</Card>
	</div>

	<!-- Related Equipment -->
	{#if data.relatedEquipment && data.relatedEquipment.length > 0}
		<div class="mb-8">
			<h2 class="text-2xl font-bold text-foreground mb-4">Похожее оборудование</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.relatedEquipment as equipment (equipment.id)}
					<EquipmentCard
						{equipment}
						onClick={() => handleRelatedClick(equipment.slug)}
					/>
				{/each}
			</div>
		</div>
	{/if}
</div>

<!-- Lightbox Dialog -->
<Dialog.Root open={isLightboxOpen} onOpenChange={(open) => (isLightboxOpen = open)}>
	<Dialog.Content class="max-w-4xl w-full p-0 bg-transparent border-none shadow-none">
		<div class="relative">
			<!-- Image -->
			{#if selectedImageIndex !== null && data.equipment.images[selectedImageIndex]}
				<img
					src={data.equipment.images[selectedImageIndex].startsWith('/')
						? data.equipment.images[selectedImageIndex]
						: loadEquipmentImage(data.equipment.images[selectedImageIndex])}
					alt={`${data.equipment.name} - изображение ${selectedImageIndex + 1}`}
					class="w-full h-auto max-h-[80vh] object-contain rounded-lg"
				/>
			{/if}

			<!-- Close button -->
			<Dialog.Close
				class="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70 text-white p-2 transition-colors"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</Dialog.Close>

			<!-- Navigation buttons -->
			{#if data.equipment.images.length > 1}
				<button
					type="button"
					onclick={() => navigateImage('prev')}
					class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
					aria-label="Предыдущее изображение"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>
				<button
					type="button"
					onclick={() => navigateImage('next')}
					class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 text-white p-3 transition-colors"
					aria-label="Следующее изображение"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			{/if}

			<!-- Image counter -->
			{#if data.equipment.images.length > 1}
				<div class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 text-white px-4 py-2 text-sm">
					{selectedImageIndex !== null ? selectedImageIndex + 1 : 1} / {data.equipment.images.length}
				</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
