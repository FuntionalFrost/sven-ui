<script lang="ts">
	import Badge from '$lib/components/elements/Badge.svelte';
	import Link from '$lib/components/elements/Link.svelte';
	import Icon from '$lib/components/elements/Icon.svelte';

	interface Props {
		title: string;
		description: string;
		badge?: string;
		source?: string;
		category?: string;
	}

	let {
		title,
		description,
		badge = 'Svelte 5 Runes',
		source = '',
		category = ''
	}: Props = $props();
</script>

<div class="mb-8 border-b border-zinc-200 pb-6 dark:border-zinc-800">
	<div class="mb-3 flex items-center justify-between gap-4">
		<div class="flex items-center gap-2">
			{#if category}
				<span
					class="text-xs font-semibold tracking-wider text-primary-600 uppercase dark:text-primary-400"
				>
					{category}
				</span>
				<span class="text-zinc-300 dark:text-zinc-700">/</span>
			{/if}
			{#if badge}
				<Badge color="primary" variant="subtle" size="sm">{badge}</Badge>
			{/if}
		</div>
		{#if source}
			<Link
				href="https://github.com/FuntionalFrost/yaxa/blob/main/{source}"
				external
				class="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-primary-600 dark:text-zinc-400 dark:hover:text-primary-400"
			>
				<Icon name="github" class="h-3.5 w-3.5" />
				<span>View Source</span>
			</Link>
		{/if}
	</div>
	<h1 class="mb-3 text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
		{title}
	</h1>
	<p class="max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
		{description}
	</p>
</div>
