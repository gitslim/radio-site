<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Trash2, Eye, Star, ImagePlus } from '@lucide/svelte';

	interface Props {
		/** Equipment slug for identifying images */
		equipmentSlug: string;
		/** Array of image URLs (first image is main) */
		images: string[];
		/** Callback when image is deleted */
		onDelete: (imageUrl: string) => void;
		/** Callback when gallery image is set as main */
		onSetMain: (imageUrl: string) => void;
	}

	let { equipmentSlug, images, onDelete, onSetMain }: Props = $props();

	// State for preview modal
	let previewImage = $state<string | null>(null);

	// State for delete confirmation dialog
	let imageToDelete = $state<string | null>(null);
	let deleteDialogOpen = $state(false);

	// Derived values
	let mainImage = $derived(images[0] || null);
	let galleryImages = $derived(images.slice(1));

	/**
	 * Open image preview modal
	 */
	function handleImageClick(imageUrl: string) {
		previewImage = imageUrl;
	}

	/**
	 * Open delete confirmation dialog
	 */
	function handleDeleteClick(imageUrl: string) {
		imageToDelete = imageUrl;
		deleteDialogOpen = true;
	}

	/**
	 * Confirm deletion and close dialog
	 */
	function confirmDelete() {
		if (imageToDelete) {
			onDelete(imageToDelete);
		}
		imageToDelete = null;
		deleteDialogOpen = false;
	}

	/**
	 * Set gallery image as main image
	 */
	function handleSetMain(imageUrl: string) {
		onSetMain(imageUrl);
	}
</script>

{#if images.length === 0}
	<!-- Empty State -->
	<div class="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
		<ImagePlus class="w-16 h-16 text-gray-400 mb-4" />
		<p class="text-lg font-medium text-gray-900 mb-2">Нет изображений</p>
		<p class="text-sm text-gray-500 text-center mb-4">Загрузите главное изображение и добавьте изображения в галерею</p>
	</div>
{:else}
	<div class="space-y-6">
		{#if mainImage}
			<!-- Main Image Section -->
			<div class="space-y-2">
				<div class="flex items-center gap-2">
					<Badge>Главное</Badge>
					<span class="text-sm text-gray-500">Основное изображение для карточки оборудования</span>
				</div>
				<Card.Root>
					<Card.Content class="p-0">
						<div class="relative group">
							<img
								src={mainImage}
								alt="Главное изображение для {equipmentSlug}"
								loading="lazy"
								class="w-full h-80 object-cover cursor-pointer rounded-lg transition-transform group-hover:scale-[1.02]"
								onclick={() => handleImageClick(mainImage)}
							/>
							<!-- Action Overlay -->
							<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
								<Button
									variant="outline"
									size="icon"
									class="bg-white hover:bg-gray-100 text-gray-900 border-white"
									onclick={(e) => {
										e.stopPropagation();
										handleImageClick(mainImage);
									}}
									aria-label="Просмотреть изображение"
								>
									<Eye class="w-5 h-5" />
								</Button>
								<Button
									variant="destructive"
									size="icon"
									onclick={(e) => {
										e.stopPropagation();
										handleDeleteClick(mainImage);
									}}
									aria-label="Удалить изображение"
								>
									<Trash2 class="w-5 h-5" />
								</Button>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		{/if}

		{#if galleryImages.length > 0}
			<!-- Gallery Images Section -->
			<div class="space-y-2">
				<h3 class="text-sm font-medium text-gray-700">
					Галерея ({galleryImages.length})
				</h3>
				<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{#each galleryImages as image (image)}
						<Card.Root>
							<Card.Content class="p-0">
								<div class="relative group">
									<img
										src={image}
										alt="Изображение галереи для {equipmentSlug}"
										loading="lazy"
										class="w-full h-40 object-cover cursor-pointer rounded-lg transition-transform group-hover:scale-[1.02]"
										onclick={() => handleImageClick(image)}
									/>
									<!-- Action Overlay -->
									<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2">
										<div class="flex items-center gap-2">
											<Button
												variant="outline"
												size="icon"
												class="bg-white hover:bg-gray-100 text-gray-900 border-white"
												onclick={(e) => {
													e.stopPropagation();
													handleImageClick(image);
												}}
												aria-label="Просмотреть изображение"
											>
												<Eye class="w-4 h-4" />
											</Button>
											<Button
												variant="default"
												size="icon"
												class="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
												onclick={(e) => {
													e.stopPropagation();
													handleSetMain(image);
												}}
												aria-label="Сделать главным изображением"
												title="Сделать главным"
											>
												<Star class="w-4 h-4 fill-current" />
											</Button>
										</div>
										<Button
											variant="destructive"
											size="icon"
											onclick={(e) => {
												e.stopPropagation();
												handleDeleteClick(image);
											}}
											aria-label="Удалить изображение"
										>
											<Trash2 class="w-4 h-4" />
										</Button>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}

<!-- Preview Modal -->
<Dialog.Root bind:open={previewImage}>
	<Dialog.Content class="sm:max-w-4xl w-full">
		<Dialog.Header>
			<Dialog.Title>Просмотр изображения</Dialog.Title>
		</Dialog.Header>
		{#if previewImage}
			<div class="flex items-center justify-center">
				<img
					src={previewImage}
					alt="Изображение для {equipmentSlug}"
					class="max-w-full max-h-[70vh] object-contain rounded-lg"
				/>
			</div>
		{/if}
		<Dialog.Footer>
			<Dialog.Close class="w-full">Закрыть</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<!-- Delete Confirmation Dialog -->
<Dialog.Root bind:open={deleteDialogOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Подтвердите удаление</Dialog.Title>
			<Dialog.Description>
				Вы уверены, что хотите удалить это изображение? Это действие нельзя отменить.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Dialog.Close variant="outline">Отмена</Dialog.Close>
			<Button variant="destructive" onclick={confirmDelete}>Удалить</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
