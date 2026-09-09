import { createSitemapXslHandler } from '$lib/site/sitemap-xsl';
import { siteConfig } from '../../site.config';

export const GET = createSitemapXslHandler({ config: siteConfig });
export const prerender = true;
