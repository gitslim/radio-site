<script lang="ts" module>
	import type { EquipmentFilter, EquipmentCategory } from '$lib/data/equipment';

	export interface EquipmentFilterProps {
		categories: string[];
		currentFilter: EquipmentFilter;
		onFilterChange: (filter: EquipmentFilter) => void;
	}
</script>

<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';

	let { categories, currentFilter, onFilterChange }: EquipmentFilterProps = $props();

	// Local state for two-way binding
	let selectedCategory = $state(currentFilter.category ?? 'all');

	// Sync local state when parent filter changes
	$effect(() => {
		const parentCategory = currentFilter.category ?? 'all';
		if (selectedCategory !== parentCategory) {
			selectedCategory = parentCategory;
		}
	});

	// Label for category select
	const categoryLabel = $derived(
		selectedCategory === 'all' ? 'Все категории' : selectedCategory
	);

	// Handle category change
	const handleCategoryChange = (value: string): void => {
		const newFilter: EquipmentFilter = {
			category: value === 'all' ? undefined : (value as EquipmentCategory)
		};
		onFilterChange(newFilter);
	};
</script>

<Select.Root type="single" bind:value={selectedCategory} onValueChange={handleCategoryChange}>
		<Select.Trigger class="min-w-[180px]">
			{categoryLabel}
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="all">Все категории</Select.Item>
			{#each categories as category}
				<Select.Item value={category}>{category}</Select.Item>
			{/each}
		</Select.Content>
</Select.Root>
