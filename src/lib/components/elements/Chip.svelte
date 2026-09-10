<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		text?: string | number;
		color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral';
		position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
		size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg';
		pulse?: boolean;
		show?: boolean;
		inset?: boolean;
		class?: string;
		children?: Snippet;
	}

	let {
		text,
		color = 'primary',
		position = 'top-right',
		size = 'sm',
		pulse = false,
		show = true,
		inset = false,
		class: className = '',
		children
	}: Props = $props();

	let positionClasses = $derived.by(() => {
		switch (position) {
			case 'top-left':
				return inset
					? 'top-1 left-1 -translate-x-0 -translate-y-0'
					: 'top-0 left-0 -translate-x-1/3 -translate-y-1/3';
			case 'bottom-left':
				return inset
					? 'bottom-1 left-1 -translate-x-0 translate-y-0'
					: 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3';
			case 'bottom-right':
				return inset
					? 'bottom-1 right-1 translate-x-0 translate-y-0'
					: 'bottom-0 right-0 translate-x-1/3 translate-y-1/3';
			case 'top-right':
			default:
				return inset
					? 'top-1 right-1 translate-x-0 -translate-y-0'
					: 'top-0 right-0 translate-x-1/3 -translate-y-1/3';
		}
	});

	let colorClasses = $derived.by(() => {
		switch (color) {
			case 'success':
				return 'bg-emerald-500 text-white ring-white dark:ring-neutral-950';
			case 'warning':
				return 'bg-amber-500 text-white ring-white dark:ring-neutral-950';
			case 'error':
				return 'bg-red-500 text-white ring-white dark:ring-neutral-950';
			case 'neutral':
				return 'bg-neutral-500 text-white ring-white dark:ring-neutral-950';
			case 'primary':
			default:
				return 'bg-primary-600 text-white ring-white dark:ring-neutral-950';
		}
	});

	let sizeClasses = $derived.by(() => {
		if (text !== undefined && text !== '') {
			switch (size) {
				case '2xs':
					return 'h-3.5 min-w-[14px] px-1 text-[9px] font-bold';
				case 'xs':
					return 'h-4 min-w-[16px] px-1 text-[10px] font-bold';
				case 'lg':
					return 'h-6 min-w-[24px] px-1.5 text-xs font-bold';
				case 'md':
					return 'h-5 min-w-[20px] px-1.5 text-[11px] font-bold';
				case 'sm':
				default:
					return 'h-4.5 min-w-[18px] px-1 text-[10px] font-bold';
			}
		}
		switch (size) {
			case '2xs':
				return 'h-1.5 w-1.5';
			case 'xs':
				return 'h-2 w-2';
			case 'md':
				return 'h-3 w-3';
			case 'lg':
				return 'h-3.5 w-3.5';
			case 'sm':
			default:
				return 'h-2.5 w-2.5';
		}
	});
</script>

<div class="relative inline-flex shrink-0 {className}">
	{#if children}
		{@render children()}
	{/if}

	{#if show}
		<span
			class="absolute z-10 flex items-center justify-center rounded-full font-mono leading-none ring-2 {positionClasses} {colorClasses} {sizeClasses}"
		>
			{#if pulse}
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 {colorClasses}"
				></span>
			{/if}
			{#if text !== undefined}
				<span>{text}</span>
			{/if}
		</span>
	{/if}
</div>
