<script lang="ts" module>
	import type { Equipment } from '$lib/data/equipment';

	export interface FeaturedEquipmentCarouselProps {
		equipment: Equipment[];
	}
</script>

<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import EquipmentCard from './EquipmentCard.svelte';

	let { equipment }: FeaturedEquipmentCarouselProps = $props();

	// Filter for featured equipment
	const featuredEquipment = $derived(equipment.filter((item) => item.featured));
</script>

{#if featuredEquipment.length === 0}
	<div class="flex items-center justify-center p-8 text-muted-foreground">
		<p class="text-sm">Нет рекомендуемого оборудования для отображения</p>
	</div>
{:else}
	<Carousel.Root
		opts={{
			align: 'start',
			loop: true
		}}
		class="w-full"
	>
		<Carousel.Content>
			{#each featuredEquipment as item (item.id)}
				<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
					<div class="p-1">
						<EquipmentCard equipment={item} href="/equipment/{item.slug}" />
					</div>
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
{/if}
