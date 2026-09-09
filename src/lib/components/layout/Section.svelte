<script lang="ts">
	import type { Snippet } from 'svelte';
	import Container from './Container.svelte';

	interface Props {
		id?: string;
		title?: string;
		description?: string;
		badge?: string;
		align?: 'left' | 'center';
		class?: string;
		header?: Snippet;
		children?: Snippet;
	}

	let {
		id,
		title,
		description,
		badge,
		align = 'center',
		class: className = '',
		header,
		children
	}: Props = $props();
</script>

<section {id} class="py-16 sm:py-24 {className}">
	<Container>
		{#if header}
			{@render header()}
		{:else if title || description || badge}
			<div
				class="mb-12 {align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'}"
			>
				{#if badge}
					<span
						class="mb-4 inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-semibold text-primary-700 ring-1 ring-primary-500/20 dark:bg-primary-950/60 dark:text-primary-300 dark:ring-primary-500/30"
					>
						{badge}
					</span>
				{/if}
				{#if title}
					<h2
						class="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl dark:text-white"
					>
						{title}
					</h2>
				{/if}
				{#if description}
					<p class="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
						{description}
					</p>
				{/if}
			</div>
		{/if}

		{#if children}
			{@render children()}
		{/if}
	</Container>
</section>
