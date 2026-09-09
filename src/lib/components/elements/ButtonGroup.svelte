<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		children?: Snippet;
	}

	let { orientation = 'horizontal', class: className = '', children }: Props = $props();
</script>

<div
	class="inline-flex {orientation === 'vertical'
		? 'flex-col [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none'
		: 'flex-row [&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none'} {className}"
	role="group"
>
	{#if children}
		{@render children()}
	{/if}
</div>
