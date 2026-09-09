import { createSitemapHandler } from '$lib/site/sitemap';
import { siteConfig } from '../../site.config';

export const GET = createSitemapHandler({
	config: siteConfig,
	staticRoutes: ['/', '/#overview', '/#components', '/#seo', '/#guide']
});
