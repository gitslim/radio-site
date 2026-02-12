<script lang="ts" module>
	import type { Equipment } from '$lib/data/equipment';

	export interface EquipmentCardProps {
		equipment: Equipment;
		onClick?: () => void;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { loadEquipmentImage } from '$lib/utils/image.js';
	import {
		Card,
		CardContent
	} from '$lib/components/ui/card';

	let { equipment, onClick }: EquipmentCardProps = $props();

	const handleClick = (): void => {
		onClick?.();
	};

	const handleKeyPress = (event: KeyboardEvent): void => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	};

	// Get the first image or use a placeholder
	const primaryImage = $derived(equipment.images?.[0] || '');
	const imageSrc = $derived(primaryImage.startsWith('/') ? primaryImage : loadEquipmentImage(primaryImage));
</script>

{#if onClick}
	<button
		type="button"
		class={cn(
			'group relative w-full text-left transition-all duration-200',
			'hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
		)}
		onclick={handleClick}
		onkeypress={handleKeyPress}
		aria-label={`${equipment.name}: ${equipment.description}`}
	>
		<Card
			class={cn(
				'h-full overflow-hidden border-2 border-transparent cursor-pointer hover:border-primary/20'
			)}
		>
			<div class="aspect-video w-full overflow-hidden bg-muted">
				<img
					src={imageSrc}
					alt={equipment.name}
					loading="lazy"
					class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<CardContent class="p-4">
				<div class="mb-2 flex items-center justify-between">
					<span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
						{equipment.category}
					</span>
					{#if equipment.available === false}
						<span
							class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-destructive/10 text-destructive"
							aria-label="Недоступно"
						>
							Недоступно
						</span>
					{/if}
				</div>
				<h3 class="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
					{equipment.name}
				</h3>
				<p class="text-sm text-muted-foreground line-clamp-3">
					{equipment.description}
				</p>
			</CardContent>
		</Card>
	</button>
{:else}
	<div class="group relative w-full text-left">
		<Card
			class={cn(
				'h-full overflow-hidden border-2 border-transparent'
			)}
		>
			<div class="aspect-video w-full overflow-hidden bg-muted">
				<img
					src={imageSrc}
					alt={equipment.name}
					loading="lazy"
					class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
				/>
			</div>
			<CardContent class="p-4">
				<div class="mb-2 flex items-center justify-between">
					<span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
						{equipment.category}
					</span>
					{#if equipment.available === false}
						<span
							class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-destructive/10 text-destructive"
							aria-label="Недоступно"
						>
							Недоступно
						</span>
					{/if}
				</div>
				<h3 class="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
					{equipment.name}
				</h3>
				<p class="text-sm text-muted-foreground line-clamp-3">
					{equipment.description}
				</p>
			</CardContent>
		</Card>
	</div>
{/if}
