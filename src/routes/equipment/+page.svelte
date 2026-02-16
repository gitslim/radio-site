<script lang="ts">
	import EquipmentCard from '$lib/components/equipment/EquipmentCard.svelte';
	import EquipmentFilter from '$lib/components/equipment/EquipmentFilter.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { equipmentData, getCategories } from '$lib/data/equipment-data.js';
	import type { EquipmentFilter as FilterType } from '$lib/data/equipment';

	// Get all categories
	const categories = getCategories();

	// Filter state
	let currentFilter = $state<FilterType>({});
	let searchInput = $state('');

	// Filter equipment based on current filter and search input
	const filteredEquipment = $derived(() => {
		return equipmentData.filter((item) => {
			// Filter by category
			if (currentFilter.category && item.category !== currentFilter.category) {
				return false;
			}

			// Filter by search term (name and description, case-insensitive)
			if (searchInput) {
				const searchLower = searchInput.toLowerCase();
				const nameMatch = item.name.toLowerCase().includes(searchLower);
				const descriptionMatch = item.description.toLowerCase().includes(searchLower);
				if (!nameMatch && !descriptionMatch) {
					return false;
				}
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

	<!-- Search and Filter Row -->
	<div class="flex flex-col sm:flex-row gap-4 mb-8">
		<div class="flex-1">
			<Input
				type="text"
				placeholder="Поиск по названию и описанию..."
				bind:value={searchInput}
				class="w-full"
			/>
		</div>
		<EquipmentFilter
			{categories}
			{currentFilter}
			onFilterChange={handleFilterChange}
		/>
	</div>

	<!-- Equipment Grid -->
	{#if filteredEquipment().length === 0}
		<div class="flex items-center justify-center p-12 text-muted-foreground">
			<p class="text-lg">
				Нет оборудования, соответствующего выбранным фильтрам
			</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
			{#each filteredEquipment() as equipment (equipment.id)}
				<EquipmentCard
					{equipment}
					onClick={() => (window.location.href = `/equipment/${equipment.slug}`)}
				/>
			{/each}
		</div>
	{/if}
</div>
