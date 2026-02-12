<script lang="ts" module>
	import { cn } from '$lib/utils.js';

	export interface FooterProps {}
</script>

<script lang="ts">
	let {} = $props();
</script>

<footer
	class={cn(
		'w-full border-t border-border bg-slate-950/95 py-8 md:py-12'
	)}
>
	<div class="container px-4 mx-auto">
		<div class="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 max-w-2xl mx-auto">
			<!-- Company Name -->
			<h2 class="text-xl font-bold text-slate-100">
				ООО "Радиотехника-к"
			</h2>

			<!-- Legal Information -->
			<div class="flex flex-col space-y-2 text-sm text-slate-400">
				<div class="space-y-1">
					<p>ОГРН: 1037700198821</p>
					<p>
						Юридический адрес: 115533, город Москва, Нагатинская наб.,
						д. 10 к. 3, кв. 56
					</p>
				</div>
			</div>
		</div>
	</div>
</footer>
