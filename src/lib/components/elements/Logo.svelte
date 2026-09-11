<script lang="ts">
	interface Props {
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
		showText?: boolean;
		text?: string;
		class?: string;
	}

	let { size = 'md', showText = false, text = 'Yaxa', class: className = '' }: Props = $props();

	let sizeClasses = $derived.by(() => {
		if (typeof size === 'number') {
			return {
				box: `w-[${size}px] h-[${size}px]`,
				svg: `w-[${Math.round(size * 0.6)}px] h-[${Math.round(size * 0.6)}px]`,
				text: 'text-base font-bold'
			};
		}
		switch (size) {
			case 'xs':
				return { box: 'h-6 w-6 rounded-md', svg: 'h-3.5 w-3.5', text: 'text-xs font-bold' };
			case 'sm':
				return { box: 'h-7 w-7 rounded-lg', svg: 'h-4 w-4', text: 'text-sm font-bold' };
			case 'lg':
				return { box: 'h-10 w-10 rounded-xl', svg: 'h-6 w-6', text: 'text-xl font-extrabold' };
			case 'xl':
				return { box: 'h-12 w-12 rounded-2xl', svg: 'h-7 w-7', text: 'text-2xl font-extrabold' };
			case 'md':
			default:
				return { box: 'h-8 w-8 rounded-lg', svg: 'h-4.5 w-4.5', text: 'text-base font-bold' };
		}
	});
</script>

<div class="inline-flex items-center gap-2.5 {className}">
	<div
		class="flex shrink-0 items-center justify-center bg-gradient-to-tr from-[#ff3e00] to-[#ea580c] text-white shadow-xs shadow-[#ff3e00]/25 transition-transform hover:scale-105 {sizeClasses.box}"
	>
		<svg
			class={sizeClasses.svg}
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path d="M26 26 L74 74" stroke="currentColor" stroke-width="14" stroke-linecap="round" />
			<path
				d="M74 26 L58 42 M42 58 L26 74"
				stroke="currentColor"
				stroke-width="14"
				stroke-linecap="round"
			/>
		</svg>
	</div>
	{#if showText}
		<span class="tracking-tight text-neutral-900 dark:text-white {sizeClasses.text}">
			{text}
		</span>
	{/if}
</div>
