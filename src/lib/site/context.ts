import { getContext, setContext } from 'svelte';
import { type SiteConfig, DEFAULT_SITE_CONFIG } from './config';

const YAXA_CONFIG_KEY = Symbol('YAXA_SITE_CONFIG');

/**
 * Sets the reactive site configuration in Svelte 5 context.
 * Typically called at the root inside <YaxaApp config={siteConfig} />.
 */
export function setSiteConfig(config: () => SiteConfig): void {
	setContext(YAXA_CONFIG_KEY, config);
}

/**
 * Retrieves the site configuration from Svelte 5 context.
 * Falls back to DEFAULT_SITE_CONFIG if called outside <YaxaApp>.
 */
export function getSiteConfig(): SiteConfig {
	try {
		const getter = getContext<() => SiteConfig>(YAXA_CONFIG_KEY);
		return getter ? getter() : DEFAULT_SITE_CONFIG;
	} catch {
		return DEFAULT_SITE_CONFIG;
	}
}
