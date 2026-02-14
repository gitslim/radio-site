<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { cn } from '$lib/utils';

	interface Props {
		equipmentSlug: string;
		type: 'main' | 'gallery';
		onUploadSuccess: (fileUrl: string) => void;
		open: boolean;
		onOpenChange: (open: boolean) => void;
	}

	let { equipmentSlug, type, onUploadSuccess, open, onOpenChange }: Props = $props();

	let selectedFile = $state<File | null>(null);
	let isDragging = $state(false);
	let isUploading = $state(false);
	let uploadProgress = $state(0);
	let error = $state<string | null>(null);
	let previewUrl = $state<string | null>(null);

	// Allowed MIME types for images
	const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

	/**
	 * Handle file selection from input or drag-and-drop
	 */
	function handleFileSelect(files: FileList | null) {
		error = null;
		previewUrl = null;

		if (!files || files.length === 0) {
			return;
		}

		const file = files[0];

		// Validate file type
		if (!ALLOWED_MIME_TYPES.includes(file.type)) {
			error = 'Неверный тип файла. Разрешены только изображения (JPEG, PNG, WebP, AVIF, GIF).';
			selectedFile = null;
			return;
		}

		// Validate file size
		if (file.size > MAX_FILE_SIZE) {
			error = 'Размер файла превышает 5 МБ.';
			selectedFile = null;
			return;
		}

		selectedFile = file;

		// Create preview URL for images
		if (file.type.startsWith('image/')) {
			previewUrl = URL.createObjectURL(file);
		}
	}

	/**
	 * Handle drag-and-drop events
	 */
	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		event.stopPropagation();
		isDragging = false;

		if (event.dataTransfer?.files) {
			handleFileSelect(event.dataTransfer.files);
		}
	}

	/**
	 * Handle file input change
	 */
	function handleInputChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			handleFileSelect(input.files);
		}
	}

	/**
	 * Format file size to human-readable format
	 */
	function formatFileSize(bytes: number): string {
		if (bytes === 0) return '0 Байт';
		const k = 1024;
		const sizes = ['Байт', 'КБ', 'МБ'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
	}

	/**
	 * Upload file to server
	 */
	async function handleUpload() {
		if (!selectedFile) {
			error = 'Выберите файл для загрузки';
			return;
		}

		isUploading = true;
		error = null;
		uploadProgress = 0;

		try {
			// Create FormData
			const formData = new FormData();
			formData.append('file', selectedFile);
			formData.append('equipmentSlug', equipmentSlug);
			formData.append('type', type);

			// Simulate progress (since XMLHttpRequest not easily available in modern fetch)
			// In production, you might want to use XMLHttpRequest for real progress tracking
			const progressInterval = setInterval(() => {
				if (uploadProgress < 90) {
					uploadProgress += 10;
				}
			}, 100);

			// Upload to server
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			clearInterval(progressInterval);

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Ошибка загрузки файла');
			}

			if (data.success && data.fileUrl) {
				uploadProgress = 100;
				// Success callback
				onUploadSuccess(data.fileUrl);

				// Reset form and close dialog
				handleReset();
				onOpenChange(false);
			} else {
				throw new Error('Неожиданный ответ от сервера');
			}
		} catch (err) {
			console.error('Upload error:', err);
			error = err instanceof Error ? err.message : 'Ошибка загрузки файла';
		} finally {
			isUploading = false;
		}
	}

	/**
	 * Reset form state
	 */
	function handleReset() {
		selectedFile = null;
		isDragging = false;
		isUploading = false;
		uploadProgress = 0;
		error = null;
		if (previewUrl) {
			URL.revokeObjectURL(previewUrl);
			previewUrl = null;
		}
	}

	/**
	 * Clean up preview URL when component unmounts
	 */
	$effect(() => {
		return () => {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl);
			}
		};
	});
</script>

<Dialog.Root bind:open onOpenChange={onOpenChange}>
	<Dialog.Content class="sm:max-w-md">
		<Dialog.Header>
			<Dialog.Title>
				{type === 'main' ? 'Загрузить главное изображение' : 'Загрузить изображение в галерею'}
			</Dialog.Title>
			<Dialog.Description>
				Перетащите файл в область ниже или нажмите кнопку для выбора. Максимальный размер: 5 МБ.
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4 py-4">
			{#if !selectedFile}
				<!-- Drag and Drop Zone -->
				<div
					class={cn(
						'border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors',
						isDragging
							? 'border-primary bg-primary/5'
							: 'border-gray-300 hover:border-primary hover:bg-gray-50'
					)}
					role="button"
					tabindex="0"
					ondragover={handleDragOver}
					ondragleave={handleDragLeave}
					ondrop={handleDrop}
					onkeydown={(e) => e.key === 'Enter' && document.getElementById('file-input')?.click()}
					onclick={() => document.getElementById('file-input')?.click()}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-12 h-12 text-gray-400 mb-2">
						<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
						<polyline points="17 8 12 3 7 8" />
						<line x1="12" x2="12" y1="3" y2="15" />
					</svg>
					<p class="text-sm font-medium text-gray-700">Перетащите файл сюда</p>
					<p class="text-xs text-gray-500 mt-1">или</p>
					<p class="text-sm text-primary font-medium mt-1">нажмите для выбора</p>
					<p class="text-xs text-gray-400 mt-2">JPEG, PNG, WebP, AVIF, GIF до 5 МБ</p>

					<!-- Hidden file input -->
					<input
						id="file-input"
						type="file"
						accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
						class="hidden"
						onchange={handleInputChange}
					/>
				</div>
			{:else}
				<!-- File Preview -->
				<div class="border rounded-lg p-4">
					<div class="flex items-start gap-4">
						{#if previewUrl}
							<div class="w-20 h-20 rounded overflow-hidden bg-gray-100 flex-shrink-0">
								<img
									src={previewUrl}
									alt={selectedFile.name}
									class="w-full h-full object-cover"
								/>
							</div>
						{:else}
							<div
								class="w-20 h-20 rounded bg-gray-100 flex items-center justify-center flex-shrink-0"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-gray-400">
									<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
									<path d="M14 2v4a2 2 0 0 0 2 2h4" />
								</svg>
							</div>
						{/if}

						<div class="flex-1 min-w-0">
							<p class="text-sm font-medium text-gray-900 truncate">
								{selectedFile.name}
							</p>
							<p class="text-xs text-gray-500 mt-1">{formatFileSize(selectedFile.size)}</p>
							<p class="text-xs text-gray-500 mt-1">{selectedFile.type}</p>
						</div>

						<!-- Remove file button -->
						<Button
							variant="ghost"
							size="icon"
							class="text-gray-400 hover:text-gray-600"
							onclick={handleReset}
							disabled={isUploading}
							aria-label="Удалить файл"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</Button>
					</div>
				</div>
			{/if}

			{#if error}
				<div class="p-3 rounded-md bg-destructive/10 border border-destructive/20">
					<p class="text-sm text-destructive flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
						{error}
					</p>
				</div>
			{/if}

			{#if isUploading}
				<!-- Upload Progress -->
				<div class="space-y-2">
					<div class="flex items-center justify-between text-sm">
						<span class="text-gray-600">Загрузка файла...</span>
						<span class="font-medium text-gray-900">{uploadProgress}%</span>
					</div>
					<Progress value={uploadProgress} max={100} class="w-full" />
				</div>
			{/if}
		</div>

		<Dialog.Footer>
			<Button
				variant="outline"
				onclick={() => {
					handleReset();
					onOpenChange(false);
				}}
				disabled={isUploading}
			>
				Отмена
			</Button>
			<Button
				onclick={handleUpload}
				disabled={!selectedFile || isUploading}
				class="min-w-[120px]"
			>
				{#if isUploading}
					Загрузка...
				{:else}
					Загрузить
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
