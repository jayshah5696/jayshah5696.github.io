# jayshah5696.github.io

Personal blog and portfolio built with [Astro](https://astro.build), Tailwind CSS, and a custom design system inspired by Indian Kolam and Rangoli geometry.

**Live Site:** [https://jayshah.dev](https://jayshah.dev)

## Features

- **Custom "Vav" Design System**: Light mode (Kolam) with warm cream/brown ink and dark mode (Rangoli) with deep indigo/vibrant accents
- **SVG Geometry**: Procedurally generated inline SVG patterns for borders, corners, and hero elements
- **Color-coded Tags**: Semantic categorization (terra for AI, teal for dev tools, gold for ML, red for personal)
- **View Transitions**: Smooth, app-like navigation between pages while preserving theme state
- **Reading Enhancements**: Scroll progress bar, calculated reading time, floating table of contents
- **Developer Tools**: One-click copy buttons on code blocks with Shiki syntax highlighting
- **Giscus Comments**: GitHub Discussions-powered comment system on all posts
- **SEO & Analytics**: Google Analytics (`G-ZQ651N672F`), Open Graph tags, canonical URLs, auto-generated sitemap and RSS feed

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

## Writing a New Post

Create a markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
date: 2026-05-15
description: A short description for cards and meta tags.
image: /assets/images/your-hero.jpg  # optional
tags:
  - llm
  - rag
draft: false  # set true to hide from production listings
---

Your content here...
```

### Frontmatter Fields

| Field         | Type       | Required | Description                          |
|---------------|------------|----------|--------------------------------------|
| `title`       | `string`   | yes      | Post title                           |
| `date`        | `date`     | yes      | Publication date (YYYY-MM-DD)        |
| `description` | `string`   | yes      | Short description for cards/SEO      |
| `image`       | `string`   | no       | Hero image path (from `/public`)     |
| `tags`        | `string[]` | no       | Array of tag slugs                   |
| `draft`       | `boolean`  | no       | If `true`, excluded from production  |

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

## Tech Stack

- **Astro 5** — zero-JS static site generator
- **Tailwind CSS 3** — utility-first styling with custom tokens
- **@tailwindcss/typography** — prose styling with custom `prose-kolam` theme
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
