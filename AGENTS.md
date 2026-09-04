# jayshah5696.github.io

## Stack & Commands
- Astro 7 (Content Collections), Tailwind CSS 4, pnpm, just
- Dev: `pnpm dev` | Build: `just build` (Astro + Pagefind) | CI: `just ci-build`

## Skills & Routing
- UI/UX & Styling: ALWAYS invoke the `design-taste-frontend` skill before modifying UI, layouts, or cards.
- Interactive Posts: Follow `docs/publishing-interactive-blogs.md`.
- Historical Bug Log: Archived in `docs/historical-learnings.md`.

## Design System & Visual Perspective ("Vav")
- **Themes:** Light (Kolam: warm cream paper `#fdf9f1`, dark brown ink `#2c2416`, terra/gold) & Dark (Rangoli: indigo night `#15111e`, cream silk `#e8e0d4`).
- **Typography:** Display headings use `font-display` (Yeseva One). Reading body uses `font-sans` (Outfit). Technical meta, dates, and tags use `font-mono` (Fira Code).
- **Cards & Structure:** Grounded `.featured-card` with rangoli corners and 150ms border shifts. NO floaty vertical translations (`hover:-translate-y-*`), NO scaling on dense lists (`scale-125`), and NO synthetic telemetry spec grids (`DuckDB`, `LangGraph`).
- **Surface Parity (Anti-Isolation):** Never design or refactor a component in a vacuum. Any motif change (e.g. Vav dual-rail spine `.stepwell-spine`, Kolam diamond bindu node `.kolam-diamond-node`) must be audited and applied consistently across peer surfaces (`/about`, `/projects`, `/reads`, `/archives`, `/links`).
- **High-Frequency Interaction:** Zero hover latency. Never allow entrance stagger delays (`--index`, `.reveal`) to leak into interactive states. Enforce `transition-delay: 0s !important` on `:hover` and `:focus-visible`.

## Hard Invariants
- Zero UI frameworks (no React/Vue/Svelte) — prefer Astro zero-JS or minimal inline scripts.
- Image assets must be WebP under `public/assets/images/`.
- Tag color and categorization logic lives strictly in `src/utils/tags.ts` — do not duplicate.
- Keep SVG borders authentic via CSS data URIs — no unicode border hacks.

## Verification
- Verify interactive changes (click-to-accordion toggles, theme switching) across view transitions.
- Audit rapid mouse sweeps across list stacks to ensure zero hover lag or half-rendered glitches.
- Run `just ci-build` before committing build, integration, or dependency updates.
