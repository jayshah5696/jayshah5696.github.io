# Frontend and UX review

**Site:** [jayshah.dev](https://jayshah.dev)

**Repository:** [jayshah5696/jayshah5696.github.io](https://github.com/jayshah5696/jayshah5696.github.io)

**Review basis:** Live homepage review, source review of the current `master` branch, and a production build on 2026-08-16.

## Overall assessment

The latest version has a clear identity. The Vav system gives the site a memorable visual language through warm paper tones, Kolam borders, Rangoli corner details, color-coded tags, and the serif-plus-monospace pairing. The homepage also communicates the main promise quickly: Jay builds production AI systems and writes about what ships.

The main UX issue is density, not visual quality. The homepage asks the reader to process a fixed desktop sidebar, a primary article stream, a second update list, trending tags, decorative patterns, long uppercase tag rows, and large cards at the same time. The design would improve if the reading surface became more dominant and secondary discovery controls became quieter and more deliberate.

## What is working

- The homepage has one clear `main` landmark and a skip link in `src/layouts/BaseLayout.astro:72-83`.
- The latest post is visually distinct and includes its image, description, date, reading time, and tags in `src/pages/index.astro:31-44` and `src/components/PostCard.astro:21-92`.
- The custom Vav identity is consistent across the source and live page. The system uses cream and ink in light mode, indigo and silk in dark mode, and semantic terra, peacock, gold, and kumkum accents.
- Search has a visible trigger, a `/` shortcut, lazy Pagefind loading, Escape-to-close behavior, and a dialog role in `src/components/Search.astro:20-91`.
- Mobile navigation exposes the complete navigation set in a dedicated menu in `src/components/MobileNav.astro:71-101`.
- The production build completed successfully with `npm ci --legacy-peer-deps && npm run build`. Astro generated 87 pages and Pagefind indexed 87 pages.

## Confirmed findings

### Medium: search dialog focus is incomplete

`src/components/Search.astro:20-91` opens a dialog and focuses the Pagefind input, but it does not move focus to the dialog before Pagefind loads, contain focus inside the dialog, or restore focus to the trigger after closing. Keyboard users can tab into the page behind the modal while it is open.

**Impact:** Search is a primary discovery action. A modal that does not manage focus can make keyboard navigation confusing and can strand focus after closing.

**Fix:** Store the trigger as `previousFocus`, focus the dialog or search input when opening, add a small focus trap, and return focus to the trigger in `closeSearch()`.

### Medium: mobile menu state is not exposed

`src/components/MobileNav.astro:59-67` provides an "Open menu" label, but `src/layouts/BaseLayout.astro:116-127` only toggles the `hidden` class. The button does not expose `aria-expanded` or `aria-controls`, and the label does not change when the menu closes.

**Impact:** Screen-reader users cannot reliably discover whether the menu is open.

**Fix:** Add `aria-controls="mobile-menu"`, toggle `aria-expanded`, and use "Open menu" / "Close menu" states.

### Medium: mobile navigation spends scarce horizontal space on three links

At widths below `lg`, `src/components/MobileNav.astro:28-47` keeps Home, About, and Projects visible beside the profile, theme toggle, and menu button. On narrow screens this can crowd the header before the full menu is opened.

**Impact:** The header may wrap or leave small tap targets, especially around 320px and 375px widths.

**Fix:** Keep the profile, theme toggle, and menu button in the fixed header. Move Home, About, and Projects into the menu, or show only the current page label.

### Low: the homepage has competing update surfaces

The primary article stream is paired with `Recently Updated` and `Trending Tags` in the right rail. The live homepage therefore presents the same recent articles in two locations: the article cards and the update list. The second list is implemented in `src/components/RightSidebar.astro` and inserted from `src/pages/index.astro:61`.

**Impact:** Repetition increases visual noise and makes the right rail compete with the article a reader is already scanning.

**Fix:** Keep one compact rail module. Prefer `Trending Tags` or replace `Recently Updated` with a short "Start here" module that points to two or three durable articles.

### Low: hover-only article affordance is weak on touch

`src/components/PostCard.astro:62-66` hides the "Read article" affordance until hover. The whole card is a link, but the explicit action is unavailable to touch users and is invisible until pointer hover.

**Impact:** The interaction is discoverable on desktop but less clear on mobile and for keyboard users.

**Fix:** Keep the arrow and action visible at all sizes, then use hover only for a small color or position change.

## Responsive review

The source uses a sensible `lg` desktop split and stacks article cards below `sm` in `src/layouts/BaseLayout.astro:79-87` and `src/components/PostCard.astro:28-30`. The review should still include these widths before the next visual change:

- `320px`: verify the mobile header does not crowd the three inline links.
- `375px`: verify long titles, tag rows, and the RSS row do not create unwanted horizontal overflow.
- `768px`: verify the transition from mobile navigation to the desktop sidebar does not create a wide empty gutter.
- `900px` and `1100px`: verify the right rail and article column retain readable widths.

The visible homepage already shows a long article column and a narrow right rail. On large screens, the decorative card patterns are attractive but increase the amount of visual detail behind every article. On narrow screens, reduce decorative opacity before reducing text size.

## Recommended adoption from established design systems

### Adopt Notion's document-first reading rhythm

This is the best fit for the site's writing-heavy purpose. Notion uses warm neutrals, quiet borders, restrained elevation, and generous space around readable content. Adopt the interaction qualities, not Notion's branding:

1. Make the article stream the strongest visual surface.
2. Reduce the contrast and density of the right rail.
3. Use a quieter card border and less hover movement for older posts.
4. Preserve the Vav cream, ink, terra, gold, mor, and Rangoli colors.
5. Keep headings in Yeseva One, body text in Outfit, and Fira Code for metadata.

**Expected benefit:** Readers can scan and continue reading without competing panels or decorative detail pulling attention away from the writing.

### Borrow Mintlify's technical information hierarchy

Mintlify is a useful reference for a technical reading site. Its strongest pattern is the separation between readable content, technical labels, and secondary controls. Apply it to the existing system:

- Keep tags and dates in Fira Code, but reduce uppercase tag rows to the most useful two or three tags on cards.
- Use a short explanation before search and filter actions on the Reads page.
- Treat the right rail as progressive disclosure at tablet widths instead of a permanent second task.
- Keep borders very light and reserve terra for links, focus, active state, and primary actions.

**Expected benefit:** Technical metadata remains useful without becoming the dominant visual texture.

## Target visual direction

| Area | Recommendation |
| --- | --- |
| Primary surface | Give the article stream the strongest contrast and width. |
| Context | Keep date, reading time, and the first few tags close to each title. |
| Operations | Put search, archives, and broad tag discovery behind clear secondary controls. |
| Color | Preserve the Vav palette. Reserve terra for active, focused, linked, and primary states. |
| Borders | Keep the existing Kolam and Rangoli motifs, but lower their opacity on repeated cards. |
| Typography | Preserve Yeseva One for headings and Outfit for reading. Keep body text at a comfortable reading size. |
| Spacing | Use a consistent 8px base rhythm and add more space between major content groups than between metadata items. |
| Motion | Keep view transitions and subtle hover changes. Avoid making every card lift on hover. |

## Prioritized implementation sequence

1. Fix search dialog focus management and mobile menu ARIA state.
2. Simplify the mobile header at 320px and 375px.
3. Remove one of the duplicate recent-content surfaces from the homepage.
4. Make the article action visible without hover.
5. Reduce repeated decorative texture on non-featured cards.
6. Recheck light mode, dark mode, keyboard navigation, and the responsive widths listed above.

## Acceptance checklist

- [ ] Search moves focus into the dialog, traps focus while open, closes with Escape, and restores focus to the trigger.
- [ ] Mobile menu exposes `aria-expanded` and `aria-controls` and updates its label.
- [ ] The header fits at `320px` and `375px` without horizontal overflow.
- [ ] The homepage has one dominant article stream and one compact secondary discovery module.
- [ ] Article actions are visible to keyboard and touch users.
- [ ] Vav's colors, typography, and Kolam/Rangoli motifs remain intact.
- [ ] `npm run build` succeeds and Pagefind indexing completes.
- [ ] The site is checked in both light and dark mode.

## Sources

- [Live homepage](https://jayshah.dev)
- [Repository](https://github.com/jayshah5696/jayshah5696.github.io)
- [Notion design reference](https://www.notion.so)
- [Mintlify design reference](https://mintlify.com)
- `src/layouts/BaseLayout.astro`
- `src/components/Search.astro`
- `src/components/MobileNav.astro`
- `src/components/PostCard.astro`
- `src/pages/index.astro`
- `src/components/RightSidebar.astro`

This document is a review and design brief. It does not change the site's UI.
