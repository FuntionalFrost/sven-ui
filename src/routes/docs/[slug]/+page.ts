import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getDocItemBySlug } from '../_data/docs-nav';

export const load: PageLoad = ({ params }) => {
	const doc = getDocItemBySlug(params.slug);

	if (!doc) {
		throw error(404, `Documentation page "${params.slug}" not found`);
	}

	return {
		doc,
		slug: params.slug,
		title: `${doc.label} — Sven UI Documentation`,
		description: doc.description
	};
};
