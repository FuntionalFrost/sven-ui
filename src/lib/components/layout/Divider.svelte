<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type { IconSource } from '../elements/Icon.svelte';

	export interface DividerProps {
		label?: string;
		icon?: IconSource;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		children?: Snippet;
	}
</script>

<script lang="ts">
	import Icon from '../elements/Icon.svelte';

	let {
		label,
		icon,
		orientation = 'horizontal',
		class: className = '',
		children
	}: DividerProps = $props();
</script>

{#if orientation === 'vertical'}
	<div
		class="inline-block h-full min-h-[1.5em] w-px self-stretch bg-neutral-200 dark:bg-neutral-800 {className}"
		role="separator"
		aria-orientation="vertical"
	></div>
{:else if label || icon || children}
	<div class="relative my-4 flex items-center {className}" role="separator">
		<div class="grow border-t border-neutral-200 dark:border-neutral-800"></div>
		<span class="mx-3 shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400">
			{#if icon}
				<Icon name={icon} size="xs" class="mr-1 inline-block" />
			{/if}
			{#if label}
				{label}
			{:else if children}
				{@render children()}
			{/if}
		</span>
		<div class="grow border-t border-neutral-200 dark:border-neutral-800"></div>
	</div>
{:else}
	<hr class="my-4 border-t border-neutral-200 dark:border-neutral-800 {className}" />
{/if}
