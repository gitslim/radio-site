<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { Search, Phone, Package, ArrowRight } from '@lucide/svelte';

	interface Step {
		number: number;
		icon: any;
		title: string;
		description: string;
	}

	const steps: Step[] = [
		{
			number: 1,
			icon: Search,
			title: 'Выберите оборудование',
			description: 'Просмотрите каталог и найдите нужное оборудование для вашего проекта'
		},
		{
			number: 2,
			icon: Phone,
			title: 'Свяжитесь с нами',
			description: 'Позвоните или напишите, чтобы проверить наличие и согласовать условия'
		},
		{
			number: 3,
			icon: Package,
			title: 'Получите оборудование',
			description: 'Заберите оборудование самовывозом или закажите доставку на съемочную площадку'
		},
		{
			number: 4,
			icon: ArrowRight,
			title: 'Снимайте и верните',
			description: 'Используйте оборудование для съемки и верните его по завершении работы'
		}
	];
</script>

<ScrollReveal>
	<section class="container mx-auto px-4 py-16 md:py-24">
		<header class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Как это работает</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Простой процесс аренды оборудования в 4 шага
			</p>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each steps as step, index}
				<ScrollReveal delay={index * 100}>
					<Card class="h-full">
						<CardHeader>
							<div class="flex items-center justify-between mb-4">
								<div
									class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary"
								>
									<svelte:component this={step.icon} class="w-6 h-6" />
								</div>
								<span
									class="text-4xl font-bold text-muted-foreground/20 font-display"
									aria-hidden="true"
								>
									{step.number}
								</span>
							</div>
							<CardTitle class="text-xl">{step.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="text-muted-foreground">{step.description}</p>
						</CardContent>
					</Card>
				</ScrollReveal>
			{/each}
		</div>
	</section>
</ScrollReveal>
