<script lang="ts" module>
	import type { Service } from '$lib/data/services';

	export interface ServiceCardProps {
		service: Service;
		onClick: () => void;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { loadServiceImage } from '$lib/utils/image.js';
	import {
		Card,
		CardContent
	} from '$lib/components/ui/card';

	let { service, onClick }: ServiceCardProps = $props();

	function handleClick(): void {
		onClick();
	}

	function handleKeyPress(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	}
</script>

<button
	type="button"
	class={cn(
		'group relative w-full text-left transition-all duration-200',
		'hover:scale-[1.02] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
	)}
	onclick={handleClick}
	onkeypress={handleKeyPress}
	aria-label={`${service.name}: ${service.shortDescription}`}
>
	<Card class="h-full overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/20">
		<div class="aspect-video w-full overflow-hidden bg-muted">
			<img
				src={loadServiceImage(service.image)}
				alt={service.name}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>
		</div>
		<CardContent class="p-4">
			<h3 class="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
				{service.name}
			</h3>
			<p class="text-sm text-muted-foreground line-clamp-3">
				{service.shortDescription}
			</p>
		</CardContent>
	</Card>
</button>
