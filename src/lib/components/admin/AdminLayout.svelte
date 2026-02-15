<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { cn } from '$lib/utils.js';
	import { dev } from '$app/environment';
	import type { HTMLAttributes } from 'svelte/elements';
	import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
	import FolderKanbanIcon from '@lucide/svelte/icons/folder-kanban';
	import MenuIcon from '@lucide/svelte/icons/menu';
	import XIcon from '@lucide/svelte/icons/x';
	import { Toaster } from 'svelte-sonner';

	let {
		class: className,
		children: layoutChildren,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: any } = $props();

	let isMobileMenuOpen = $state(false);

	const navigationItems = [
		{
			title: 'Equipment',
			href: '/admin',
			icon: LayoutDashboardIcon
		},
		{
			title: 'Categories',
			href: '/admin/categories',
			icon: FolderKanbanIcon
		}
	];

	function toggleMobileMenu() {
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	function closeMobileMenu() {
		isMobileMenuOpen = false;
	}
</script>

<div class="flex min-h-screen">
	<!-- Sidebar Navigation -->
	<aside
		class={cn(
			'fixed left-0 top-0 z-50 h-screen w-64 border-r bg-background transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
			isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
			className
		)}
	>
		<!-- Sidebar Header -->
		<div class="flex h-16 items-center justify-between border-b px-6">
			<h1 class="text-lg font-semibold">Admin Panel</h1>
			<button
				onclick={closeMobileMenu}
				class="md:hidden"
				aria-label="Close menu"
			>
				<XIcon class="size-5" />
			</button>
		</div>

		<!-- Navigation Menu -->
		<nav class="p-4">
			{#each navigationItems as item (item.title)}
				<a
					href={item.href}
					onclick={closeMobileMenu}
					class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
				>
					<svelte:component this={item.icon} class="size-5" />
					<span>{item.title}</span>
				</a>
			{/each}

			{#if dev}
				<div class="mt-6 rounded-lg bg-yellow-500/10 px-4 py-2">
					<span class="text-xs font-medium text-yellow-600 dark:text-yellow-400">
						Development Mode
					</span>
				</div>
			{/if}
		</nav>
	</aside>

	<!-- Mobile Overlay -->
	{#if isMobileMenuOpen}
		<div
			onclick={closeMobileMenu}
			class="fixed inset-0 z-40 bg-black/50 md:hidden"
			aria-hidden="true"
		></div>
	{/if}

	<!-- Main Content -->
	<div class="flex flex-1 flex-col md:ml-0">
		<!-- Mobile Header -->
		<header class="flex h-16 items-center justify-between border-b bg-background px-4 md:hidden">
			<button
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
			>
				<MenuIcon class="size-5" />
			</button>
			<h1 class="text-lg font-semibold">Admin Panel</h1>
			<div class="w-5"></div>
		</header>

		<!-- Content Area -->
		<main class="flex-1 overflow-auto">
			{@render layoutChildren?.()}
		</main>
	</div>

	<Toaster position="top-right" />
</div>
