<script module lang="ts">
	export interface BreadcrumbItem {
		label: string;
		href?: string;
		icon?: string;
	}
</script>

<script lang="ts">
	import Icon from '../elements/Icon.svelte';

	interface Props {
		items: BreadcrumbItem[];
		separator?: string;
		class?: string;
	}

	let { items, separator = 'chevron-right', class: className = '' }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="flex {className}">
	<ol
		class="inline-flex items-center space-x-1.5 text-sm text-neutral-500 md:space-x-2 dark:text-neutral-400"
	>
		{#each items as item, index}
			{@const isLast = index === items.length - 1}
			<li class="inline-flex items-center">
				{#if index > 0}
					<Icon name={separator} size="xs" class="mx-1 text-neutral-400" />
				{/if}

				{#if item.href && !isLast}
					<a
						href={item.href}
						class="inline-flex items-center gap-1.5 transition-colors hover:text-neutral-900 dark:hover:text-white"
					>
						{#if item.icon}
							<Icon name={item.icon} size="xs" />
						{/if}
						<span>{item.label}</span>
					</a>
				{:else}
					<span
						class="inline-flex items-center gap-1.5 font-medium {isLast
							? 'text-neutral-900 dark:text-white'
							: ''}"
						aria-current={isLast ? 'page' : undefined}
					>
						{#if item.icon}
							<Icon name={item.icon} size="xs" />
						{/if}
						<span>{item.label}</span>
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
