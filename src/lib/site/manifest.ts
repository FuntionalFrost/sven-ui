import type { RequestHandler } from '@sveltejs/kit';
import { type SiteConfig, DEFAULT_SITE_CONFIG } from './config';

export interface ManifestOptions {
	config?: SiteConfig;
}

export function createManifestHandler(
	optionsOrConfig?: SiteConfig | ManifestOptions
): RequestHandler {
	const config: SiteConfig = !optionsOrConfig
		? DEFAULT_SITE_CONFIG
		: 'name' in optionsOrConfig
			? optionsOrConfig
			: optionsOrConfig.config || DEFAULT_SITE_CONFIG;

	return async () => {
		const manifest = {
			name: config.title || config.name,
			short_name: config.name,
			description: config.description,
			start_url: '/',
			display: 'standalone',
			background_color: config.theme?.neutralColor || '#121212',
			theme_color: config.theme?.primaryColor || '#ff3e00',
			icons: [
				{
					src: '/favicon.svg',
					sizes: 'any',
					type: 'image/svg+xml'
				}
			]
		};

		return new Response(JSON.stringify(manifest, null, 2), {
			headers: {
				'Content-Type': 'application/manifest+json; charset=utf-8',
				'Cache-Control': 'public, max-age=86400'
			}
		});
	};
}
