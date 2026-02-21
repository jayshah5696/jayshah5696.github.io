# Next Steps — Post-Merge Cleanup

## 1. Merge `migrate-to-chirpy` branch to `master`

```bash
git checkout master
git merge migrate-to-chirpy-4249768498173701972
git push origin master
```

The branch has 1 commit (`3316a49 Migrate to Chirpy theme`) on top of master.
This adds the GitHub Actions workflow, Chirpy theme files, and removes the old Indigo theme layouts/includes/sass.

---

## 2. Update README.md

The current README is a leftover from the old Indigo theme (references Sérgio Kopplin, MIT license, FAQ from Indigo).
Rewrite it to reflect the actual project:

- **Title**: Jay Shah — Personal Website
- **Link**: https://jayshah5696.github.io
- **Tech stack**: Jekyll 4.3+ / Chirpy theme / GitHub Pages
- **Local development** instructions (Ruby 3.2+, `bundle install`, `bundle exec jekyll serve --livereload`)
- **Deployment**: automatic via GitHub Actions on push to `master`
- **How to add a new post**: create `_posts/YYYY-MM-DD-slug.md` with Chirpy front matter

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

## 5. Update `.gitignore`

Add entries for common local dev artifacts:

```gitignore
.DS_Store
_site
.sass-cache
.bundle
vendor/
.idea/*
nohup.out
Gemfile.lock   # optional — some prefer to track it for reproducibility
*.swp
.pi/
```

Whether to track `Gemfile.lock`: **yes, keep tracking it** — it ensures CI builds match local. It already has both `arm64-darwin` and `x86_64-linux-gnu` platforms.

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

## 8. Gemfile — keep the Ruby 4.0 shims

The Gemfile now includes `ostruct`, `logger`, `csv`, `base64`, `bigdecimal` for Ruby 4.0 compatibility. These are harmless on Ruby 3.x (already in stdlib), so keep them. They ensure the site builds on both Ruby 3.x (CI) and Ruby 4.x (local Mac with Homebrew).

---

## 9. Verify deployment

After merging to `master` and pushing:

1. Go to GitHub repo → **Settings → Pages**
2. Set Source to **"GitHub Actions"** (not "Deploy from a branch")
3. Push to `master` — the `pages.yml` workflow should trigger
4. Check the Actions tab for build status
5. Verify https://jayshah5696.github.io loads with the Chirpy theme

---

## Summary checklist

- [ ] Merge branch to master and push
- [ ] Rewrite `README.md`
- [ ] Delete stale files (`.travis.yml`, `README Old.md`, `FAQ.md`, `Rakefile`, `script/`, `desktop.ini`)
- [ ] Update `.gitignore`
- [ ] Fix `_config-dev.yml` URL
- [ ] Update or remove `docker-compose.yml`
- [ ] Set GitHub Pages source to "GitHub Actions" in repo settings
- [ ] Verify deployment
