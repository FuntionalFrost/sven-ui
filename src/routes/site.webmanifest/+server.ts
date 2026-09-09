import { createManifestHandler } from '$lib/site/manifest';
import { siteConfig } from '../../site.config';

export const GET = createManifestHandler(siteConfig);
