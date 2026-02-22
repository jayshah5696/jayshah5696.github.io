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
- Tags should use the `TagList.astro` component

## What NOT to Do

- Do NOT add React/Vue/Svelte islands unless absolutely necessary for complex interactivity. Prefer Astro's zero-JS approach or lightweight vanilla JS `<script is:inline>`.
- Do NOT use absolute file paths for images in Markdown (use `/assets/images/...` not `../assets/...`)
- Do NOT modify `src/styles/global.css` without checking the SVG data URIs carefully—they are hand-tuned for the design system.

## Working Agreement

### Branching
- Always work on a feature branch, never directly on `master`.
- The current main development branch for the redesign is `astro-redesign`.

### Safety
- Before modifying CSS, verify the impact using local preview (`npm run dev`).
- Ensure dark mode toggle works correctly when adding new UI components.

## Key Learnings

| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|
| 2025-02-21 | User | Used Unicode chars (`◆`) for borders | Use real SVG data URIs in CSS for authentic Kolam/Rangoli patterns |
| 2025-02-21 | User | Dark/Light toggle got stuck due to script loading order | Place theme toggle script at the very end of `BaseLayout` body to ensure DOM elements exist |
| 2025-02-21 | User | Design looked like "mud" (too brown) | Use clear contrast: cream/brown for light mode, deep indigo/cream for dark mode |
| 2025-02-21 | User | Astro build failed due to `post.render()` | In Astro 5 with `glob` loader, import `render` from `astro:content` and call `await render(post)` |
