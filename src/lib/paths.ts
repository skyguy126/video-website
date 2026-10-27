/** Root-relative path that respects Astro `base` (e.g. `/` or `/video-website/`). */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL;
	const normalized = path.replace(/^\//, '');
	return `${base}${normalized}`;
}
