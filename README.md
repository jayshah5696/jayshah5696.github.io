# jayshah5696.github.io

Personal blog built with [Astro](https://astro.build), Tailwind CSS, and a design system inspired by Indian stepwell architecture and rangoli geometry.

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

## Project Structure

```
src/
├── components/          # Astro components
│   ├── FormattedDate.astro
│   ├── MobileNav.astro
│   ├── PostCard.astro
│   ├── Sidebar.astro
│   └── TagList.astro
├── content/
│   └── blog/            # Markdown blog posts
├── layouts/
│   ├── BaseLayout.astro # Root HTML shell
│   └── PostLayout.astro # Individual post wrapper
├── pages/
│   ├── posts/[...slug].astro
│   ├── tags/[tag].astro
│   ├── tags/index.astro
│   ├── about.astro
│   ├── 404.astro
│   ├── index.astro
│   └── rss.xml.ts
├── styles/
│   └── global.css       # Tailwind + custom design system
├── consts.ts            # Site metadata, nav, social links
└── content.config.ts    # Content collection schema
public/
└── assets/
    ├── images/          # Blog images, profile photo, favicons
    └── pdfs/            # Resume
```

## Adding a New Post

Create a markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
date: 2025-01-15
description: A short description for cards and meta tags.
image: /assets/images/your-hero.jpg  # optional
tags:
  - llm
  - rag
draft: false  # set true to hide from production
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

## Routes

| Route              | Description                    |
|--------------------|--------------------------------|
| `/`                | Home — post list with featured |
| `/about`           | About page                     |
| `/tags`            | Tag index with post counts     |
| `/tags/[tag]`      | Posts filtered by tag           |
| `/posts/[slug]/`   | Individual blog post           |
| `/rss.xml`         | RSS feed                       |
| `/404`             | Not found page                 |

## Design System

The visual identity fuses two elements of Indian architecture:

- **Stepwell (Vav)** — layered depth, descending navigation, carved stone typography
- **Rangoli/Kolam** — geometric dot patterns, multi-color gradient dividers

### Color Tokens

| Token    | Hex         | Reference                       |
|----------|-------------|----------------------------------|
| `sand`   | warm stone  | Rajasthani sandstone             |
| `carved` | deep shadow | Carved interiors                 |
| `terra`  | `#c4623a`   | Temple terracotta                |
| `neel`   | `#2d4a7a`   | Indigo dye                       |
| `jal`    | `#3a8a7c`   | Stepwell water                   |
| `haldi`  | `#d4a843`   | Turmeric                         |

### Fonts

- **Yeseva One** — display headings (carved inscription weight)
- **Outfit** — body text (geometric sans)
- **Fira Code** — monospace (tags, dates, code)

### Custom CSS Classes

| Class             | Purpose                                    |
|-------------------|--------------------------------------------|
| `.rangoli-border` | Tri-color gradient divider between sections |
| `.kolam-bg`       | Subtle dot-grid background pattern          |
| `.stepped-card`   | Timeline-style post card with dot marker    |
| `.carved-heading` | Heading with gradient underline ornament    |
| `.tag`            | Mono uppercase tag link                     |

## Tech Stack

- **Astro 5** — static site generator
- **Tailwind CSS 3** — utility-first styling
- **@tailwindcss/typography** — prose styling
- **MDX** — markdown with components
- **Shiki** — syntax highlighting (github-light/github-dark)
- **rehype-slug + rehype-autolink-headings** — auto-linked headings
- **reading-time** — per-post reading time estimates
- **@astrojs/sitemap** — auto-generated sitemap
- **@astrojs/rss** — RSS feed generation

## Dark Mode

Class-based toggle (`dark` on `<html>`), persisted to `localStorage`. Respects `prefers-color-scheme` as default. Flash-free — theme is applied before first paint via inline script in `<head>`.

## Deployment

This site is configured for GitHub Pages. The build output is in `dist/`.

### GitHub Actions (recommended)

Use the official [Astro GitHub Pages deploy action](https://docs.astro.build/en/guides/deploy/github/). Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Manual

```bash
npm run build
# Upload contents of dist/ to your hosting provider
```

## Commands

| Command          | Action                                 |
|------------------|----------------------------------------|
| `npm run dev`    | Start dev server at `localhost:4321`   |
| `npm run build`  | Build production site to `dist/`       |
| `npm run preview`| Preview production build locally       |
| `npm run astro`  | Run Astro CLI commands                 |
