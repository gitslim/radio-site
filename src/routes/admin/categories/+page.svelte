<script lang="ts">
	import AdminLayout from '$lib/components/admin/AdminLayout.svelte';
	import CategoryManager from '$lib/components/admin/CategoryManager.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		fetchCategories,
		fetchEquipment,
		createCategory,
		updateCategory,
		deleteCategory,
		ApiError
	} from '$lib/admin/api-client';
	import type { Category } from '$lib/data/category-data';
	import type { Equipment } from '$lib/data/equipment';
	import { toast } from 'svelte-sonner';
	import PlusIcon from '@lucide/svelte/icons/plus';

	let title = $state('Категории');

	// State
	let categories = $state<Category[]>([]);
	let equipment = $state<Equipment[]>([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let submitting = $state(false);

	// CategoryManager reference for accessing openCreateDialog
	let categoryManager = $state<CategoryManager | null>(null);

	// Fetch data on mount
	$effect(() => {
		async function loadData() {
			loading = true;
			error = null;

			try {
				const [categoriesData, equipmentData] = await Promise.all([
					fetchCategories(),
					fetchEquipment()
				]);
				categories = categoriesData;
				equipment = equipmentData;
			} catch (err) {
				console.error('Failed to fetch categories:', err);
				if (err instanceof ApiError) {
					error = err.message;
				} else {
					error = 'Не удалось загрузить данные категорий';
				}
			} finally {
				loading = false;
			}
		}

		loadData();
	});

	// Handle create category
	async function handleCreateCategory(categoryData: Omit<Category, 'id'>) {
		submitting = true;
		error = null;

		try {
			const newCategory = await createCategory(categoryData);
			categories = [...categories, newCategory];
			toast.success(`Категория "${newCategory.name}" создана`);
		} catch (err) {
			console.error('Failed to create category:', err);
			if (err instanceof ApiError) {
				error = err.message;
				toast.error(`Ошибка: ${err.message}`);
			} else {
				error = 'Не удалось создать категорию';
				toast.error('Не удалось создать категорию');
			}
		} finally {
			submitting = false;
		}
	}

	// Handle update category
	async function handleUpdateCategory(id: string, updates: Partial<Category>) {
		submitting = true;
		error = null;

		try {
			const updatedCategory = await updateCategory(id, updates);
			categories = categories.map((cat) => (cat.id === id ? updatedCategory : cat));
			toast.success('Категория обновлена');
		} catch (err) {
			console.error('Failed to update category:', err);
			if (err instanceof ApiError) {
				error = err.message;
				toast.error(`Ошибка: ${err.message}`);
			} else {
				error = 'Не удалось обновить категорию';
				toast.error('Не удалось обновить категорию');
			}
		} finally {
			submitting = false;
		}
	}

	// Handle delete category
	async function handleDeleteCategory(id: string) {
		submitting = true;
		error = null;

		try {
			await deleteCategory(id);
			categories = categories.filter((cat) => cat.id !== id);
			toast.success('Категория удалена');
		} catch (err) {
			console.error('Failed to delete category:', err);
			if (err instanceof ApiError) {
				error = err.message;
				toast.error(`Ошибка: ${err.message}`);
			} else {
				error = 'Не удалось удалить категорию';
				toast.error('Не удалось удалить категорию');
			}
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>{title} - Admin</title>
</svelte:head>

<AdminLayout>
	{#snippet children()}
		<div class="container mx-auto px-4 py-8">
			{#if loading}
				<!-- Loading State -->
				<div class="flex min-h-[400px] items-center justify-center">
					<div class="text-center">
						<div
							class="mx-auto mb-4 size-12 animate-spin rounded-full border-4 border-muted border-t-primary"
						></div>
						<p class="text-muted-foreground">Загрузка категорий...</p>
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
			{:else}
				<!-- Page Header -->
				<div class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h1 class="text-3xl font-bold">Категории</h1>
						<p class="mt-2 text-muted-foreground">
							Управление категориями оборудования ({categories.length})
						</p>
					</div>
					<Button onclick={() => categoryManager?.openCreateDialog()} class="gap-2">
						<PlusIcon class="size-4" />
						Новая категория
					</Button>
				</div>

				<!-- Always render CategoryManager so bind:this always has a reference -->
				<CategoryManager
					bind:this={categoryManager}
					{categories}
					{equipment}
					onCreate={handleCreateCategory}
					onUpdate={handleUpdateCategory}
					onDelete={handleDeleteCategory}
				/>

				{#if categories.length === 0}
					<!-- Empty State -->
					<div class="rounded-lg border border-dashed p-12 text-center">
						<p class="text-lg font-medium text-muted-foreground">
							Категории не найдены
						</p>
						<p class="mt-2 text-sm text-muted-foreground">
							Создайте первую категорию, нажав на кнопку "Новая категория"
						</p>
					</div>
				{/if}
			{/if}
		</div>
	{/snippet}
</AdminLayout>
