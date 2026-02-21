# Next Steps — Post-Merge Cleanup

## 1. Merge `migrate-to-chirpy` branch to `master`

```bash
git checkout master
git merge migrate-to-chirpy-4249768498173701972
git push origin master
```

The branch has 2 commits on top of master:
- `3316a49` — Migrate to Chirpy theme
- `e79ab1a` — Add Ruby 4.0 stdlib shims + next.md

This adds the GitHub Actions workflow, Chirpy theme files, and removes the old Indigo theme layouts/includes/sass.

---

## 2. ~~Update README.md~~ ✅ Done

README rewritten with:
- Local dev instructions (Ruby 3.2+, bundle install, serve)
- macOS Homebrew Ruby setup
- Post writing guide with front matter template
- Deployment docs (GitHub Actions)
- Project structure
- Branch comparison table (master vs chirpy vs astro)

---

## 3. Fix CI/CD — GitHub Actions workflow (`pages.yml`)

The workflow at `.github/workflows/pages.yml` is mostly correct but needs:

- **Ruby version**: Currently `3.2`. This works for CI (Ubuntu). Keep it — don't use 4.0 in CI yet, gems like `jekyll-spaceship` need the `ostruct`/`logger`/`csv` shims which we added to the Gemfile. Ruby 3.2 still bundles them in stdlib, so it works cleanly. Bump to `3.3` for latest stable.
- **Gemfile.lock platforms**: Already has `x86_64-linux-gnu` (CI) and `arm64-darwin` (local Mac). ✅
- **GitHub Pages source**: Must be set to **"GitHub Actions"** (not "Deploy from branch") in repo Settings → Pages → Source. Verify this in the GitHub UI.

---

## 4. Remove stale files from old Indigo theme / Travis CI

These files are no longer used and should be deleted:

```bash
rm .travis.yml           # Travis CI config — replaced by GitHub Actions
rm "README Old.md"       # Old Indigo README
rm FAQ.md                # Indigo FAQ — not relevant to Chirpy
rm Rakefile              # html-proofer rake task — not used in current CI
rm script/cibuild        # Travis CI build script
rmdir script/            # now empty
rm desktop.ini           # Windows artifact
```

---

## 5. ~~Update `.gitignore`~~ ✅ Done

Updated to cover both Jekyll and Astro artifacts:
- `_site/`, `dist/`, `.astro/`, `node_modules/`, `.sass-cache/`, `.jekyll-cache/`
- OS files, IDE files, `nohup.out`

`Gemfile.lock` is tracked (ensures CI reproducibility).

---

## 6. Update `docker-compose.yml`

The current Docker image (`bretfisher/jekyll-serve`) is generic and may not install the Chirpy theme properly. Replace with:

```yaml
version: "3"
services:
  jekyll:
    image: jekyll/jekyll:4
    command: jekyll serve --livereload --force_polling
    volumes:
      - .:/srv/jekyll
    ports:
      - "4000:4000"
      - "35729:35729"
```

Or just remove `docker-compose.yml` if not using Docker.

---

## 7. Update `_config-dev.yml`

Fix the URL (currently `https://localhost:4000` — should be `http`):

```yaml
url: http://localhost:4000
```

---

## 8. Gemfile — keep the Ruby 4.0 shims ✅ Already done

The Gemfile now includes `ostruct`, `logger`, `csv`, `base64`, `bigdecimal` for Ruby 4.0 compatibility. These are harmless on Ruby 3.x (already in stdlib), so keep them.

---

## 9. Verify deployment

After merging to `master` and pushing:

1. Go to GitHub repo → **Settings → Pages**
2. Set Source to **"GitHub Actions"** (not "Deploy from a branch")
3. Push to `master` — the `pages.yml` workflow should trigger
4. Check the Actions tab for build status
5. Verify https://jayshah5696.github.io loads with the Chirpy theme

---

## 10. Astro branch — content gaps to fix (if switching to Astro later)

The `astro-migration` branch builds and runs cleanly (`npm install && npm run dev`, 22 pages, 0 errors) but has significant content gaps vs the Chirpy branch:

### About page (`src/pages/about.astro`)
Currently only a 3-paragraph blurb + social links. **Missing sections**:
- Skills (Data Science, ML Libraries, Cloud, Software Dev, MLOps, Visualization)
- Projects (8 projects with links)
- Experience (Avathon, DataKind, Texas A&M, UES)
- Education (Texas A&M MSISE, GTU BE)
- Patents (3 patents)
- Honors & Awards (Ragathon winner, Outstanding MS Student, Datathon runner-up)
- Languages (English, Hindi, Gujarati, German)

All this content exists in the Chirpy `_tabs/about.md` — needs to be ported to the Astro component.

### Missing pages
- **Projects page** — Chirpy has `_tabs/projects.md`; Astro has no `/projects` route
- **Archives page** — Chirpy has `_tabs/archives.md`; Astro has no `/archives` route
- **Categories page** — Chirpy has `_tabs/categories.md`; Astro has no `/categories` route

### Navigation
- Astro nav only has: Writing, Tags, About
- Chirpy nav has: Home, Categories, Tags, Archives, About, Projects

### Resume link
- PDF exists at `public/assets/pdfs/JayShah_Resume_0221.pdf`
- Only linked from the about page footer, not from main nav/sidebar

---

## Summary checklist

- [ ] Merge chirpy branch to master and push
- [x] Rewrite `README.md`
- [ ] Delete stale files (`.travis.yml`, `README Old.md`, `FAQ.md`, `Rakefile`, `script/`, `desktop.ini`)
- [x] Update `.gitignore`
- [ ] Fix `_config-dev.yml` URL
- [ ] Update or remove `docker-compose.yml`
- [ ] Set GitHub Pages source to "GitHub Actions" in repo settings
- [ ] Verify deployment
- [ ] (If using Astro) Port full About content from Chirpy
- [ ] (If using Astro) Add Projects, Archives, Categories pages
