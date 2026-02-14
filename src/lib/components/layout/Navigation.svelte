<script lang="ts" module>
	import { cn } from '$lib/utils.js';

	export interface NavigationProps {
		currentPath: string;
	}
</script>

<script lang="ts">
	import { Menu } from '@lucide/svelte';
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger,
		SheetClose
	} from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';

	let { currentPath }: NavigationProps = $props();
	let isMenuOpen = $state(false);

	const navLinks = [
		{ label: 'Главная', href: '/' },
		{ label: 'Оборудование', href: '/equipment' },
		{ label: 'О компании', href: '/about' },
		{ label: 'Контакты', href: '/contact' }
	];

	function isLinkActive(href: string): boolean {
		if (href === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(href);
	}
</script>

<!-- Desktop Navigation -->
<nav class="hidden md:flex items-center space-x-6" aria-label="Main navigation">
	{#each navLinks as link}
		<a
			href={link.href}
			class={cn(
				'text-sm font-medium transition-colors hover:text-primary',
				isLinkActive(link.href) ? 'text-primary' : 'text-muted-foreground'
			)}
			aria-current={isLinkActive(link.href) ? 'page' : undefined}
		>
			{link.label}
		</a>
	{/each}
</nav>

<!-- Mobile Navigation -->
<div class="md:hidden">
	<Sheet bind:open={isMenuOpen}>
		<SheetTrigger>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="ghost"
					size="icon"
					aria-label="Открыть меню"
				>
					<Menu class="h-5 w-5" />
				</Button>
			{/snippet}
		</SheetTrigger>

		<SheetContent side="right" class="w-[300px]">
			<SheetHeader>
				<SheetTitle>Меню</SheetTitle>
			</SheetHeader>
			<nav class="flex flex-col space-y-4 mt-4" aria-label="Mobile navigation">
				{#each navLinks as link}
					<SheetClose>
						{#snippet child({ props })}
							<a
								{...props}
								href={link.href}
								class={cn(
									'flex items-center py-2 text-sm font-medium transition-colors hover:text-primary',
									isLinkActive(link.href) ? 'text-primary' : 'text-muted-foreground'
								)}
								aria-current={isLinkActive(link.href) ? 'page' : undefined}
							>
								{link.label}
							</a>
						{/snippet}
					</SheetClose>
				{/each}
			</nav>
		</SheetContent>
	</Sheet>
</div>
