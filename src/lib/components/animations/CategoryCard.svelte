<script lang="ts" module>
	import type { Service } from '$lib/data/services';

	export interface CategoryCardProps {
		/** Category/service data */
		category: Service;
		/** Navigation link */
		href: string;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { loadServiceImage } from '$lib/utils/image.js';
	import {
		Card,
		CardContent
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	let { category, href }: CategoryCardProps = $props();

	function handleClick(): void {
		window.location.href = href;
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
		'group relative w-full text-left transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none',
		'hover:scale-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
	)}
	onclick={handleClick}
	onkeypress={handleKeyPress}
	aria-label={`${category.name}: ${category.shortDescription}`}
>
	<Card class="h-full overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/30 shadow-md hover:shadow-2xl transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none motion-reduce:hover:scale-100">
		<!-- Image container with zoom effect -->
		<div class="relative aspect-video w-full overflow-hidden bg-muted">
			<img
				src={loadServiceImage(category.image)}
				alt={category.name}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:group-hover:scale-100"
			/>
			<!-- Gradient overlay that darkens on hover -->
			<div
				class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-500 ease-out group-hover:from-black/80 motion-reduce:transition-none motion-reduce:group-hover:from-black/60"
				aria-hidden="true"
			></div>
		</div>

		<CardContent class="p-5 relative">
			<h3 class="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 motion-reduce:transition-none">
				{category.name}
			</h3>
			<p class="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5em]">
				{category.shortDescription}
			</p>

			<!-- "Подробнее" button -->
			<Button
				variant="outline"
				size="sm"
				class="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 motion-reduce:transition-none"
			>
				Подробнее
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="ml-2 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
					aria-hidden="true"
				>
					<path d="M5 12h14" />
					<path d="m12 5 7 7-7 7" />
				</svg>
			</Button>
		</CardContent>
	</Card>
</button>
