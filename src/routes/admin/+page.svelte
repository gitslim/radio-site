<script lang="ts">
	import AdminLayout from '$lib/components/admin/AdminLayout.svelte';
	import EquipmentTable from '$lib/components/admin/EquipmentTable.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { fetchEquipment, ApiError } from '$lib/admin/api-client';
	import type { Equipment } from '$lib/data/equipment';
	import { goto } from '$app/navigation';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { toast } from 'svelte-sonner';

	let title = $state('Управление оборудованием');

	// State
	let equipment = $state<Equipment[]>([]);
	let categories = $state<string[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);

	// Fetch equipment data on mount
	$effect(() => {
		async function loadEquipment() {
			loading = true;
			error = null;

			try {
				const data = await fetchEquipment();
				equipment = data;

				// Extract unique categories from equipment
				const uniqueCategories = new Set(data.map((item) => item.category));
				categories = Array.from(uniqueCategories).sort();
			} catch (err) {
				console.error('Failed to fetch equipment:', err);
				if (err instanceof ApiError) {
					error = err.message;
				} else {
					error = 'Не удалось загрузить данные оборудования';
				}
			} finally {
				loading = false;
			}
		}

		loadEquipment();
	});

	// Handle edit callback
	function handleEdit(item: Equipment) {
		console.log('Edit equipment:', item.name);
		goto(`/admin/equipment/${item.slug}`);
	}

	// Handle delete callback
	async function handleDelete(item: Equipment) {
		if (confirm(`Удалить "${item.name}"?`)) {
			try {
				const response = await fetch(`/admin/equipment?id=${item.id}`, {
					method: 'DELETE'
				});

				if (!response.ok) throw new Error('Delete failed');

				// Update local state
				equipment = equipment.filter((e) => e.id !== item.id);

				toast.success(`Удалено: ${item.name}`);
			} catch (err) {
				console.error('Failed to delete equipment:', err);
				toast.error('Не удалось удалить оборудование');
			}
		}
	}
</script>

<svelte:head>
	<title>{title} - Admin</title>
</svelte:head>

<AdminLayout>
	{#snippet children()}
		<div class="container mx-auto px-4 py-8">
			<!-- Page Header -->
			<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div>
					<h1 class="text-3xl font-bold">{title}</h1>
					<p class="mt-2 text-muted-foreground">
						Управление каталогом оборудования
					</p>
				</div>
				<Button href="/admin/equipment/new" class="gap-2">
					<PlusIcon class="size-4" />
					Добавить оборудование
				</Button>
			</div>

			{#if loading}
				<!-- Loading State -->
				<div class="flex min-h-[400px] items-center justify-center">
					<div class="text-center">
						<div
							class="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-muted border-t-primary"
						></div>
						<p class="text-muted-foreground">Загрузка оборудования...</p>
					</div>
				</div>
			{:else if error}
				<!-- Error State -->
				<div class="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
					<p class="text-lg font-medium text-destructive">{error}</p>
					<p class="mt-2 text-sm text-muted-foreground">
						Пожалуйста, попробуйте обновить страницу позже
					</p>
				</div>
			{:else if equipment.length === 0}
				<!-- Empty State -->
				<div class="rounded-lg border border-dashed p-12 text-center">
					<p class="text-lg font-medium text-muted-foreground">
						Оборудование не найдено
					</p>
					<p class="mt-2 text-sm text-muted-foreground">
						Добавьте первое оборудование, нажав на кнопку выше
					</p>
				</div>
			{:else}
				<!-- Equipment Table -->
				<EquipmentTable
					{equipment}
					{categories}
					onEdit={handleEdit}
					onDelete={handleDelete}
				/>
			{/if}
		</div>
	{/snippet}
</AdminLayout>
