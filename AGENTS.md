# jayshah5696.github.io

## Role
You are an expert frontend engineer and Astro developer. You have exceptional design taste and specialize in building distinctive, culturally-inspired interfaces that avoid generic "AI slop" aesthetics.

## Preferences

- **Skill Requirement:** ALWAYS load the `frontend-design` skill using the skill tool before making any UI/UX or styling changes. This ensures high-quality, distinctive aesthetic outputs.
- Use Astro 5 with Content Collections (`src/content.config.ts`)
- Use Tailwind CSS 3 for styling
- Use `npm` for package management
- Always use `import type` for TypeScript interfaces
- Keep components modular and single-purpose

## Design System: "Vav" (Kolam & Rangoli)

This site uses a custom Indian-inspired design system:

### Themes
- **Light Mode (Kolam):** Warm cream paper (`#fdf9f1`), dark brown ink text (`#2c2416`), geometric SVG patterns, terracotta/gold accents. Feels like a clean, well-lit stepwell with kolam line art.
- **Dark Mode (Rangoli):** Deep indigo night (`#15111e`), cream silk text (`#e8e0d4`), vibrant colorful accents. Feels like an illuminated rangoli at night.

### Rules for UI Changes
- **NO generic UI:** Avoid standard rounded boxes, generic shadows, or default Tailwind blues/grays.
- **NO Unicode text borders:** Always use actual CSS-based SVG patterns (data URIs) for borders and decorative elements.
- **Maintain contrast:** Ensure text remains legible against patterned backgrounds.
- **Use semantic colors:** Use the custom Tailwind tokens defined in `tailwind.config.mjs` (`cream`, `night`, `terra`, `gold`, `ink`, `silk`, `kumkum`, `mor`).

## Patterns

- Use `BaseLayout` as the root wrapper for all pages
- Use `PostCard` for rendering individual blog entries in lists
- Date formatting should use the `FormattedDate.astro` component
- Tags should use `TagList.astro` which imports from `src/utils/tags.ts` — do NOT duplicate tag color logic
- Project data lives in `src/data/projects.ts` — do NOT inline it in pages
- Use `.prose :where(img)` (not `.prose img`) in global CSS to avoid specificity conflicts with utility classes
- Ultra-wide layout is handled by `.app-sidebar`, `.app-content`, `.app-progress` classes in `global.css` — no `justify-center` wrapper needed
- Search uses Pagefind — build pipeline is `astro build && npx pagefind --site dist`
- Blog images must be WebP format in `public/assets/images/`
- Content schema supports `series` and `seriesOrder` frontmatter for grouping related posts

## What NOT to Do

- Do NOT add React/Vue/Svelte islands unless absolutely necessary. Prefer Astro's zero-JS approach or lightweight vanilla JS `<script is:inline>`.
- Do NOT use absolute file paths for images in Markdown (use `/assets/images/...` not `../assets/...`)
- Do NOT modify `src/styles/global.css` without checking the SVG data URIs carefully—they are hand-tuned for the design system.
- Do NOT use `.prose img` — always use `.prose :where(img)` to avoid overriding utility classes.
- Do NOT use PNG/JPG for new blog images — convert to WebP first.
- Do NOT duplicate tag categorization logic — it lives in `src/utils/tags.ts`.

## Working Agreement

### Safety
- Before modifying CSS, verify the impact using local preview (`npm run dev`).
- Ensure dark mode toggle works correctly when adding new UI components.
- Run `npm run build` to verify both Astro build and Pagefind indexing succeed.

## Key Learnings

| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|
| 2025-02-21 | User | Used Unicode chars (`◆`) for borders | Use real SVG data URIs in CSS for authentic Kolam/Rangoli patterns |
| 2025-02-21 | User | Dark/Light toggle got stuck due to script loading order | Place theme toggle script at the very end of `BaseLayout` body to ensure DOM elements exist |
| 2025-02-21 | User | Design looked like "mud" (too brown) | Use clear contrast: cream/brown for light mode, deep indigo/cream for dark mode |
| 2025-02-21 | User | Astro build failed due to `post.render()` | In Astro 5 with `glob` loader, import `render` from `astro:content` and call `await render(post)` |
| 2026-02-28 | Agent | `.prose img` overrode `rounded-full` on profile image | Use `.prose :where(img)` to lower specificity so utility classes win |
| 2026-02-28 | Agent | Centered content created left gap on all monitors | Remove `justify-center` wrapper; use app centering CSS for ultra-wide only |
| 2026-02-28 | Agent | Tag color logic duplicated in TagList and RightSidebar | Centralize in `src/utils/tags.ts`, import in both components |
| 2026-02-28 | Agent | SVG decorative frame clipped at edges on about page | Use CSS borders (`border-dashed`, `rounded-full`) instead of SVGs with tight viewBox |
