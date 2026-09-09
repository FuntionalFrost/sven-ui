import type { RequestHandler } from '@sveltejs/kit';
import type { SiteConfig } from './config';

export interface SitemapRoute {
	loc: string;
	lastmod?: string;
	changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
	priority?: number;
}

export interface SitemapOptions {
	config: SiteConfig;
	/**
	 * Additional static or dynamic routes to include (e.g. /blog/[slug], /products/[id])
	 */
	dynamicRoutes?: () => Promise<SitemapRoute[]> | SitemapRoute[];
	/**
	 * Default routes to include if not providing dynamic list
	 */
	staticRoutes?: string[];
}

export function createSitemapHandler(optionsOrConfig: SiteConfig | SitemapOptions): RequestHandler {
	const options: SitemapOptions =
		'config' in optionsOrConfig ? optionsOrConfig : { config: optionsOrConfig };
	const { config } = options;

	return async ({ url }) => {
		const baseUrl = config.url || url.origin;

		let routes: SitemapRoute[];

		if (options.staticRoutes && options.staticRoutes.length > 0) {
			routes = options.staticRoutes.map((path) => ({
				loc: path,
				changefreq: config.sitemap?.changefreq || 'weekly',
				priority: config.sitemap?.priority || 0.8,
				lastmod: new Date().toISOString().split('T')[0]
			}));
		} else {
			// Default root route
			routes = [
				{
					loc: '/',
					changefreq: config.sitemap?.changefreq || 'weekly',
					priority: 1.0,
					lastmod: new Date().toISOString().split('T')[0]
				}
			];
		}

		if (options.dynamicRoutes) {
			const extra = await options.dynamicRoutes();
			routes = [...routes, ...extra];
		}

		// Filter excluded routes
		if (config.sitemap?.exclude) {
			const excludePatterns = config.sitemap.exclude;
			routes = routes.filter((r) => {
				return !excludePatterns.some((pattern) => {
					if (pattern.endsWith('*')) {
						return r.loc.startsWith(pattern.slice(0, -1));
					}
					return r.loc === pattern;
				});
			});
		}

		const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
	.map(
		(r) => `  <url>
    <loc>${baseUrl}${r.loc.startsWith('/') ? r.loc : `/${r.loc}`}</loc>
    ${r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : ''}
    ${r.changefreq ? `<changefreq>${r.changefreq}</changefreq>` : ''}
    ${r.priority !== undefined ? `<priority>${r.priority.toFixed(1)}</priority>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

		return new Response(xml.trim(), {
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'public, max-age=3600'
			}
		});
	};
}
