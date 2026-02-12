<script lang="ts" module>
	import type { Service } from '$lib/data/services';

	export interface SpecTableProps {
		specifications: Service['specifications'];
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';

	let { specifications }: SpecTableProps = $props();
</script>

{#if specifications && specifications.length > 0}
	<div class="w-full rounded-md border">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead class="w-[40%]">Характеристика</TableHead>
					<TableHead>Значение</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each specifications as spec, index}
					<TableRow>
						<TableCell class="font-medium">{spec.label}</TableCell>
						<TableCell class={cn('text-muted-foreground', index === specifications.length - 1 && 'border-b-0')}>
							{spec.value}
						</TableCell>
					</TableRow>
				{/each}
			</TableBody>
		</Table>
	</div>
{:else}
	<p class="text-muted-foreground italic">Характеристики не указаны</p>
{/if}
