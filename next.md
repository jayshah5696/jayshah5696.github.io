# Next Steps — `astro-migration` branch

> **Note:** The newer `astro-redesign` branch is recommended over this one.
> It has the same Astro 5 + Tailwind stack but with full About page content
> and a custom Indian stepwell/rangoli design system.

## Status
- ✅ All 7 blog posts migrated
- ✅ Clean build: 22 pages, 0 errors, ~1.6s
- ✅ Dark mode, RSS, sitemap, reading time
- ❌ About page is a 3-paragraph stub — missing most content

---

## Must-do before merge

### 1. Port full About page content from Chirpy

`src/pages/about.astro` currently has only a brief blurb. Missing sections:
- Skills (Data Science, ML Libraries, Cloud, MLOps, Visualization)
- Projects (8 projects with links)
- Experience (Avathon, DataKind, Texas A&M, UES)
- Education (Texas A&M MSISE, GTU BE)
- Patents (3 patents)
- Honors & Awards (Ragathon winner, Outstanding MS Student, Datathon runner-up)
- Languages (English, Hindi, Gujarati, German)

The full content exists in the Chirpy branch at `_tabs/about.md`.

### 2. Add GitHub Actions workflow

No `.github/workflows/` directory exists. Need `deploy.yml` for GitHub Pages.

### 3. Add missing social link

`src/consts.ts` — missing HuggingFace link (present in `astro-redesign`).

### 4. Replace resume PDF link with cv.jayshah.dev

`src/pages/about.astro` links to `/assets/pdfs/JayShah_Resume_0221.pdf`. Change to `https://cv.jayshah.dev`.

### 4. Set GitHub Pages source

In repo **Settings → Pages → Source**, select **"GitHub Actions"**.

---

## Nice-to-have improvements

- [ ] Add Google Analytics (`G-ZQ651N672F`)
- [ ] Add search
- [ ] Add comments (Disqus or Giscus)
- [ ] Add `/projects/`, `/archives/`, `/categories/` pages
- [ ] Add resume/CV link to nav

---

## Recommendation

Use `astro-redesign` instead — it already has:
- Full About page with all 8 sections ✅
- HuggingFace in social links ✅
- More polished design system ✅
- Better README ✅

This branch would require significant content porting work to reach parity.
