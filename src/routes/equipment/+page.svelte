<script lang="ts">
	import EquipmentCard from '$lib/components/equipment/EquipmentCard.svelte';
	import EquipmentFilter from '$lib/components/equipment/EquipmentFilter.svelte';
	import { equipmentData, getCategories } from '$lib/data/equipment-data.js';
	import type { EquipmentFilter as FilterType } from '$lib/data/equipment.js';

	// Get all categories
	const categories = getCategories();

	// Filter state
	let currentFilter = $state<FilterType>({});

	// Filter equipment based on current filter
	const filteredEquipment = $derived(() => {
		return equipmentData.filter((item) => {
			// Filter by category
			if (currentFilter.category && item.category !== currentFilter.category) {
				return false;
			}

			// Filter by availability
			if (currentFilter.available !== undefined && item.available !== currentFilter.available) {
				return false;
			}

			return true;
		});
	});

	const handleFilterChange = (filter: FilterType): void => {
		currentFilter = filter;
	};
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-3xl font-bold mb-8 text-foreground">Оборудование</h1>

	<div class="flex flex-col lg:flex-row gap-8">
		<!-- Filter Sidebar -->
		<aside class="w-full lg:w-64 shrink-0">
			<EquipmentFilter
				{categories}
				{currentFilter}
				onFilterChange={handleFilterChange}
			/>
		</aside>

		<!-- Equipment Grid -->
		<main class="flex-1">
			{#if filteredEquipment().length === 0}
				<div class="flex items-center justify-center p-12 text-muted-foreground">
					<p class="text-lg">
						Нет оборудования, соответствующего выбранным фильтрам
					</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
					{#each filteredEquipment() as equipment (equipment.id)}
						<EquipmentCard {equipment} />
					{/each}
				</div>
			{/if}
		</main>
	</div>
</div>
