<script lang="ts" module>
	import type { EquipmentFilter } from '$lib/data/equipment';

	export interface EquipmentFilterProps {
		categories: string[];
		currentFilter: EquipmentFilter;
		onFilterChange: (filter: EquipmentFilter) => void;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';

	let { categories, currentFilter, onFilterChange }: EquipmentFilterProps = $props();

	// Local state for two-way binding
	let selectedCategory = $state(currentFilter.category ?? 'all');
	let isAvailableOnly = $state(currentFilter.available === true);

	// Sync local state when parent filter changes
	$effect(() => {
		const parentCategory = currentFilter.category ?? 'all';
		if (selectedCategory !== parentCategory) {
			selectedCategory = parentCategory;
		}
	});

	$effect(() => {
		const parentAvailable = currentFilter.available === true;
		if (isAvailableOnly !== parentAvailable) {
			isAvailableOnly = parentAvailable;
		}
	});

	// Label for category select
	const categoryLabel = $derived(
		selectedCategory === 'all' ? 'Все категории' : selectedCategory
	);

	// Handle category change
	const handleCategoryChange = (value: string): void => {
		const newFilter: EquipmentFilter = {
			...currentFilter,
			category: value === 'all' ? undefined : value
		};
		onFilterChange(newFilter);
	};

	// Handle checkbox change
	const handleAvailableChange = (): void => {
		const newFilter: EquipmentFilter = {
			...currentFilter,
			available: isAvailableOnly || undefined
		};
		onFilterChange(newFilter);
	};
</script>

<div class="flex flex-col gap-4 p-4 bg-card rounded-lg border">
	<h2 class="text-lg font-semibold text-foreground">Фильтры</h2>

	<!-- Category Filter -->
	<div class="flex flex-col gap-2">
		<label for="category-select" class="text-sm font-medium text-foreground">
			Категория
		</label>
		<Select.Root type="single" bind:value={selectedCategory} onValueChange={handleCategoryChange}>
			<Select.Trigger class="w-full">
				{categoryLabel}
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="all">Все категории</Select.Item>
				{#each categories as category}
					<Select.Item value={category}>{category}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>

	<!-- Availability Filter -->
	<div class="flex items-center gap-3">
		<Checkbox
			id="available-checkbox"
			bind:checked={isAvailableOnly}
			onchange={handleAvailableChange}
			aria-label="Показывать только доступное оборудование"
		/>
		<label for="available-checkbox" class="text-sm font-medium text-foreground cursor-pointer">
			Только доступное
		</label>
	</div>
</div>
