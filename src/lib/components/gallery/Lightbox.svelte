<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	import { onMount } from "svelte";
	import type { GalleryImage } from "$lib/data/gallery";

	interface Props {
		images: GalleryImage[];
		currentIndex: number;
		isOpen: boolean;
		onClose: () => void;
		onNavigate: (index: number) => void;
	}

	let { images, currentIndex, isOpen, onClose, onNavigate }: Props = $props();

	// Keyboard navigation
	onMount(() => {
		const handleKeydown = (e: KeyboardEvent) => {
			if (!isOpen) return;

			switch (e.key) {
				case "Escape":
					onClose();
					break;
				case "ArrowLeft":
					e.preventDefault();
					onNavigate((currentIndex - 1 + images.length) % images.length);
					break;
				case "ArrowRight":
					e.preventDefault();
					onNavigate((currentIndex + 1) % images.length);
					break;
			}
		};

		window.addEventListener("keydown", handleKeydown);
		return () => window.removeEventListener("keydown", handleKeydown);
	});
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={(open) => !open && onClose()}>
	<Dialog.Content class="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
		<div class="relative w-full h-full flex flex-col items-center justify-center bg-black">
			{#if images[currentIndex]}
				<img
					src={images[currentIndex].src}
					alt={images[currentIndex].alt}
					class="max-w-full max-h-[85vh] object-contain"
				/>
				{#if images[currentIndex].caption}
					<p class="absolute bottom-16 left-0 right-0 text-center text-white bg-black/50 px-4 py-2">
						{images[currentIndex].caption}
					</p>
				{/if}
			{/if}

			<!-- Navigation buttons -->
			<div class="absolute top-1/2 left-2 -translate-y-1/2">
				<Button
					variant="outline"
					size="icon"
					class="bg-black/50 hover:bg-black/70 text-white border-white/30"
					aria-label="Previous image"
					onclick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="m15 18-6-6 6-6" />
					</svg>
				</Button>
			</div>

			<div class="absolute top-1/2 right-2 -translate-y-1/2">
				<Button
					variant="outline"
					size="icon"
					class="bg-black/50 hover:bg-black/70 text-white border-white/30"
					aria-label="Next image"
					onclick={() => onNavigate((currentIndex + 1) % images.length)}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="m9 18 6-6-6-6" />
					</svg>
				</Button>
			</div>

			<!-- Counter -->
			<div class="absolute bottom-4 right-4 text-white bg-black/50 px-3 py-1 rounded-md text-sm">
				{currentIndex + 1} / {images.length}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
