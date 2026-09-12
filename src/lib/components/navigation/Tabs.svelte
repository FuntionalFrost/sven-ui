<script module lang="ts">
	import type { IconSource } from '../elements/Icon.svelte';

	export interface TabItem {
		value: string;
		label: string;
		icon?: IconSource;
		disabled?: boolean;
		badge?: string;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '../elements/Icon.svelte';

	interface Props {
		items: TabItem[];
		value?: string;
		variant?: 'pill' | 'underline' | 'segmented';
		class?: string;
		children?: Snippet;
	}

	let {
		items,
		value = $bindable(items[0]?.value || ''),
		variant = 'segmented',
		class: className = '',
		children
	}: Props = $props();
</script>

<div class="w-full">
	<div
		class="flex {variant === 'segmented'
			? 'rounded-xl border border-neutral-200/60 bg-neutral-100 p-1 dark:border-neutral-800/60 dark:bg-neutral-900'
			: variant === 'underline'
				? 'gap-6 border-b border-neutral-200 dark:border-neutral-800'
				: 'gap-2'} {className}"
		role="tablist"
	>
		{#each items as tab}
			{@const isSelected = value === tab.value}
			<button
				type="button"
				role="tab"
				aria-selected={isSelected}
				disabled={tab.disabled}
				onclick={() => (value = tab.value)}
				class="inline-flex items-center justify-center gap-2 text-sm font-medium transition-all duration-150 select-none {tab.disabled
					? 'cursor-not-allowed opacity-50'
					: 'cursor-pointer'} {variant === 'segmented'
					? `rounded-lg px-3 py-1.5 ${
							isSelected
								? 'bg-white text-neutral-900 shadow-xs dark:bg-neutral-800 dark:text-white'
								: 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
						}`
					: variant === 'underline'
						? `-mb-px border-b-2 pt-1 pb-3 ${
								isSelected
									? 'border-primary-600 font-semibold text-primary-600 dark:text-primary-400'
									: 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
							}`
						: `rounded-lg px-3 py-1.5 ${
								isSelected
									? 'bg-primary-600 text-white shadow-xs'
									: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
							}`}"
			>
				{#if tab.icon}
					<Icon name={tab.icon} size="xs" />
				{/if}
				<span>{tab.label}</span>
				{#if tab.badge}
					<span
						class="rounded px-1.5 py-0.5 text-[10px] font-semibold {isSelected
							? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
							: 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'}"
					>
						{tab.badge}
					</span>
				{/if}
			</button>
		{/each}
	</div>

	{#if children}
		<div class="mt-4">
			{@render children()}
		</div>
	{/if}
</div>
