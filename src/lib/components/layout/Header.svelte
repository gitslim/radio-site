<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	export interface HeaderProps {
		currentPath: string;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import { Menu, Phone } from '@lucide/svelte';
	import {
		Sheet,
		SheetContent,
		SheetHeader,
		SheetTitle,
		SheetTrigger,
		SheetClose
	} from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { companyInfo } from '$lib/data/company';

	let { currentPath }: HeaderProps = $props();
	let isMenuOpen = $state(false);

	const navLinks = [
		{ label: 'Главная', href: '/' },
		{ label: 'Оборудование', href: '/equipment' },
		{ label: 'Галерея', href: '/gallery' },
		{ label: 'Контакты', href: '/contact' }
	];

	function isLinkActive(href: string): boolean {
		if (href === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(href);
	}
</script>

<header
	class={cn(
		'sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
	)}
>
	<div class="container flex h-16 items-center justify-between px-4">
		<!-- Mobile Menu Button (left on mobile, hidden on desktop) -->
		<div class="md:hidden md:w-0">
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

				<SheetContent side="left" class="w-[300px]">
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
											'flex items-center py-3 px-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent',
											isLinkActive(link.href)
												? 'text-primary bg-accent'
												: 'text-muted-foreground'
										)}
										aria-current={isLinkActive(link.href) ? 'page' : undefined}
									>
										{link.label}
									</a>
								{/snippet}
							</SheetClose>
						{/each}
					</nav>
					<div class="mt-8 pt-4 border-t">
						<a
							href={`tel:${companyInfo.phone.replace(/ /g, '')}`}
							class="flex items-center space-x-2 py-3 px-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
						>
							<Phone class="h-4 w-4" aria-hidden="true" />
							<span>{companyInfo.phone}</span>
						</a>
					</div>
				</SheetContent>
			</Sheet>
		</div>

		<!-- Logo (centered) -->
		<a
			href="/"
			class="flex items-center justify-center space-x-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
		>
			<span>Радиотехника-к</span>
		</a>

		<!-- Desktop Navigation (right-aligned) -->
		<nav class="hidden md:flex items-center justify-end space-x-8" aria-label="Main navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class={cn(
						'text-sm font-medium transition-colors hover:text-primary py-2',
						isLinkActive(link.href)
							? 'text-primary'
							: 'text-muted-foreground'
					)}
					aria-current={isLinkActive(link.href) ? 'page' : undefined}
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<!-- Phone Number (right-aligned, visible on md and up) -->
		<a
			href={`tel:${companyInfo.phone.replace(/ /g, '')}`}
			class="hidden md:flex items-center space-x-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
		>
			<Phone class="h-4 w-4" aria-hidden="true" />
			<span>{companyInfo.phone}</span>
		</a>
	</div>
</header>
