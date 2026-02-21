# jayshah5696.github.io

Personal website and blog — [jayshah5696.github.io](https://jayshah5696.github.io/)

Built with **Jekyll 4** and the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme. Deployed automatically to GitHub Pages via GitHub Actions.

---

## Local Development

### Prerequisites

- **Ruby 3.2+** (Homebrew: `brew install ruby`)
- **Bundler** (`gem install bundler`)

> **macOS note:** The system Ruby (2.6) is too old. Use Homebrew Ruby.
> Add to your shell profile:
> ```bash
> export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
> export GEM_HOME="$HOME/.gem/ruby/$(ruby -e 'puts RUBY_VERSION.split(".")[0..1].join(".")')"
> export PATH="$GEM_HOME/bin:$PATH"
> ```

### Setup & Run

```bash
git clone https://github.com/jayshah5696/jayshah5696.github.io.git
cd jayshah5696.github.io

bundle install
bundle exec jekyll serve --livereload
```

Site will be available at **http://localhost:4000/**

Changes to files auto-reload in the browser.

### Docker (alternative)

```bash
docker compose up
```

---

## Writing a New Post

Create a file in `_posts/` following this naming convention:

```
_posts/YYYY-MM-DD-your-post-slug.md
```

Front matter template:

```yaml
---
title: "Your Post Title"
date: YYYY-MM-DD HH:MM:SS -0700
categories: [blog]
tags: [tag1, tag2]
image: /assets/images/your-image.png
description: "Short description for SEO and cards"
author: Jay Shah
---

Your content here...
```

Place images in `assets/images/` and PDFs in `assets/pdfs/`.

---

## Deployment

Deployment is **automatic** via GitHub Actions on push to `master`.

- Workflow: [`.github/workflows/pages.yml`](.github/workflows/pages.yml)
- Uses Ruby 3.2 on Ubuntu for CI builds
- Deploys to GitHub Pages using the `actions/deploy-pages` action

### GitHub Pages Setup

In your repo **Settings → Pages → Source**, select **"GitHub Actions"** (not "Deploy from a branch").

---

## Project Structure

```
├── _config.yml            # Site configuration
├── _config-dev.yml        # Local dev overrides
├── _posts/                # Blog posts (Markdown)
├── _tabs/                 # Navigation pages (About, Projects, Archives, etc.)
├── _sass/                 # Custom Sass overrides
├── assets/
│   ├── images/            # Post images, profile photo, favicons
│   └── pdfs/              # Resume and other documents
├── Gemfile                # Ruby dependencies
├── .github/workflows/
│   └── pages.yml          # GitHub Actions deploy workflow
└── index.html             # Homepage
```

---

## Branch Overview

| Branch | Stack | Status |
|---|---|---|
| `master` | Jekyll (old Indigo theme) | Production (live) |
| `migrate-to-chirpy-*` | Jekyll + Chirpy theme | Ready to merge — full migration with all content |
| `astro-migration` | Astro 5 + Tailwind CSS | Experimental — runs cleanly but About page is incomplete |

### Astro branch notes

The `astro-migration` branch is a full rewrite using Astro 5, Tailwind CSS, and MDX. It builds and runs (`npm install && npm run dev`) but has content gaps compared to the Chirpy branch:

- **About page**: Only has a 3-paragraph blurb. Missing: Skills, Projects, Experience, Education, Patents, Awards, Languages sections.
- **Missing pages**: No dedicated Projects page, no Archives page, no Categories page.
- **Missing resume link** in navigation (PDF exists in assets but not linked from nav).

The Chirpy branch has full content parity with the original site.

---

## License

Content © Jay Shah. Theme: [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) (MIT).
