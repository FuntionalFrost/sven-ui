<script module lang="ts">
	import type { IconSource } from '../elements/Icon.svelte';

	export interface AccordionItem {
		value: string;
		title: string;
		content?: string;
		icon?: IconSource;
		disabled?: boolean;
	}

	export interface AccordionProps {
		items: AccordionItem[];
		type?: 'single' | 'multiple';
		class?: string;
	}
</script>

<script lang="ts">
	import { Accordion } from 'bits-ui';
	import Icon from '../elements/Icon.svelte';

	let { items, type = 'single', class: className = '' }: AccordionProps = $props();
</script>

<Accordion.Root
	{type}
	class="w-full divide-y divide-neutral-200 dark:divide-neutral-800 {className}"
>
	{#each items as item}
		<Accordion.Item value={item.value} disabled={item.disabled} class="py-1">
			<Accordion.Header>
				<Accordion.Trigger
					class="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-neutral-900 transition-all hover:underline dark:text-white [&[data-state=open]>svg]:rotate-180"
				>
					<div class="flex items-center gap-2.5">
						{#if item.icon}
							<Icon name={item.icon} size="xs" class="text-neutral-500" />
						{/if}
						<span>{item.title}</span>
					</div>
					<Icon
						name="chevron-down"
						size="xs"
						class="text-neutral-500 transition-transform duration-200"
					/>
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content
				class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden pb-4 text-sm text-neutral-600 dark:text-neutral-400"
			>
				{item.content}
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
