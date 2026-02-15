<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import AdminLayout from '$lib/components/admin/AdminLayout.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import type { Equipment, Specification, EquipmentCategory } from '$lib/data/equipment';
	import {
		createEquipment,
		fetchCategories,
		fetchEquipment,
		updateEquipment,
		ApiError
	} from '$lib/admin/api-client';
	import { generateSlug, validateEquipment } from '$lib/admin/validation';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import SaveIcon from '@lucide/svelte/icons/save';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import FileUpload from '$lib/components/media/FileUpload.svelte';
	import MediaGallery from '$lib/components/media/MediaGallery.svelte';

	let slug = $derived($page.params.slug);
	let title = $derived(slug === 'new' ? 'Create Equipment' : 'Edit Equipment');

	// Form state
	let formData = $state({
		id: '',
		name: '',
		slug: '',
		category: '' as EquipmentCategory,
		description: '',
		specifications: [] as Specification[],
		images: [] as string[],
		available: true,
		featured: false
	});

	// UI state
	let isLoading = $state(true);
	let isSaving = $state(false);
	let isProcessingMedia = $state(false);
	let validationErrors = $state<string[]>([]);
	let apiError = $state<string | null>(null);
	let mediaMessage = $state<{ type: 'success' | 'error'; text: string } | null>(null);
	let categories = $state<{ id: string; name: string }[]>([]);

	// Upload dialog states
	let uploadDialogOpen = $state(false);
	let galleryUploadDialogOpen = $state(false);

	// Determine mode
	let isCreateMode = $derived(slug === 'new');

	// Load data on mount
	async function loadData() {
		try {
			// Fetch categories
			categories = await fetchCategories();

			// If edit mode, fetch equipment data
			if (!isCreateMode) {
				const equipmentList = await fetchEquipment();
				const equipment = equipmentList.find((eq) => eq.slug === slug);

				if (equipment) {
					formData = {
						id: equipment.id,
						name: equipment.name,
						slug: equipment.slug,
						category: equipment.category,
						description: equipment.description,
						specifications: equipment.specifications,
						images: equipment.images || [],
						available: equipment.available,
						featured: equipment.featured || false
					};
				} else {
					apiError = `Equipment with slug "${slug}" not found`;
				}
			}
		} catch (error) {
			console.error('Failed to load data:', error);
			if (error instanceof ApiError) {
				apiError = error.message;
			} else {
				apiError = 'Failed to load data';
			}
		} finally {
			isLoading = false;
		}
	}

	// Handle name change to auto-generate slug
	function handleNameChange(name: string) {
		formData.name = name;
		if (isCreateMode) {
			formData.slug = generateSlug(name);
		}
	}

	// Handle slug change
	function handleSlugChange(slug: string) {
		formData.slug = slug;
	}

	// Add specification row
	function addSpecification() {
		formData.specifications = [...formData.specifications, { label: '', value: '' }];
	}

	// Remove specification row
	function removeSpecification(index: number) {
		formData.specifications = formData.specifications.filter((_, i) => i !== index);
	}

	// Update specification
	function updateSpecification(index: number, field: keyof Specification, value: string) {
		formData.specifications = formData.specifications.map((spec, i) =>
			i === index ? { ...spec, [field]: value } : spec
		);
	}

	// Handle image upload success
	async function handleImageUpload(fileUrl: string, type: 'main' | 'gallery') {
		try {
			if (type === 'main') {
				// Insert at the beginning
				formData.images = [fileUrl, ...formData.images];
			} else {
				// Append to gallery
				formData.images = [...formData.images, fileUrl];
			}

			// Save to persist the change
			await updateEquipment(formData.id, formData);

			mediaMessage = { type: 'success', text: 'Изображение успешно добавлено' };
		} catch (error) {
			console.error('Failed to upload image:', error);
			mediaMessage = { type: 'error', text: 'Не удалось добавить изображение' };
			// Revert the change
			if (type === 'main') {
				formData.images = formData.images.filter((url) => url !== fileUrl);
			} else {
				formData.images = formData.images.filter((url) => url !== fileUrl);
			}
		}

		// Clear message after 3 seconds
		setTimeout(() => {
			mediaMessage = null;
		}, 3000);
	}

	// Handle image deletion
	async function handleImageDelete(imageUrl: string) {
		try {
			isProcessingMedia = true;
			mediaMessage = null;

			// Remove URL from images array
			formData.images = formData.images.filter((url) => url !== imageUrl);

			// Delete file from disk
			// Extract the relative path from the URL
			// URL format: /images/equipment/slug/filename.ext
			const relativePath = imageUrl.replace('/images/equipment/', '');
			const deleteResponse = await fetch(`/api/files/${relativePath}`, {
				method: 'DELETE'
			});

			if (!deleteResponse.ok) {
				const errorData = await deleteResponse.json();
				throw new Error(errorData.error || 'Failed to delete file');
			}

			// Update equipment to persist the change
			await updateEquipment(formData.id, formData);

			mediaMessage = { type: 'success', text: 'Изображение успешно удалено' };
		} catch (error) {
			console.error('Failed to delete image:', error);
			mediaMessage = { type: 'error', text: 'Не удалось удалить изображение' };
			// Reload data to restore state
			await loadData();
		} finally {
			isProcessingMedia = false;
			// Clear message after 3 seconds
			setTimeout(() => {
				mediaMessage = null;
			}, 3000);
		}
	}

	// Handle set image as main
	async function handleSetMain(imageUrl: string) {
		try {
			isProcessingMedia = true;
			mediaMessage = null;

			// Remove the image from current position
			const otherImages = formData.images.filter((url) => url !== imageUrl);

			// Insert at the beginning
			formData.images = [imageUrl, ...otherImages];

			// Update equipment to persist the change
			await updateEquipment(formData.id, formData);

			mediaMessage = { type: 'success', text: 'Главное изображение успешно обновлено' };
		} catch (error) {
			console.error('Failed to set main image:', error);
			mediaMessage = { type: 'error', text: 'Не удалось обновить главное изображение' };
			// Reload data to restore state
			await loadData();
		} finally {
			isProcessingMedia = false;
			// Clear message after 3 seconds
			setTimeout(() => {
				mediaMessage = null;
			}, 3000);
		}
	}

	// Validate form
	function validateForm(): boolean {
		// Prepare data for validation
		const equipmentData: Partial<Equipment> = {
			id: isCreateMode ? generateSlug(formData.name) : formData.id,
			name: formData.name,
			slug: formData.slug,
			category: formData.category,
			description: formData.description,
			specifications: formData.specifications,
			images: formData.images,
			available: formData.available,
			featured: formData.featured
		};

		const validation = validateEquipment(equipmentData);
		validationErrors = validation.errors;

		return validation.valid;
	}

	// Handle form submission
	async function handleSubmit() {
		apiError = null;

		// Client-side validation
		if (!validateForm()) {
			return;
		}

		isSaving = true;

		try {
			const equipmentData: Partial<Equipment> = {
				id: isCreateMode ? generateSlug(formData.name) : formData.id,
				name: formData.name,
				slug: formData.slug,
				category: formData.category,
				description: formData.description,
				specifications: formData.specifications,
				images: formData.images,
				available: formData.available,
				featured: formData.featured
			};

			if (isCreateMode) {
				await createEquipment(equipmentData);
			} else {
				await updateEquipment(formData.id, equipmentData);
			}

			// Redirect to admin list
			await goto('/admin');
		} catch (error) {
			console.error('Failed to save equipment:', error);
			if (error instanceof ApiError) {
				apiError = error.message;
			} else {
				apiError = 'Failed to save equipment';
			}
		} finally {
			isSaving = false;
		}
	}

	// Cancel and go back
	function handleCancel() {
		goto('/admin');
	}

	// Load data on mount
	$effect(() => {
		loadData();
	});
</script>

<svelte:head>
	<title>{title} - Admin</title>
</svelte:head>

<AdminLayout>
	{#snippet children()}
		<div class="container mx-auto px-4 py-8">
			<div class="mx-auto max-w-4xl">
				<!-- Header -->
				<div class="mb-6 flex items-center justify-between">
					<div class="flex items-center gap-3">
						<Button
							variant="ghost"
							size="icon"
							onclick={handleCancel}
							aria-label="Go back to equipment list"
						>
							<ArrowLeftIcon class="h-5 w-5" />
						</Button>
						<h1 class="text-3xl font-bold">{title}</h1>
					</div>
					<Button
						onclick={handleSubmit}
						disabled={isSaving || isLoading}
						class="gap-2"
					>
						<SaveIcon class="h-4 w-4" />
						{isSaving ? 'Saving...' : 'Save'}
					</Button>
				</div>

				{#if isLoading}
					<div class="flex items-center justify-center py-12">
						<p class="text-muted-foreground">Loading...</p>
					</div>
				{:else if apiError}
					<div class="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
						<p class="font-semibold text-destructive">Error</p>
						<p class="text-sm text-destructive">{apiError}</p>
					</div>
				{:else}
					<!-- API Error Display -->
					{#if apiError}
						<div class="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
							<p class="font-semibold text-destructive">Error</p>
							<p class="text-sm text-destructive">{apiError}</p>
						</div>
					{/if}

					<!-- Validation Errors Display -->
					{#if validationErrors.length > 0}
						<div class="mb-6 rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
							<p class="font-semibold text-amber-700 dark:text-amber-300">Validation Errors</p>
							<ul class="mt-2 list-inside list-disc text-sm text-amber-700 dark:text-amber-300">
								{#each validationErrors as error}
									<li>{error}</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- Form -->
					<form onsubmit={(e) => e.preventDefault()} class="space-y-6">
						<!-- Name and Slug -->
						<div class="grid gap-6 md:grid-cols-2">
							<div class="space-y-2">
								<Label for="name">Name *</Label>
								<Input
									id="name"
									type="text"
									placeholder="Equipment name"
									bind:value={formData.name}
									oninput={(e) => handleNameChange(e.currentTarget.value)}
									required
								/>
								<p class="text-muted-foreground text-xs">
									Will auto-generate slug in create mode
								</p>
							</div>

							<div class="space-y-2">
								<Label for="slug">Slug *</Label>
								<Input
									id="slug"
									type="text"
									placeholder="equipment-slug"
									bind:value={formData.slug}
									oninput={(e) => handleSlugChange(e.currentTarget.value)}
									disabled={!isCreateMode}
									required
								/>
								{#if !isCreateMode}
									<p class="text-muted-foreground text-xs">
										Cannot be changed in edit mode
									</p>
								{:else}
									<p class="text-muted-foreground text-xs">
										Lowercase letters, numbers, and hyphens only
									</p>
								{/if}
							</div>
						</div>

						<!-- Category -->
						<div class="space-y-2">
							<Label for="category">Category *</Label>
							<Select.Root
								type="single"
								bind:value={formData.category}
								name="category"
							>
								<Select.Trigger id="category" class="w-full">
									{formData.category || 'Select a category'}
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.Label>Categories</Select.Label>
										{#each categories as category (category.id)}
											<Select.Item value={category.name}>
												{category.name}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						</div>

						<!-- Description -->
						<div class="space-y-2">
							<Label for="description">Description *</Label>
							<Textarea
								id="description"
								placeholder="Equipment description"
								bind:value={formData.description}
								rows={5}
								required
							/>
						</div>

						<!-- Specifications -->
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<Label>Specifications</Label>
								<Button
									type="button"
									variant="outline"
									size="sm"
									onclick={addSpecification}
									class="gap-2"
								>
									<PlusIcon class="h-4 w-4" />
									Add Specification
								</Button>
							</div>

							{#each formData.specifications as spec, index (index)}
								<div class="flex gap-2">
									<div class="flex-1">
										<Label for={`spec-label-${index}`} class="sr-only">
											Label
										</Label>
										<Input
											id={`spec-label-${index}`}
											type="text"
											placeholder="Label (e.g., Weight)"
											bind:value={spec.label}
											oninput={(e) =>
												updateSpecification(index, 'label', e.currentTarget.value)}
										/>
									</div>
									<div class="flex-1">
										<Label for={`spec-value-${index}`} class="sr-only">
											Value
										</Label>
										<Input
											id={`spec-value-${index}`}
											type="text"
											placeholder="Value (e.g., 5kg)"
											bind:value={spec.value}
											oninput={(e) =>
												updateSpecification(index, 'value', e.currentTarget.value)}
										/>
									</div>
									<Button
										type="button"
										variant="outline"
										size="icon"
										onclick={() => removeSpecification(index)}
										aria-label="Remove specification"
									>
										<Trash2Icon class="h-4 w-4" />
									</Button>
								</div>
							{/each}

							{#if formData.specifications.length === 0}
								<p class="text-muted-foreground text-sm">
									No specifications added. Click "Add Specification" to add one.
								</p>
							{/if}
						</div>

						<!-- Checkboxes -->
						<div class="grid gap-4 md:grid-cols-2">
							<div class="flex items-center gap-3">
								<Checkbox id="available" bind:checked={formData.available} />
								<Label for="available" class="cursor-pointer">
									Available for rent
								</Label>
							</div>

							<div class="flex items-center gap-3">
								<Checkbox id="featured" bind:checked={formData.featured} />
								<Label for="featured" class="cursor-pointer">
									Featured equipment
								</Label>
							</div>
						</div>

						<!-- Images Section -->
						<div class="space-y-4">
							<div class="flex items-center justify-between">
								<Label>Изображения</Label>
								<div class="flex gap-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onclick={() => (uploadDialogOpen = true)}
										class="gap-2"
										disabled={isSaving || !formData.slug || isProcessingMedia}
									>
										<PlusIcon class="h-4 w-4" />
										Загрузить главное
									</Button>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onclick={() => (galleryUploadDialogOpen = true)}
										class="gap-2"
										disabled={isSaving || !formData.slug || isProcessingMedia}
									>
										<PlusIcon class="h-4 w-4" />
										В галерею
									</Button>
								</div>
							</div>

							{#if mediaMessage}
								<div
									class="p-3 rounded-md border {mediaMessage.type === 'success'
										? 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200'
										: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200'}"
								>
									<p class="text-sm">{mediaMessage.text}</p>
								</div>
							{/if}

							<!-- Media Gallery -->
							{#if !isCreateMode && formData.slug}
								<MediaGallery
									equipmentSlug={formData.slug}
									images={formData.images}
									onDelete={handleImageDelete}
									onSetMain={handleSetMain}
								/>
							{:else}
								<p class="text-muted-foreground text-sm">
									Сначала сохраните оборудование, чтобы добавить изображения
								</p>
							{/if}
						</div>

						<!-- File Upload Dialogs -->
						<FileUpload
							equipmentSlug={formData.slug || ''}
							type="main"
							onUploadSuccess={(fileUrl) => handleImageUpload(fileUrl, 'main')}
							open={uploadDialogOpen}
							onOpenChange={(open) => (uploadDialogOpen = open)}
						/>

						<FileUpload
							equipmentSlug={formData.slug || ''}
							type="gallery"
							multiple={true}
							onUploadSuccess={(fileUrl) => handleImageUpload(fileUrl, 'gallery')}
							open={galleryUploadDialogOpen}
							onOpenChange={(open) => (galleryUploadDialogOpen = open)}
						/>

						<!-- Form Actions -->
						<div class="flex items-center justify-end gap-3 border-t pt-6">
							<Button
								type="button"
								variant="outline"
								onclick={handleCancel}
								disabled={isSaving || isProcessingMedia}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								onclick={handleSubmit}
								disabled={isSaving || isProcessingMedia}
								class="gap-2"
							>
								<SaveIcon class="h-4 w-4" />
								{isSaving ? 'Saving...' : 'Save Equipment'}
							</Button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	{/snippet}
</AdminLayout>
