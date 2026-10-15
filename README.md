# 3X AI Automation — Website

Marketing site, portfolio and free learning content for **3X AI Automation** (Usama Younas).
Built with React 19, Vite, Tailwind CSS and React Router. Deployed on Vercel.

## Run it

```bash
npm install
npm run dev       # local dev server with HMR
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

Node 20+ is expected.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Sales landing page: hero, services, agents, projects, case study, industries, ROI calculator, process, contact |
| `/academy` | Free six-module AI engineering course plus the "four pillars" platform explainer |
| `/knowledge-hub` | Searchable concept library with diagrams and code |
| `/services`, `/services/:slug` | SEO service pages (data in `src/data/seoContentData.js`) |
| `/industries`, `/industries/:slug` | Industry landing pages |
| `/locations`, `/locations/:slug` | Regional landing pages |
| `/blog`, `/blog/:slug` | Articles |

Everything except `/` is code-split and loaded on demand.

## Where things live

- `src/pages/` — one file per route. `HomePage.jsx` composes the sections in `src/components/`.
- `src/components/` — sections and shared UI. `Navbar.jsx` handles both in-page scrolling and cross-route navigation.
- `src/data/` — all copy and structured content. Edit text here, not in components.
  - `portfolioData.js` — services, projects, industries, process steps
  - `seoContentData.js` — service / industry / location / blog pages and JSON-LD
  - `aiCourseData.js`, `knowledgeBaseData.js` — course modules and hub topics
- `public/images/` — WebP only, max 1200px wide. Run new images through an optimiser before committing; nothing in here should be over ~150 KB.
- `public/sitemap.xml`, `public/robots.txt` — update when routes change.

## Contact form

The form posts to FormSubmit using the address in `src/components/Contact.jsx`. No server or API key is needed.

## Before going live on a custom domain

The canonical URL is hard-coded in a few places. Search for `usama-ai-portfolio.vercel.app` and replace it in:

- `src/components/SEOHead.jsx` (`SITE_URL`)
- `src/data/seoContentData.js` (`SITE_INFO.url` and the JSON-LD `@id` / `url` fields)
- `index.html` (canonical, OpenGraph and Twitter tags)
- `public/sitemap.xml` and `public/robots.txt`
