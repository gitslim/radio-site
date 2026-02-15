<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Category } from '$lib/data/category-data';
	import type { Equipment } from '$lib/data/equipment';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import PencilIcon from '@lucide/svelte/icons/pencil';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import { toast } from 'svelte-sonner';

	interface Props {
		categories: Category[];
		equipment: Equipment[];
		onCreate?: (category: Omit<Category, 'id'>) => void;
		onUpdate?: (id: string, category: Partial<Category>) => void;
		onDelete?: (id: string) => void;
	}

	let { categories, equipment, onCreate, onUpdate, onDelete }: Props = $props();

	// Dialog states
	let isCreateDialogOpen = $state(false);
	let isEditDialogOpen = $state(false);
	let isDeleteDialogOpen = $state(false);

	// Form state for create/edit
	let formData = $state({
		name: '',
		slug: '',
		description: ''
	});

	// Selected category for edit/delete
	let selectedCategory = $state<Category | null>(null);

	// Generate URL-friendly slug from category name (transliteration)
	function generateSlug(name: string): string {
		return name
			.toLowerCase()
			.trim()
			.replace(/[а-яё]/g, (c) => {
				const translit: Record<string, string> = {
					а: 'a',
					б: 'b',
					в: 'v',
					г: 'g',
					д: 'd',
					е: 'e',
					ё: 'yo',
					ж: 'zh',
					з: 'z',
					и: 'i',
					й: 'j',
					к: 'k',
					л: 'l',
					м: 'm',
					н: 'n',
					о: 'o',
					п: 'p',
					р: 'r',
					с: 's',
					т: 't',
					у: 'u',
					ф: 'f',
					х: 'h',
					ц: 'ts',
					ч: 'ch',
					ш: 'sh',
					щ: 'shch',
					ъ: '',
					ы: 'y',
					ь: '',
					э: 'e',
					ю: 'yu',
					я: 'ya'
				};
				return translit[c] || c;
			})
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '');
	}

	// Derived state: count equipment per category
	let categoryWithCounts = $derived(
		categories.map((category) => {
			const count = equipment.filter((eq) => eq.category === category.name).length;
			return { ...category, equipmentCount: count };
		})
	);

	// Handle name change to auto-generate slug
	function handleNameChange(name: string) {
		formData.name = name;
		formData.slug = generateSlug(name);
	}

	// Open create dialog
	function openCreateDialog() {
		formData = { name: '', slug: '', description: '' };
		isCreateDialogOpen = true;
	}

	// Open edit dialog
	function openEditDialog(category: Category) {
		selectedCategory = category;
		formData = {
			name: category.name,
			slug: category.slug,
			description: category.description || ''
		};
		isEditDialogOpen = true;
	}

	// Open delete dialog
	function openDeleteDialog(category: Category) {
		selectedCategory = category;
		isDeleteDialogOpen = true;
	}

	// Handle create submission
	function handleCreateSubmit() {
		if (!formData.name.trim()) {
			toast.error('Название категории обязательно для заполнения');
			return;
		}

		const newCategory: Omit<Category, 'id'> = {
			name: formData.name.trim(),
			slug: formData.slug.trim(),
			description: formData.description.trim() || undefined
		};

		onCreate?.(newCategory);
		isCreateDialogOpen = false;
		formData = { name: '', slug: '', description: '' };
	}

	// Handle edit submission
	function handleEditSubmit() {
		if (!formData.name.trim()) {
			toast.error('Название категории обязательно для заполнения');
			return;
		}

		if (selectedCategory) {
			onUpdate?.(selectedCategory.id, {
				name: formData.name.trim(),
				slug: formData.slug.trim(),
				description: formData.description.trim() || undefined
			});
			isEditDialogOpen = false;
			selectedCategory = null;
			formData = { name: '', slug: '', description: '' };
		}
	}

	// Handle delete submission
	function handleDeleteSubmit() {
		if (selectedCategory) {
			onDelete?.(selectedCategory.id);
			isDeleteDialogOpen = false;
			selectedCategory = null;
		}
	}

	// Get equipment count for category
	function getEquipmentCount(categoryName: string): number {
		return equipment.filter((eq) => eq.category === categoryName).length;
	}
</script>

<div class="space-y-4">
	<!-- Header with Create Button -->
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-2xl font-semibold">Категории</h2>
			<p class="text-sm text-muted-foreground">
				Управление категориями оборудования ({categories.length})
			</p>
		</div>
		<Button onclick={openCreateDialog}>
			<PlusIcon class="mr-2 size-4" />
			Новая категория
		</Button>
	</div>

	<!-- Categories Table -->
	<div class="rounded-md border">
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[35%]">Название</Table.Head>
					<Table.Head class="w-[30%]">Slug</Table.Head>
					<Table.Head class="w-[20%]">Оборудование</Table.Head>
					<Table.Head class="w-[15%] text-right">Действия</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if categories.length === 0}
					<Table.Row>
						<Table.Cell colspan={4} class="h-24 text-center">
							<p class="text-muted-foreground">Нет категорий</p>
						</Table.Cell>
					</Table.Row>
				{:else}
					{#each categories as category (category.id)}
						<Table.Row class="hover:bg-muted/50">
							<Table.Cell class="font-medium">{category.name}</Table.Cell>
							<Table.Cell>
								<code class="rounded bg-muted px-2 py-1 text-sm">{category.slug}</code>
							</Table.Cell>
							<Table.Cell>
								<span class="text-sm">{getEquipmentCount(category.name)}</span>
							</Table.Cell>
							<Table.Cell class="text-right">
								<div class="flex justify-end gap-2">
									<Button
										variant="ghost"
										size="icon"
										onclick={() => openEditDialog(category)}
										aria-label="Редактировать"
										class="h-8 w-8"
									>
										<PencilIcon class="size-4" />
									</Button>
									<Button
										variant="ghost"
										size="icon"
										onclick={() => openDeleteDialog(category)}
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
</div>

<!-- Create Category Dialog -->
<Dialog.Root open={isCreateDialogOpen} onOpenChange={(val) => (isCreateDialogOpen = val)}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Новая категория</Dialog.Title>
			<Dialog.Description>
				Создайте новую категорию для классификации оборудования.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="create-name">Название *</Label>
				<Input
					id="create-name"
					bind:value={formData.name}
					oninput={(e) => handleNameChange(e.currentTarget.value)}
					placeholder="Например: освещение"
					required
				/>
			</div>
			<div class="grid gap-2">
				<Label for="create-slug">Slug</Label>
				<Input id="create-slug" bind:value={formData.slug} readonly class="bg-muted" />
				<p class="text-xs text-muted-foreground">
					Автоматически генерируется из названия
				</p>
			</div>
			<div class="grid gap-2">
				<Label for="create-description">Описание (опционально)</Label>
				<Input
					id="create-description"
					bind:value={formData.description}
					placeholder="Краткое описание категории"
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				<Button variant="outline">Отмена</Button>
			</Dialog.Close>
			<Button onclick={handleCreateSubmit}>Создать</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<!-- Edit Category Dialog -->
<Dialog.Root open={isEditDialogOpen} onOpenChange={(val) => (isEditDialogOpen = val)}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Редактировать категорию</Dialog.Title>
			<Dialog.Description>
				Измените данные категории. Slug будет обновлен при изменении названия.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="edit-name">Название *</Label>
				<Input
					id="edit-name"
					bind:value={formData.name}
					oninput={(e) => handleNameChange(e.currentTarget.value)}
					placeholder="Например: освещение"
					required
				/>
			</div>
			<div class="grid gap-2">
				<Label for="edit-slug">Slug</Label>
				<Input id="edit-slug" bind:value={formData.slug} readonly class="bg-muted" />
				<p class="text-xs text-muted-foreground">
					Автоматически генерируется из названия
				</p>
			</div>
			<div class="grid gap-2">
				<Label for="edit-description">Описание (опционально)</Label>
				<Input
					id="edit-description"
					bind:value={formData.description}
					placeholder="Краткое описание категории"
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				<Button variant="outline">Отмена</Button>
			</Dialog.Close>
			<Button onclick={handleEditSubmit}>Сохранить</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<!-- Delete Confirmation Dialog -->
<Dialog.Root open={isDeleteDialogOpen} onOpenChange={(val) => (isDeleteDialogOpen = val)}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Подтвердить удаление</Dialog.Title>
			<Dialog.Description>
				{#if selectedCategory && getEquipmentCount(selectedCategory.name) > 0}
					<div class="flex items-start gap-3 rounded-lg bg-destructive/10 p-4">
						<AlertCircleIcon class="size-5 flex-shrink-0 text-destructive" />
						<div>
							<p class="font-medium text-destructive">
								Невозможно удалить категорию
							</p>
							<p class="mt-1 text-sm text-destructive">
								Категория "{selectedCategory.name}" содержит
								{getEquipmentCount(selectedCategory.name)}
								объектов оборудования. Сначала удалите или переместите все оборудование из этой
								категории.
							</p>
						</div>
					</div>
				{:else if selectedCategory}
					<p>
						Вы уверены, что хотите удалить категорию "{selectedCategory.name}"? Это действие
						нельзя отменить.
					</p>
				{/if}
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Dialog.Close>
				<Button variant="outline">Отмена</Button>
			</Dialog.Close>
			{#if selectedCategory && getEquipmentCount(selectedCategory.name) === 0}
				<Button variant="destructive" onclick={handleDeleteSubmit}>Удалить</Button>
			{:else}
				<Button variant="destructive" disabled>Удалить</Button>
			{/if}
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
