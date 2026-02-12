<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import ScrollReveal from '$lib/components/animations/ScrollReveal.svelte';
	import { Check, Shield, Clock, CircleDollarSign } from '@lucide/svelte';

	interface ValueProp {
		icon: any;
		title: string;
		description: string;
		highlight: string;
	}

	const valueProps: ValueProp[] = [
		{
			icon: Check,
			title: 'Широкий выбор оборудования',
			description: 'Более 100 наименований осветительного оборудования для любых задач',
			highlight: '100+'
		},
		{
			icon: Shield,
			title: 'Профессиональное качество',
			description: 'Только проверенные бренды и оборудование в идеальном состоянии',
			highlight: 'Топ'
		},
		{
			icon: Clock,
			title: 'Гибкие условия аренды',
			description: 'Удобные сроки: от 1 дня до длительных периодов аренды',
			highlight: 'Гибко'
		},
		{
			icon: CircleDollarSign,
			title: 'Конкурентные цены',
			description: 'Выгодные условия сотрудничества для профессионалов и студий',
			highlight: 'Выгодно'
		}
	];
</script>

<ScrollReveal>
	<section class="container mx-auto px-4 py-16 md:py-24">
		<header class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">Почему выбирают нас</h2>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Ключевые преимущества работы с нашей компанией
			</p>
		</header>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each valueProps as prop, index}
				<ScrollReveal delay={index * 100}>
					<Card class="h-full">
						<CardHeader>
							<div class="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
								<svelte:component this={prop.icon} class="w-7 h-7" />
							</div>
							<CardTitle class="text-xl mb-2">{prop.title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p class="text-muted-foreground mb-4">{prop.description}</p>
							<span
								class="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-medium"
							>
								{prop.highlight}
							</span>
						</CardContent>
					</Card>
				</ScrollReveal>
			{/each}
		</div>
	</section>
</ScrollReveal>
