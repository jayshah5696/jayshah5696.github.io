## Why
Integrate **Libron** (Nico Verbruggen's open-source e-reader / editorial serif typeface) as the primary reading body font across the website to elevate screen readability and long-form reading comfort for technical essays and notes, while preserving Yeseva One for display titles.

## Changes
- **Self-Hosted Libron Webfonts (`public/fonts/libron/`):** Added official WOFF2 assets (`Libron-Regular.woff2`, `Libron-Italic.woff2`, `Libron-Bold.woff2`, `Libron-BoldItalic.woff2`) locally for zero third-party latency, private, and offline-ready rendering.
- **Production CSS Typography (`src/styles/global.css` & `tailwind.config.mjs`):**
  - Configured `@font-face` rules for Libron with `font-display: swap`.
  - Set `:root` typography variables to `--font-display: 'Yeseva One'`, `--font-body: 'Libron'`, and `--font-mono: 'Fira Code'`.
  - Updated Tailwind `fontFamily.display`, `fontFamily.body`, and `fontFamily.mono` tokens to wire directly into CSS variables with Libron as the first fallback.
- **Design System Invariants (`AGENTS.md`):** Updated typography guidelines to reflect Libron for reading body.
- **Zero Framework / Zero Runtime Overhead:** Pure CSS font implementation with no runtime JS dependencies or temporary evaluation widgets.

## Reviewer notes
- The local validation server is running live at `http://localhost:4321/` with the exact 1:1 production changes applied site-wide.
- All pages (`/`, `/about`, `/projects`, `/reads`, `/posts/[slug]`) automatically inherit Libron for body prose and Yeseva One for headings.

## Verification
- `just build`: Generated 99 static pages and Pagefind index in ~2.1s without errors.
- `just ci-build`: Passed with exit code 0.
- Preview server HTTP verification: `http://localhost:4321/` returned 200 OK.
- Verified in both Light (Kolam) and Dark (Rangoli) modes.
