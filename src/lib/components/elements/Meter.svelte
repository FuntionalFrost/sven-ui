<script lang="ts">
	interface Props {
		value: number;
		min?: number;
		max?: number;
		label?: string;
		valueLabel?: string;
		color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
		size?: 'xs' | 'sm' | 'md' | 'lg';
		showValue?: boolean;
		class?: string;
	}

	let {
		value,
		min = 0,
		max = 100,
		label,
		valueLabel,
		color = 'primary',
		size = 'md',
		showValue = true,
		class: className = ''
	}: Props = $props();

	let percentage = $derived(
		Math.min(100, Math.max(0, Math.round(((value - min) / (max - min)) * 100)))
	);

	let formattedValue = $derived(valueLabel || `${percentage}%`);

	let heightClass = $derived.by(() => {
		switch (size) {
			case 'xs':
				return 'h-1';
			case 'sm':
				return 'h-1.5';
			case 'lg':
				return 'h-3.5';
			case 'md':
			default:
				return 'h-2.5';
		}
	});

	let colorClass = $derived.by(() => {
		switch (color) {
			case 'success':
				return 'bg-emerald-500';
			case 'warning':
				return 'bg-amber-500';
			case 'error':
				return 'bg-red-500';
			case 'neutral':
				return 'bg-neutral-600';
			case 'primary':
			default:
				return 'bg-primary-600';
		}
	});
</script>

<div class="w-full space-y-1.5 {className}">
	{#if label || showValue}
		<div class="flex items-center justify-between text-sm">
			{#if label}
				<span class="font-medium text-neutral-700 dark:text-neutral-300">{label}</span>
			{/if}
			{#if showValue}
				<span class="font-mono text-neutral-500 dark:text-neutral-400">{formattedValue}</span>
			{/if}
		</div>
	{/if}

	<div
		class="relative w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800 {heightClass}"
		role="meter"
		aria-valuenow={value}
		aria-valuemin={min}
		aria-valuemax={max}
	>
		<div
			class="h-full rounded-full transition-all duration-500 ease-out {colorClass}"
			style="width: {percentage}%;"
		></div>
	</div>
</div>
