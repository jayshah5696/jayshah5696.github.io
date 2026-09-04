# Historical Key Learnings & Engineering Log

This log archives past engineering decisions, bug resolutions, and edge-case fixes across the evolution of `jayshah.dev`. Kept separate from `AGENTS.md` to prevent prompt token dilution while preserving long-term project memory.

| Date | Source | What Went Wrong | What To Do Instead |
|---|---|---|---|
| 2025-02-21 | User | Used Unicode chars (`◆`) for borders | Use real SVG data URIs in CSS for authentic Kolam/Rangoli patterns |
| 2025-02-21 | User | Dark/Light toggle got stuck due to script loading order | Place theme toggle script at the very end of `BaseLayout` body to ensure DOM elements exist |
| 2025-02-21 | User | Design looked like "mud" (too brown) | Use clear contrast: cream/brown for light mode, deep indigo/cream for dark mode |
| 2025-02-21 | User | Astro build failed due to `post.render()` | In Astro 5 with `glob` loader, import `render` from `astro:content` and call `await render(post)` |
| 2026-02-28 | Agent | `.prose img` overrode `rounded-full` on profile image | Use `.prose :where(img)` to lower specificity so utility classes win |
| 2026-02-28 | Agent | Centered content created left gap on all monitors | Remove `justify-center` wrapper; use app centering CSS for ultra-wide only |
| 2026-02-28 | Agent | Tag color logic duplicated in TagList and RightSidebar | Centralize in `src/utils/tags.ts`, import in both components |
| 2026-02-28 | Agent | SVG decorative frame clipped at edges on about page | Use CSS borders (`border-dashed`, `rounded-full`) instead of SVGs with tight viewBox |
| 2026-08-17 | Agent | Interactive post showed "0 min read" | Put full article text in `post.body` within content collection so `reading-time` calculates actual duration (~48 min) |
| 2026-08-18 | Agent | Local build passed but GitHub Pages failed because Astro's Markdown processor existed only transitively | Add `@astrojs/markdown-remark` as a direct dependency and run `just ci-build` for build-system changes |
| 2026-09-04 | User | Entrance animation delay (`--index * 60ms`) leaked into card `:hover`, causing delayed/glitched hover on list sweeps | Reset `transition-delay: 0s` on `.reveal.is-visible` and force `transition-delay: 0s !important` on `:hover` / `:focus-visible` |
| 2026-09-04 | User | New Stepwell timeline motif was only applied to About page, leaving Archives inconsistent | Unify foundational motifs (dual-rail spine, Kolam bindu nodes) across all matching surfaces |
| 2026-09-04 | User | Restyling `ReadCard` broke click-to-expand accordion notes | Keep click handlers intact and test accordion toggles with `data-astro-rerun` across transitions |
