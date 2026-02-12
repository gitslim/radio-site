<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	// Get the error from SvelteKit
	const { status } = $props();
</script>

<svelte:head>
	<title>Страница не найдена - ТехКино</title>
	<meta name="description" content="Запрошенная страница не существует" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
		<!-- Error Icon/Number -->
		<div class="text-9xl font-bold text-muted-foreground/30">
			{status || 404}
		</div>

		<!-- Error Message -->
		<div class="space-y-4 max-w-lg">
			<h1 class="text-4xl font-bold text-foreground">
				Страница не найдена
			</h1>

			<p class="text-lg text-muted-foreground">
				Извините, запрошенная страница не существует или была перемещена.
				Пожалуйста, проверьте адрес или перейдите на главную страницу.
			</p>
		</div>

		<!-- Action Button -->
		<Button href="/" variant="default" size="lg">
			Вернуться на главную
		</Button>
	</div>
</div>
