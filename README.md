# SkyFrame Studios

Static site for [skyframestudio.org](https://skyframestudio.org), built with [Astro](https://astro.build).

## Requirements

- Node.js 22.12+
- npm

## Local development

```bash
npm ci
npm run dev
```

Open the URL printed by Astro (usually `http://localhost:4321`).

```bash
npm run build    # output → dist/
npm run preview  # serve the production build locally
```

## Structure

```
src/
├── components/   # Hero, NavBar, About, Portfolio, Footer
├── data/         # Site constants (site.ts)
├── layouts/      # BaseLayout
├── lib/          # Client interactivity (nav, scroll, AOS)
├── pages/        # Routes (index)
└── styles/       # Site CSS (Nomad Force theme)
public/           # Static assets (css/js vendor, CNAME); media served from R2
dist/             # Build output (gitignored; produced by CI)
```

## CI/CD (GitHub Actions)

Workflow: `.github/workflows/pages.yml`

| Event | Behavior |
| --- | --- |
| Pull request to `main` | `npm ci` + `npm run build` (no deploy) |
| Push to `main` | Build, upload `dist/`, deploy to GitHub Pages |
| `workflow_dispatch` | Same as push to `main` |

CI never commits build output back to the repository.

## Deployment configuration

Hosting target: **GitHub Pages** via Actions (same provider as the previous static root deploy). Custom domain: `skyframestudio.org` (`public/CNAME`).

### Manual GitHub settings (required once)

1. **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions** (do not use “Deploy from a branch” / `/docs` or `/ (root)`).
2. If the repository is private, ensure the org/user plan allows GitHub Pages for private repositories.
3. **Custom domain**:
   - Keep `public/CNAME` as `skyframestudio.org` (included in the build artifact).
   - In **Settings → Pages → Custom domain**, set `skyframestudio.org` and enable HTTPS once DNS validates.
   - Point DNS at GitHub Pages (A/AAAA for apex, or CNAME for `www`) per [GitHub’s custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. `astro.config.mjs` uses `site: 'https://skyframestudio.org'` and default `base: '/'` for the custom domain. Asset URLs go through `withBase()` so a temporary project-pages base works if needed.

### Project URL without custom domain

If you need `https://skyguy126.github.io/video-website/` before DNS is ready, set in `astro.config.mjs`:

```js
site: 'https://skyguy126.github.io',
base: '/video-website',
```

Remove or empty `public/CNAME` while using that mode, then restore the custom-domain settings above when DNS is ready.

## Rollback

1. Revert the bad commit(s) on `main` (or restore a known-good commit) and push — Actions will rebuild and redeploy.
2. Or use **Actions → Deploy Astro site to GitHub Pages → Run workflow** on a good commit after resetting `main`.
3. As an emergency fallback, in **Settings → Pages** you can temporarily switch away from Actions only if you intentionally restore a branch-based publish setup; prefer fixing `main` and letting Actions redeploy.

## Notes

- Media (images, videos, icon fonts): `https://media.munixnet.org/skyframestudio/…` (Cloudflare R2 bucket `media`)
- Hero background video: `videos/website_video.mp4` under that prefix
- Portfolio embed: YouTube (`src/data/site.ts`)
- No server-side auth or private media; R2/CDN assets are publicly served
