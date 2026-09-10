<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { SiteConfig } from '$lib/site/config';
	import Container from './Container.svelte';
	import Icon from '../elements/Icon.svelte';
	import Logo from '../elements/Logo.svelte';
	import { getSiteConfig } from '$lib/site/context';

	interface Props {
		config?: SiteConfig;
		newsletter?: Snippet;
		class?: string;
	}

	let { config, newsletter, class: className = '' }: Props = $props();

	let currentConfig = $derived(config || getSiteConfig());
	let currentYear = new Date().getFullYear();
</script>

<footer
	class="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 {className}"
>
	<Container size="lg" class="py-12 md:py-16">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Brand Info -->
			<div class="space-y-4 md:col-span-2">
				<a href="/" class="inline-flex items-center gap-2.5 font-bold tracking-tight">
					<Logo size="sm" showText text={currentConfig.name} />
				</a>
				<p class="max-w-sm text-base text-neutral-600 dark:text-neutral-400">
					{currentConfig.description}
				</p>
			</div>

			<!-- Quick Links -->
			<div>
				<h3 class="text-base font-semibold text-neutral-900 dark:text-white">Navigation</h3>
				<ul class="mt-4 space-y-2.5 text-sm text-neutral-600 dark:text-neutral-400">
					{#each currentConfig.nav || [] as item}
						<li>
							<a
								href={item.href}
								class="transition-colors hover:text-primary-600 dark:hover:text-primary-400"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Socials & Newsletter -->
			<div>
				<h3 class="text-base font-semibold text-neutral-900 dark:text-white">Community</h3>
				<div class="mt-4 flex items-center gap-3">
					{#if currentConfig.socials?.github}
						<a
							href={currentConfig.socials.github}
							target="_blank"
							rel="noopener noreferrer"
							class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
							aria-label="GitHub"
						>
							<Icon name="github" size="sm" />
						</a>
					{/if}
					{#if currentConfig.socials?.twitter}
						<a
							href={currentConfig.socials.twitter}
							target="_blank"
							rel="noopener noreferrer"
							class="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
							aria-label="Twitter"
						>
							<Icon name="twitter" size="sm" />
						</a>
					{/if}
				</div>

				{#if newsletter}
					<div class="mt-4">
						{@render newsletter()}
					</div>
				{/if}
			</div>
		</div>

		<div
			class="mt-12 flex flex-col items-center justify-between border-t border-neutral-200 pt-8 text-sm text-neutral-500 sm:flex-row dark:border-neutral-800 dark:text-neutral-400"
		>
			<p>© {currentYear} {currentConfig.name}. Built for SvelteKit 2.7 & Svelte 5.</p>
			<p class="mt-2 sm:mt-0">Designed for solo developers · 100% DRY.</p>
		</div>
	</Container>
</footer>
