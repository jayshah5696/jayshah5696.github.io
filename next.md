# Next Steps — `astro-redesign` branch

## Ready to ship
- ✅ All 7 blog posts migrated
- ✅ About page has full content (Skills, Projects, Experience, Education, Patents, Awards, Languages)
- ✅ Resume linked from about page (cv.jayshah.dev)
- ✅ Dark mode with localStorage persistence
- ✅ RSS feed, sitemap, reading time
- ✅ Clean build: 22 pages, 0 errors, ~1.5s
- ✅ README with full docs
- ✅ .gitignore is clean

---

## Must-do before merge

### 1. Add GitHub Actions workflow

`.github/workflows/deploy.yml` does not exist. Create it:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

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

### 2. Add missing project in About page

`src/pages/about.astro` — add to Projects list:

```html
<li><a href="https://github.com/jayshah5696/Phase1_Analysis">Phase 1 Analysis of Multivariate Quality Control Data</a> — Industrial forging process analysis</li>
```

### 3. Set GitHub Pages source

In repo **Settings → Pages → Source**, select **"GitHub Actions"**.

---

## Nice-to-have improvements

- [ ] Add Google Analytics (`G-ZQ651N672F`) — add to `BaseLayout.astro` `<head>`
- [ ] Add search (e.g., Pagefind, Fuse.js, or Algolia)
- [ ] Add comments (Disqus `jayshah5696`, or Giscus for GitHub-native comments)
- [ ] Add `/archives/` page — chronological post listing
- [ ] Add `/projects/` page — dedicated project showcase (currently only in About)
- [ ] Add `/categories/` page (or merge with Tags if categories aren't used)
- [ ] Add CV/resume link to sidebar nav (cv.jayshah.dev)
- [ ] Add Open Graph images per post (currently only uses `image` frontmatter)

---

## Delete stale files after merge

These are leftover from the old Jekyll site on master:

```bash
rm -f .travis.yml "README Old.md" FAQ.md Rakefile desktop.ini
rm -rf script/ _sass/
```

---

## Checklist

- [ ] Create `.github/workflows/deploy.yml`
- [ ] Add Phase 1 Analysis project to about page
- [ ] Set GitHub Pages source to "GitHub Actions"
- [ ] Merge to master and push
- [ ] Verify https://jayshah5696.github.io loads
- [ ] (Optional) Add analytics, search, comments
