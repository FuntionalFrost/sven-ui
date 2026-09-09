import { createRobotsHandler } from '$lib/site/robots';
import { siteConfig } from '../../site.config';

export const GET = createRobotsHandler(siteConfig);
