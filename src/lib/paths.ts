/** Cloudflare R2 media CDN (bucket `media`, prefix `skyframestudio/`). */
export const MEDIA_BASE = 'https://media.munixnet.org/skyframestudio';

/** Absolute URL for a file under the skyframestudio media prefix. */
export function mediaUrl(path: string): string {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return `${MEDIA_BASE}${normalized}`;
}

/** Root-relative path that respects Astro `base` (e.g. `/` or `/video-website/`). */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL;
	const normalized = path.replace(/^\//, '');
	return `${base}${normalized}`;
}
