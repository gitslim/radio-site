<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { Progress } from '$lib/components/ui/progress';
	import { cn } from '$lib/utils';
	import { toast } from 'svelte-sonner';

	interface FileWithStatus {
		file: File;
		previewUrl: string | null;
		status: 'pending' | 'uploading' | 'success' | 'error';
		progress: number;
		error?: string;
		fileUrl?: string;
	}

	interface Props {
		equipmentSlug: string;
		type: 'main' | 'gallery';
		onUploadSuccess: (fileUrl: string) => void;
		open: boolean;
		onOpenChange: (open: boolean) => void;
		multiple?: boolean;
	}

	let { equipmentSlug, type, onUploadSuccess, open, onOpenChange, multiple = false }: Props = $props();

	let selectedFiles = $state<FileWithStatus[]>([]);
	let isDragging = $state(false);
	let isUploading = $state(false);
	let globalError = $state<string | null>(null);

	// Allowed MIME types for images
	const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
	const MAX_FILES = 10; // Maximum files for multi-upload

	/**
	 * Validate a single file
	 */
	function validateFile(file: File): { valid: boolean; error?: string } {
		// Validate file type
		if (!ALLOWED_MIME_TYPES.includes(file.type)) {
			return { valid: false, error: 'Неверный тип файла. Разрешены только изображения (JPEG, PNG, WebP, AVIF, GIF).' };
		}

		// Validate file size
		if (file.size > MAX_FILE_SIZE) {
			return { valid: false, error: 'Размер файла превышает 5 МБ.' };
		}

		return { valid: true };
	}

	/**
	 * Handle file selection from input or drag-and-drop
	 */
	function handleFileSelect(files: FileList | null) {
		globalError = null;

		if (!files || files.length === 0) {
			return;
		}

		// In single mode, only take the first file
		const filesToProcess = multiple ? Array.from(files) : [files[0]];

		// Limit the number of files
		if (multiple && filesToProcess.length > MAX_FILES) {
			globalError = `Максимум ${MAX_FILES} файлов за раз. Выбрано: ${filesToProcess.length}.`;
			return;
		}

		const newFiles: FileWithStatus[] = [];

		for (const file of filesToProcess) {
			const validation = validateFile(file);
			if (validation.valid) {
				const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
				newFiles.push({
					file,
					previewUrl,
					status: 'pending',
					progress: 0
				});
			} else {
				// Show individual file error
				toast.error(`${file.name}: ${validation.error}`);
			}
		}

		if (newFiles.length > 0) {
			// In single mode, replace; in multi mode, append
			selectedFiles = multiple ? [...selectedFiles, ...newFiles] : newFiles;
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
		// Reset input value to allow selecting the same file again
		input.value = '';
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
	 * Remove a file from the selection
	 */
	function removeFile(index: number) {
		const file = selectedFiles[index];
		if (file.previewUrl) {
			URL.revokeObjectURL(file.previewUrl);
		}
		selectedFiles = selectedFiles.filter((_, i) => i !== index);
	}

	/**
	 * Upload a single file to server
	 */
	async function uploadSingleFile(fileWithStatus: FileWithStatus): Promise<{ success: boolean; fileUrl?: string; error?: string }> {
		try {
			// Create FormData
			const formData = new FormData();
			formData.append('file', fileWithStatus.file);
			formData.append('equipmentSlug', equipmentSlug);
			formData.append('type', type);

			// Upload to server
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			const data = await response.json();

			if (!response.ok) {
				return { success: false, error: data.error || 'Ошибка загрузки файла' };
			}

			if (data.success && data.fileUrl) {
				return { success: true, fileUrl: data.fileUrl };
			} else {
				return { success: false, error: 'Неожиданный ответ от сервера' };
			}
		} catch (err) {
			return { success: false, error: err instanceof Error ? err.message : 'Ошибка загрузки файла' };
		}
	}

	/**
	 * Upload all selected files sequentially
	 */
	async function handleUpload() {
		if (selectedFiles.length === 0) {
			globalError = 'Выберите файл(ы) для загрузки';
			return;
		}

		isUploading = true;
		globalError = null;

		let successCount = 0;
		let errorCount = 0;

		for (let i = 0; i < selectedFiles.length; i++) {
			const fileWithStatus = selectedFiles[i];

			// Skip already processed files
			if (fileWithStatus.status === 'success') {
				continue;
			}

			// Update status to uploading
			selectedFiles[i] = { ...fileWithStatus, status: 'uploading', progress: 0 };

			// Simulate progress updates
			const progressInterval = setInterval(() => {
				selectedFiles = selectedFiles.map((f, idx) =>
					idx === i && f.status === 'uploading' && f.progress < 90
						? { ...f, progress: f.progress + 10 }
						: f
				);
			}, 100);

			const result = await uploadSingleFile(fileWithStatus);

			clearInterval(progressInterval);

			if (result.success && result.fileUrl) {
				// Update status to success
				selectedFiles[i] = {
					...selectedFiles[i],
					status: 'success',
					progress: 100,
					fileUrl: result.fileUrl
				};
				successCount++;

				// Call success callback
				onUploadSuccess(result.fileUrl);
				toast.success(`${fileWithStatus.file.name} успешно загружен`);
			} else {
				// Update status to error
				selectedFiles[i] = {
					...selectedFiles[i],
					status: 'error',
					progress: 0,
					error: result.error
				};
				errorCount++;
				toast.error(`${fileWithStatus.file.name}: ${result.error}`);
			}
		}

		isUploading = false;

		// If all files succeeded, close the dialog
		if (errorCount === 0) {
			handleReset();
			onOpenChange(false);
		} else if (successCount > 0) {
			// Partial success - show summary
			toast.success(`Загружено ${successCount} из ${selectedFiles.length} файлов`);
		}
	}

	/**
	 * Reset form state
	 */
	function handleReset() {
		// Clean up preview URLs
		for (const file of selectedFiles) {
			if (file.previewUrl) {
				URL.revokeObjectURL(file.previewUrl);
			}
		}
		selectedFiles = [];
		isDragging = false;
		isUploading = false;
		globalError = null;
	}

	/**
	 * Clean up preview URLs when component unmounts
	 */
	$effect(() => {
		return () => {
			for (const file of selectedFiles) {
				if (file.previewUrl) {
					URL.revokeObjectURL(file.previewUrl);
				}
			}
		};
	});
</script>

<Dialog.Root bind:open onOpenChange={onOpenChange}>
	<Dialog.Content class="sm:max-w-lg">
		<Dialog.Header>
			<Dialog.Title>
				{type === 'main' ? 'Загрузить главное изображение' : 'Загрузить изображение в галерею'}
			</Dialog.Title>
			<Dialog.Description>
				{multiple
					? 'Перетащите файлы в область ниже или нажмите для выбора. Можно выбрать до 10 файлов.'
					: 'Перетащите файл в область ниже или нажмите кнопку для выбора.'}
				Максимальный размер: 5 МБ.
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4 py-4">
			<!-- Drag and Drop Zone (only show when no files selected) -->
			{#if selectedFiles.length === 0}
				<div
					class={cn(
						'border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition-colors',
						isDragging
							? 'border-primary bg-primary/5'
							: 'border-gray-300 hover:border-primary hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800'
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
					<p class="text-sm font-medium text-gray-700 dark:text-gray-300">
						{multiple ? 'Перетащите файлы сюда' : 'Перетащите файл сюда'}
					</p>
					<p class="text-xs text-gray-500 mt-1">или</p>
					<p class="text-sm text-primary font-medium mt-1">нажмите для выбора</p>
					<p class="text-xs text-gray-400 mt-2">
						{multiple ? 'JPEG, PNG, WebP, AVIF, GIF до 5 МБ (до 10 файлов)' : 'JPEG, PNG, WebP, AVIF, GIF до 5 МБ'}
					</p>

					<!-- Hidden file input -->
					<input
						id="file-input"
						type="file"
						accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
						class="hidden"
						onchange={handleInputChange}
						{multiple}
					/>
				</div>
			{:else}
				<!-- Files List -->
				<div class="space-y-3 max-h-[300px] overflow-y-auto">
					{#each selectedFiles as fileWithStatus, index (index)}
						<div
							class={cn(
								'border rounded-lg p-3 transition-colors',
								fileWithStatus.status === 'success' && 'border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-900/20',
								fileWithStatus.status === 'error' && 'border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
								fileWithStatus.status === 'uploading' && 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20',
								fileWithStatus.status === 'pending' && 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
							)}
						>
							<div class="flex items-start gap-3">
								{#if fileWithStatus.previewUrl}
									<div class="w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
										<img
											src={fileWithStatus.previewUrl}
											alt={fileWithStatus.file.name}
											class="w-full h-full object-cover"
										/>
									</div>
								{:else}
									<div
										class="w-16 h-16 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-gray-400">
											<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
											<path d="M14 2v4a2 2 0 0 0 2 2h4" />
										</svg>
									</div>
								{/if}

								<div class="flex-1 min-w-0">
									<p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
										{fileWithStatus.file.name}
									</p>
									<p class="text-xs text-gray-500 mt-0.5">
										{formatFileSize(fileWithStatus.file.size)}
									</p>

									<!-- Status indicator -->
									{#if fileWithStatus.status === 'uploading'}
										<div class="mt-2">
											<Progress value={fileWithStatus.progress} max={100} class="w-full h-1.5" />
											<p class="text-xs text-blue-600 dark:text-blue-400 mt-1">Загрузка... {fileWithStatus.progress}%</p>
										</div>
									{:else if fileWithStatus.status === 'success'}
										<p class="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
												<path d="M20 6 9 17l-5-5" />
											</svg>
											Загружено
										</p>
									{:else if fileWithStatus.status === 'error'}
										<p class="text-xs text-red-600 dark:text-red-400 mt-1">{fileWithStatus.error || 'Ошибка загрузки'}</p>
									{/if}
								</div>

								<!-- Remove file button -->
								{#if fileWithStatus.status !== 'uploading'}
									<Button
										variant="ghost"
										size="icon"
										class="text-gray-400 hover:text-gray-600 h-8 w-8"
										onclick={() => removeFile(index)}
										disabled={isUploading}
										aria-label="Удалить файл"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
											<path d="M18 6 6 18" />
											<path d="m6 6 12 12" />
										</svg>
									</Button>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				<!-- Add more files button (only in multi mode) -->
				{#if multiple && !isUploading}
					<Button
						variant="outline"
						size="sm"
						class="w-full"
						onclick={() => document.getElementById('file-input-add')?.click()}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-2">
							<path d="M5 12h14" />
							<path d="M12 5v14" />
						</svg>
						Добавить файлы
					</Button>
					<input
						id="file-input-add"
						type="file"
						accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
						class="hidden"
						onchange={handleInputChange}
						multiple
					/>
				{/if}
			{/if}

			{#if globalError}
				<div class="p-3 rounded-md bg-destructive/10 border border-destructive/20">
					<p class="text-sm text-destructive flex items-center gap-2">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
						{globalError}
					</p>
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
				disabled={selectedFiles.length === 0 || isUploading}
				class="min-w-[120px]"
			>
				{#if isUploading}
					Загрузка...
				{:else if multiple && selectedFiles.length > 1}
					Загрузить {selectedFiles.length} файлов
				{:else}
					Загрузить
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
