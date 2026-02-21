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

## 10. Astro branches — comparison

### `astro-migration` (older, minimal design)
- Builds cleanly: 22 pages, 0 errors, ~1.6s
- **About page is a 3-paragraph stub** — missing Skills, Projects, Experience, Education, Patents, Awards, Languages
- No Projects/Archives/Categories pages
- Nav: Writing, Tags, About only

### `astro-redesign` (newer, Indian stepwell/rangoli design system) ✅
- Builds cleanly: 22 pages, 0 errors, ~1.5s
- **About page has FULL content** — all 8 sections match Chirpy (Journey, Skills, Projects, Honors, Experience, Education, Patents, Languages)
- Has HuggingFace link in social links ✅
- Resume linked from about page (cv.jayshah.dev) ✅
- Custom design system: Yeseva One + Outfit fonts, sand/carved/terra color tokens, rangoli borders, kolam dot-grid backgrounds
- Dark mode with localStorage persistence ✅
- README already has full docs (quick start, project structure, post guide, design system docs, deployment) ✅
- .gitignore is clean ✅

#### Remaining gaps in `astro-redesign` vs Chirpy:
- **1 missing project**: "Phase 1 Analysis of Multivariate Quality Control Data" not in Projects list
- **No GitHub Actions workflow** — `.github/workflows/` doesn't exist. README documents the deploy.yml to add but it's not committed
- **No Projects page** — Chirpy has `/projects/` as a dedicated tab
- **No Archives page** — Chirpy has `/archives/` with chronological post listing
- **No Categories page** — Chirpy has `/categories/`
- **Nav is minimal** — Writing, Tags, About (vs Chirpy's Home, Categories, Tags, Archives, About, Projects)
- **No search** — Chirpy has built-in search; Astro has none
- **No Disqus comments** — Chirpy has comments configured
- **No Google Analytics** — Chirpy has `G-ZQ651N672F` configured

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
- [ ] (If using Astro) Add missing project: Phase 1 Analysis
- [ ] (If using Astro) Add GitHub Actions workflow (deploy.yml)
- [ ] (If using Astro) Consider adding Projects, Archives pages
- [ ] (If using Astro) Add Google Analytics, Disqus comments, search
