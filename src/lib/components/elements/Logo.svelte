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
				svg: `w-[${size}px] h-[${size}px]`,
				text: 'text-base font-bold'
			};
		}
		switch (size) {
			case 'xs':
				return { svg: 'h-5 w-5', text: 'text-xs font-bold' };
			case 'sm':
				return { svg: 'h-6 w-6', text: 'text-sm font-bold' };
			case 'lg':
				return { svg: 'h-9 w-9', text: 'text-xl font-extrabold' };
			case 'xl':
				return { svg: 'h-11 w-11', text: 'text-2xl font-extrabold' };
			case 'md':
			default:
				return { svg: 'h-7 w-7', text: 'text-base font-bold' };
		}
	});
</script>

<div class="inline-flex items-center gap-2.5 {className}">
	<svg
		class="shrink-0 transition-transform hover:scale-105 {sizeClasses.svg}"
		viewBox="0 0 100 100"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<defs>
			<linearGradient id="yaxa-flame-grad" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stop-color="#ff3e00" />
				<stop offset="100%" stop-color="#ea580c" />
			</linearGradient>
		</defs>

		<!-- 1. Outer Flame Layer (Thick Orange Contour Ribbon) -->
		<path
			d="M24 24 L76 76"
			stroke="url(#yaxa-flame-grad)"
			stroke-width="22"
			stroke-linecap="round"
		/>
		<path
			d="M76 24 L56 44 M44 56 L24 76"
			stroke="url(#yaxa-flame-grad)"
			stroke-width="22"
			stroke-linecap="round"
		/>

		<!-- 2. Inner Core Layer (White Stadium Ribbon - Svelte Style) -->
		<path d="M24 24 L76 76" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
		<path
			d="M76 24 L58 42 M42 58 L24 76"
			stroke="#ffffff"
			stroke-width="8"
			stroke-linecap="round"
		/>
	</svg>
	{#if showText}
		<span class="tracking-tight text-neutral-900 dark:text-white {sizeClasses.text}">
			{text}
		</span>
	{/if}
</div>
