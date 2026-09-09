<script module lang="ts">
	import { tv, type VariantProps } from '$lib/utils/cn';

	export interface SelectOption {
		value: string;
		label: string;
		icon?: string;
		disabled?: boolean;
	}

	export const selectVariants = tv({
		base: 'w-full rounded-lg border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 appearance-none',
		variants: {
			size: {
				sm: 'text-sm py-1.5 pl-3 pr-8',
				md: 'text-base py-2 pl-3.5 pr-10',
				lg: 'text-base py-2.5 pl-4 pr-10'
			},
			status: {
				default:
					'border-neutral-300 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500/20',
				error:
					'border-rose-500 text-rose-900 dark:text-rose-100 focus:border-rose-500 focus:ring-rose-500/20'
			}
		},
		defaultVariants: {
			size: 'md',
			status: 'default'
		}
	});

	export type SelectProps = VariantProps<typeof selectVariants> & {
		value?: string;
		options?: SelectOption[];
		placeholder?: string;
		icon?: string;
		disabled?: boolean;
		name?: string;
		class?: string;
	};
</script>

<script lang="ts">
	import Icon from '../elements/Icon.svelte';

	let {
		value = $bindable(''),
		options = [],
		placeholder = 'Select an option...',
		icon,
		disabled = false,
		name,
		size = 'md',
		status = 'default',
		class: className = ''
	}: SelectProps = $props();
</script>

<div class="relative w-full">
	{#if icon}
		<div class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-neutral-400">
			<Icon name={icon} size={size === 'sm' ? 'xs' : 'sm'} />
		</div>
	{/if}

	<select
		bind:value
		{disabled}
		{name}
		class="{selectVariants({ size, status, class: className })} {icon
			? size === 'sm'
				? 'pl-8'
				: 'pl-10'
			: ''}"
	>
		{#if placeholder}
			<option value="" disabled selected={!value}>
				{placeholder}
			</option>
		{/if}
		{#each options as opt}
			<option value={opt.value} disabled={opt.disabled}>
				{opt.label}
			</option>
		{/each}
	</select>

	<div class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400">
		<Icon name="chevron-down" size="xs" />
	</div>
</div>
