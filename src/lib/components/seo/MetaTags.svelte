<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export interface MetaTagsProps {
		title: string; // Russian title
		description: string; // Russian description
		image?: string; // Open Graph image
		url?: string; // Canonical URL
	}
</script>

<script lang="ts">
	import { generateMetaTags, generateOpenGraphTags } from '$lib/utils/seo.js';
	import type { MetaTag } from '$lib/utils/seo.js';

	let { title, description, image, url }: MetaTagsProps = $props();

	// Combine standard meta tags and Open Graph tags using derived state
	let allMetaTags = $derived.by(() => [
		...generateMetaTags(title, description, image, url),
		...generateOpenGraphTags(title, description, image, url)
	]);
</script>

<svelte:head>
	<!-- Title tag -->
	<title>{title}</title>

	<!-- Generated meta tags -->
	{#each allMetaTags as tag}
		{#if tag.charset}
			<meta charset={tag.charset} />
		{:else if tag.httpEquiv}
			<meta http-equiv={tag.httpEquiv as any} content={tag.content} />
		{:else if tag.name && tag.content}
			<meta name={tag.name} content={tag.content} />
		{:else if tag.property && tag.content}
			<meta property={tag.property} content={tag.content} />
		{/if}
	{/each}
</svelte:head>
