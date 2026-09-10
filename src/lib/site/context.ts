import { getContext, setContext } from 'svelte';
import { type SiteConfig, DEFAULT_SITE_CONFIG } from './config';

const SVEN_CONFIG_KEY = Symbol('SVEN_SITE_CONFIG');

/**
 * Sets the reactive site configuration in Svelte 5 context.
 * Typically called at the root inside <SvenApp config={siteConfig} />.
 */
export function setSiteConfig(config: () => SiteConfig): void {
	setContext(SVEN_CONFIG_KEY, config);
}

/**
 * Retrieves the site configuration from Svelte 5 context.
 * Falls back to DEFAULT_SITE_CONFIG if called outside <SvenApp>.
 */
export function getSiteConfig(): SiteConfig {
	try {
		const getter = getContext<() => SiteConfig>(SVEN_CONFIG_KEY);
		return getter ? getter() : DEFAULT_SITE_CONFIG;
	} catch {
		return DEFAULT_SITE_CONFIG;
	}
}
