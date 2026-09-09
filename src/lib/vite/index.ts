import type { Plugin } from 'vite';

export interface SvenPluginOptions {
	/**
	 * Pre-bundle dependencies for fast hot module reloading.
	 */
	optimizeDeps?: boolean;
}

/**
 * Sven UI Vite Plugin for SvelteKit.
 * Configures optimal bundling and dependency optimization for Sven UI components.
 *
 * Usage in vite.config.ts:
 * ```ts
 * import { sven } from 'sven-ui/vite';
 * export default defineConfig({
 *   plugins: [tailwindcss(), sveltekit(), sven()]
 * });
 * ```
 */
export function sven(options: SvenPluginOptions = {}): Plugin[] {
	const { optimizeDeps = true } = options;

	return [
		{
			name: 'vite-plugin-sven-ui',
			config() {
				if (!optimizeDeps) return {};
				return {
					optimizeDeps: {
						include: ['tailwind-variants', 'bits-ui', 'svelte-sonner']
					}
				};
			}
		}
	];
}
