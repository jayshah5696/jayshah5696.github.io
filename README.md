# jayshah5696.github.io

Personal blog and portfolio built with [Astro](https://astro.build), Tailwind CSS, and a custom design system inspired by Indian Kolam and Rangoli geometry.

**Live Site:** [https://jayshah.dev](https://jayshah.dev)

## Features

- **Custom "Vav" Design System**: Light mode (Kolam) with warm cream/brown ink and dark mode (Rangoli) with deep indigo/vibrant accents
- **SVG Geometry**: Procedurally generated inline SVG patterns for borders, corners, and hero elements
- **Color-coded Tags**: Semantic categorization with shape indicators for accessibility (terra ● for AI, teal ◆ for dev tools, gold ▲ for ML, red ✦ for personal)
- **Full-text Search**: Pagefind-powered static search with `/` keyboard shortcut
- **Ultra-wide Support**: App centers as a cohesive unit on monitors wider than 1536px (like GitHub/Twitter)
- **View Transitions**: Smooth, app-like navigation between pages while preserving theme state
- **Reading Enhancements**: Scroll progress bar, calculated reading time, floating table of contents
- **Post Series**: Group related posts with series navigation banner
- **Developer Tools**: One-click copy buttons on code blocks with Shiki syntax highlighting
- **Giscus Comments**: GitHub Discussions-powered comment system on all posts
- **JSON-LD Structured Data**: BlogPosting and Person schemas for rich search snippets
- **SEO & Analytics**: Google Analytics, Open Graph/Twitter Card tags (with image fallback), canonical URLs, auto-generated sitemap, RSS feed, robots.txt
- **Accessibility**: Skip-to-main link, dynamic theme toggle aria-labels, shape-based tag indicators
- **Optimized Images**: All blog images in WebP format (91% size reduction from originals)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4321

# Build for production (includes Pagefind indexing)
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/              # Reusable Astro components
│   ├── Sidebar.astro        # Desktop sidebar with nav, search, socials
│   ├── MobileNav.astro      # Mobile header with hamburger menu
│   ├── PostCard.astro       # Blog post card (featured + regular)
│   ├── RightSidebar.astro   # Recent posts + trending tags
│   ├── TagList.astro        # Color-coded tag links
│   ├── Search.astro         # Pagefind search modal
│   ├── JsonLd.astro         # Structured data component
│   ├── Giscus.astro         # Comments integration
│   ├── FormattedDate.astro  # Date formatter
│   └── NavIcon.astro        # SVG icon map
├── layouts/
│   ├── BaseLayout.astro     # Root layout (sidebar, meta, scripts)
│   └── PostLayout.astro     # Post layout (TOC, progress bar, series)
├── pages/                   # File-based routing
├── content/blog/            # Markdown blog posts
├── data/projects.ts         # Project data
├── utils/tags.ts            # Shared tag categorization logic
├── styles/global.css        # Design system CSS + app centering
└── content.config.ts        # Content collection schema
```

## Writing a New Post

Create a markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
date: 2026-05-15
description: A short description for cards and meta tags.
image: /assets/images/your-hero.webp  # optional (use WebP)
tags:
  - llm
  - rag
series: "RAG Deep Dive"     # optional — groups related posts
seriesOrder: 1               # optional — ordering within series
draft: false                 # set true to hide from production
---

Your content here...
```

### Frontmatter Fields

| Field         | Type       | Required | Description                          |
|---------------|------------|----------|--------------------------------------|
| `title`       | `string`   | yes      | Post title                           |
| `date`        | `date`     | yes      | Publication date (YYYY-MM-DD)        |
| `description` | `string`   | yes      | Short description for cards/SEO      |
| `image`       | `string`   | no       | Hero image path (WebP, from `/public`) |
| `tags`        | `string[]` | no       | Array of tag slugs                   |
| `series`      | `string`   | no       | Series name for grouping posts       |
| `seriesOrder` | `number`   | no       | Order within the series              |
| `draft`       | `boolean`  | no       | If `true`, excluded from production  |

### Adding Images

All blog images should be in WebP format for performance:
1. Place original in `public/assets/images/`
2. Convert to WebP: `cwebp -q 80 input.jpg -o output.webp` (or `-q 85` for PNGs with text)
3. Reference as `/assets/images/output.webp` in markdown
4. Delete the original after verifying

## Design System: "Vav" (Kolam & Rangoli)

The visual identity fuses two elements of Indian art:

- **Light Mode (Kolam):** Warm cream paper (`#fdf9f1`), dark brown ink text (`#2c2416`), delicate woven knot patterns.
- **Dark Mode (Rangoli):** Deep indigo night (`#15111e`), cream silk text (`#e8e0d4`), vibrant colorful accents.

### Color Tokens

| Token    | Usage                                  |
|----------|----------------------------------------|
| `cream`  | Light mode surfaces, borders           |
| `night`  | Dark mode surfaces, code blocks        |
| `terra`  | Primary accent (terracotta). Links, AI tags |
| `mor`    | Peacock teal. Dev tool tags            |
| `gold`   | Turmeric yellow. ML tags, decorative dots |
| `kumkum` | Vermilion red. Personal tags           |
| `ink`    | Light mode text hierarchy              |
| `silk`   | Dark mode text hierarchy               |

### Fonts

- **Yeseva One** — display headings (serif)
- **Outfit** — body text (geometric sans)
- **Fira Code** — monospace (tags, dates, code)

### Custom CSS Classes

| Class             | Purpose                                    |
|-------------------|--------------------------------------------|
| `.kolam-border`   | Horizontal figure-8 woven interlocking pattern |
| `.kolam-dots`     | Background pattern of dots + grid lines for sidebar |
| `.kolam-hero`     | Large multi-layered geometric art header |
| `.rangoli-corners`| Pseudo-elements adding 52px SVG lotus corner ornaments |
| `.featured-card`  | Card with subtle tiled diamond background pattern |
| `.carved-heading` | Heading with gradient underline ornament    |
| `.tag-*`          | Color-coded tag pills (`tag-ai`, `tag-dev`, etc.) |
| `.app-sidebar`    | Ultra-wide centering for sidebar           |
| `.app-content`    | Ultra-wide centering for main content      |
| `.app-progress`   | Ultra-wide centering for reading progress bar |

## Tech Stack

- **Astro 5** — zero-JS static site generator
- **Tailwind CSS 3** — utility-first styling with custom tokens
- **@tailwindcss/typography** — prose styling with custom `prose-kolam` theme
- **Pagefind** — static full-text search (indexed at build time)
- **MDX** — markdown with components
- **Shiki** — syntax highlighting (github-light/github-dark)
- **rehype-slug + rehype-autolink-headings** — auto-linked headings
- **reading-time** — per-post reading time estimates

## Deployment

This site is configured for GitHub Pages with a custom domain (`jayshah.dev`).

Deployment is fully automated via GitHub Actions (`.github/workflows/deploy.yml`). Any push to the `master` branch triggers a build and deploy.

### Domain Configuration Notes
- Cloudflare DNS: 4 A records pointing to GitHub IPs (`185.199.108.153` etc.), proxy status set to **DNS only** (grey cloud).
- GitHub Pages: Source set to "GitHub Actions", Custom domain set to `jayshah.dev` with Enforce HTTPS checked.
- Root `public/CNAME` file ensures GitHub Pages recognizes the domain during build.

### Comments Configuration
Giscus is configured to use the "Announcements" category in GitHub Discussions for this repository. To manage comments, go to the Discussions tab in the GitHub repo.
