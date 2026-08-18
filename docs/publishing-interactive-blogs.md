# Publishing Interactive & Simulation-Heavy Blogs

This guide documents the **Vav Interactive** publishing pipeline for transforming standalone HTML simulations, research reports, and dashboard-heavy essays into native, theme-aligned blog posts on [`jayshah5696.github.io`](https://jayshah.dev).

---

## 1. The Core Command

Publishing any interactive HTML file is automated via `just`:

```bash
just publish-interactive <path-to-html> <slug> [tags-comma-separated] [date-yyyy-mm-dd]
```

### Example
```bash
just publish-interactive /Users/jshah/Documents/GitHub/text-watermarking-lab/blog/how-text-watermarks-hide-in-plain-sight.html how-text-watermarks-hide-in-plain-sight "ai-safety,llm,watermarking,gen-ai,research" "2026-08-16"
```

---

## 2. What `just publish-interactive` Does Automatically

1. **Extraction & Translation (`scripts/publish-interactive.js`)**:
   - Parses the HTML document head for title and description metadata.
   - Extracts the premise strip, article body, section headers, and data tables.
   - Extracts the embedded data script (`<script id="evidence" type="application/json">`).
   - Extracts client-side visualization JavaScript and binds it to `DOMContentLoaded` and Astro's `astro:page-load` (for View Transitions compatibility).
   - Generates the markdown file in `src/content/blog/<slug>.md` with `interactive: true` in its frontmatter.

2. **Production Build & Search Indexing**:
   - Executes `astro build`.
   - Runs `npx pagefind --site dist` to index all text content for instant search across the site.

3. **Visual Verification (`scripts/verify-post.js`)**:
   - Launches a headless browser via `agent-browser`.
   - Renders the post in **Dark Mode (Rangoli)** and takes high-resolution screenshots.
   - Switches to **Light Mode (Kolam)** and captures light mode screenshots.
   - Saves visual verification artifacts to `public/assets/images/previews/<slug>/`:
     - `dark-header.png`
     - `light-header.png`
     - `dark-widgets.png`

---

## 3. How Theming & Hierarchy Work ("Vav Interactive")

All interactive widgets are styled through [`src/styles/interactive-theme.css`](file:///Users/jshah/Documents/GitHub/jayshah5696.github.io/src/styles/interactive-theme.css). It maps standard visualization variables directly to your website's custom tokens:

- **Surface / Cards (`--surface`)**: `#fefdfb` in Light Mode, `#1e1928` in Dark Mode.
- **Signal / Watermark / CTAs (`--orange`, `--cyan`)**: Terracotta (`#c4623a` / `#e07a4f`).
- **Baseline / Controls (`--blue`, `--green`)**: Peacock Teal / Emerald (`#1a8a7a` / `#2ec4b6`).
- **Thresholds / Accents (`--yellow`)**: Haldi Gold (`#d4a843` / `#e8c462`).
- **Attacks / Drops (`--coral`, `--red`)**: Kumkum Red (`#c0392b` / `#e74c3c`).
- **Numbers / Metrics**: Always uses `font-mono tabular-nums` to eliminate jitter during dynamic updates.

---

## 4. Reading Time Calculation

Reading time is computed by the `reading-time` library. Because the complete article text lives in `post.body` within `src/content/blog/<slug>.md`, `reading-time` accurately calculates and displays the true reading duration (e.g. `48 min read` for extensive research papers), avoiding `0 min read` bugs.

---

## 5. Site-Wide Integration Checklist

When `interactive: true` is set on a post:
- [x] **Home Feed**: Displays on `/` with description, tags, and date.
- [x] **Archives**: Indexed chronologically in `/archives/`.
- [x] **Tag Pages**: Appears under each declared tag in `/tags/<tag>/`.
- [x] **RSS Feed**: Broadcast to subscribers via `/rss.xml`.
- [x] **Full-Text Search**: Fully searchable via the Pagefind search modal.
- [x] **Comments**: Threaded discussion enabled via Giscus at the bottom of the article.
