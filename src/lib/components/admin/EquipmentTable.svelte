<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import PencilIcon from '@lucide/svelte/icons/pencil';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import SearchIcon from '@lucide/svelte/icons/search';
	import type { Equipment } from '$lib/data/equipment';

	interface Props {
		equipment: Equipment[];
		categories: string[];
		onEdit: (equipment: Equipment) => void;
		onDelete: (equipment: Equipment) => void;
	}

	let { equipment, categories, onEdit, onDelete }: Props = $props();

	// Reactive state for filters
	let searchTerm = $state('');
	let selectedCategory = $state<string | undefined>(undefined);

	// Derived state for filtered equipment
	let filteredEquipment = $derived(
		equipment.filter((item) => {
			// Case-insensitive search by name
			const matchesSearch = searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase());

			// Filter by category
			const matchesCategory = !selectedCategory || item.category === selectedCategory;

			return matchesSearch && matchesCategory;
		})
	);

	// Get unique categories from equipment data (non-mutating sort)
	let availableCategories = $derived([...categories].sort());

	// Category display value
	let categoryDisplayValue = $derived(selectedCategory || 'Все категории');
</script>

<div class="space-y-4">
	<!-- Filters -->
	<div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
		<!-- Search Input -->
		<div class="relative flex-1">
			<SearchIcon class="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				type="text"
				placeholder="Поиск по названию..."
				bind:value={searchTerm}
				class="pl-10"
				aria-label="Поиск по названию оборудования"
			/>
		</div>

		<!-- Category Filter -->
		<div class="w-full md:w-64">
			<Select.Root type="single" bind:value={selectedCategory}>
				<Select.Trigger class="w-full" aria-label="Фильтр по категории">
					{categoryDisplayValue}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Item value="">Все категории</Select.Item>
						{#each availableCategories as category (category)}
							<Select.Item value={category}>{category}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
	</div>

	<!-- Equipment Table -->
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[40%]">Название</Table.Head>
					<Table.Head class="w-[20%]">Категория</Table.Head>
					<Table.Head class="w-[15%]">Доступен</Table.Head>
					<Table.Head class="w-[15%]">Рекомендуемый</Table.Head>
					<Table.Head class="w-[10%] text-right">Действия</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if filteredEquipment.length === 0}
					<Table.Row>
						<Table.Cell colspan={5} class="h-24 text-center">
							<p class="text-muted-foreground">
								{searchTerm || selectedCategory
									? 'Оборудование не найдено'
									: 'Нет оборудования'}
							</p>
						</Table.Cell>
					</Table.Row>
				{:else}
					{#each filteredEquipment as item (item.id)}
						<Table.Row class="hover:bg-muted/50">
							<Table.Cell class="font-medium">{item.name}</Table.Cell>
							<Table.Cell>
								<Badge variant="secondary">{item.category}</Badge>
							</Table.Cell>
							<Table.Cell>
								<Badge variant={item.available ? 'default' : 'destructive'}>
									{item.available ? 'Да' : 'Нет'}
								</Badge>
							</Table.Cell>
							<Table.Cell>
								{#if item.featured}
									<Badge variant="default">Да</Badge>
								{:else}
									<span class="text-muted-foreground">—</span>
								{/if}
							</Table.Cell>
							<Table.Cell class="text-right">
								<div class="flex justify-end gap-2">
									<Button
										variant="ghost"
										size="icon"
										onclick={() => onEdit(item)}
										aria-label="Редактировать"
										class="h-8 w-8"
									>
										<PencilIcon class="size-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										onclick={() => onDelete(item)}
										aria-label="Удалить"
										class="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
									>
										<Trash2Icon class="size-4" />
									</Button>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	</div>

	<!-- Results Count -->
	<div class="flex items-center justify-between text-sm text-muted-foreground">
		<p>Показано: {filteredEquipment.length} из {equipment.length}</p>
		{#if searchTerm || selectedCategory}
			<Button
				variant="link"
				onclick={() => {
					searchTerm = '';
					selectedCategory = undefined;
				}}
				class="h-auto p-0"
			>
				Сбросить фильтры
			</Button>
		{/if}
	</div>
</div>
