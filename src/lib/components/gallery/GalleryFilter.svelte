<script lang="ts">
	import * as Tabs from "$lib/components/ui/tabs";
	import { cn } from "$lib/utils";
	import type { GalleryCategory } from "$lib/data/gallery";

	interface Props {
		currentCategory?: GalleryCategory;
		onCategoryChange: (category: GalleryCategory) => void;
	}

	let { currentCategory = undefined, onCategoryChange }: Props = $props();

	const categories: { value: GalleryCategory; label: string }[] = [
		{ value: "equipment-in-action", label: "Оборудование в действии" },
		{ value: "facilities", label: "Объекты и интерьеры" },
		{ value: "film-set", label: "Съемки на площадке" },
		{ value: "behind-scenes", label: "За кулисами" }
	];

	// Use first category as default if none selected
	let activeTab = $derived(currentCategory || categories[0].value);

	function handleTabChange(value: string) {
		onCategoryChange(value as GalleryCategory);
	}
</script>

<div class="w-full">
	<Tabs.Root value={activeTab} onValueChange={handleTabChange} class="w-full">
		<Tabs.List class="w-full justify-start">
			{#each categories as cat (cat.value)}
				<Tabs.Trigger value={cat.value} class="data-[state=active]:bg-background">
					{cat.label}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
	</Tabs.Root>
</div>
