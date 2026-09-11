import type { Plugin } from 'vite';

export interface YaxaPluginOptions {
	/**
	 * Pre-bundle dependencies for fast hot module reloading.
	 */
	optimizeDeps?: boolean;
}

/**
 * Yaxa Vite Plugin for SvelteKit.
 * Configures optimal bundling and dependency optimization for Yaxa components.
 *
 * Usage in vite.config.ts:
 * ```ts
 * import { yaxa } from 'yaxa/vite';
 * export default defineConfig({
 *   plugins: [tailwindcss(), sveltekit(), yaxa()]
 * });
 * ```
 */
export function yaxa(options: YaxaPluginOptions = {}): Plugin[] {
	const { optimizeDeps = true } = options;

	return [
		{
			name: 'vite-plugin-yaxa',
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
