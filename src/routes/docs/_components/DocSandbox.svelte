<script lang="ts">
	import type { Snippet } from 'svelte';
	import DocCodeBlock from './DocCodeBlock.svelte';

	interface Props {
		title?: string;
		description?: string;
		code?: string;
		filename?: string;
		controls?: Snippet;
		children: Snippet;
		class?: string;
	}

	let {
		title = 'Interactive Preview',
		description,
		code = '',
		filename = '',
		controls,
		children,
		class: className = ''
	}: Props = $props();

	let activeTab = $state<'preview' | 'code'>('preview');
</script>

<div
	class="my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900/60 {className}"
>
	<div
		class="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50/70 px-4 py-2.5 dark:border-zinc-800 dark:bg-zinc-900/90"
	>
		<div>
			<span class="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{title}</span>
			{#if description}
				<span class="ml-2 text-xs text-zinc-500 dark:text-zinc-400">{description}</span>
			{/if}
		</div>
		{#if code}
			<div class="flex items-center gap-1 rounded-lg bg-zinc-200/80 p-0.5 text-xs dark:bg-zinc-800">
				<button
					type="button"
					onclick={() => (activeTab = 'preview')}
					class="rounded-md px-2.5 py-1 text-xs font-medium transition-all {activeTab === 'preview'
						? 'bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-white'
						: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}"
				>
					Preview
				</button>
				<button
					type="button"
					onclick={() => (activeTab = 'code')}
					class="rounded-md px-2.5 py-1 text-xs font-medium transition-all {activeTab === 'code'
						? 'bg-white font-semibold text-zinc-900 shadow-xs dark:bg-zinc-700 dark:text-white'
						: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'}"
				>
					Code
				</button>
			</div>
		{/if}
	</div>

	{#if activeTab === 'preview'}
		<div class="flex min-h-[120px] items-center justify-center p-6 sm:p-8">
			{@render children()}
		</div>
		{#if controls}
			<div
				class="border-t border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-950/40"
			>
				{@render controls()}
			</div>
		{/if}
	{:else if code}
		<DocCodeBlock {code} {filename} class="my-0 rounded-none border-0" />
	{/if}
</div>
