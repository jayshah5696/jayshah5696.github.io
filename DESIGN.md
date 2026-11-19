# Design System — jayshah.dev

This file documents the deliberate visual system of `jayshah.dev` so automated checks, contributors, and future redesigns stay consistent.

## 1. Concept & Brand Direction

The site pairs an editorial reading layout with geometric Gujarati architectural cues:

- **Light mode ("Kolam Sandstone"):** Warm sandstone paper (`#fdf9f1`) with carved terracotta (`#a34824`), turmeric gold (`#d4a843` decorative / `#7d5e15` text), peacock teal (`#116d60`), and deep ink (`#2c2416`). The warm cream canvas is an intentional brand surface anchored to sandstone stepwell architecture and kolam floor art, not an ad-hoc off-white default.
- **Dark mode ("Twilight Vav"):** Deep aubergine night (`#15111e`) with elevated plum cards (`#1e1928`), warm terracotta glow (`#e07a4f`), soft gold (`#e8c462`), and silk text (`#e8e0d4`).

## 2. Color Tokens & Contrast Floor

All functional text and tag pills meet WCAG AA (`>= 4.5:1`) in both light and dark modes:

| Role | Light Token | Dark Token |
| --- | --- | --- |
| Page Canvas | `cream-100` (`#fdf9f1`) | `night-900` (`#15111e`) |
| Card Surface | `cream-100` / `cream-50` (`#fefdfb`) | `night-800` (`#1e1928`) |
| Hairline Border | `cream-200` (`#f5edd8`) / `cream-300` (`#e8dbc0`) | `night-700` (`#2a2438`) |
| Primary Text | `ink` (`#2c2416`) | `silk` (`#e8e0d4`) |
| Secondary Text | `ink-light` (`#524735`) | `silk-muted` (`#a89e8e`) |
| Muted / Meta Text | `ink-muted` (`#665c4b`) / `ink-faint` (`#716654`) | `silk-faint` (`#968c7e`) |
| Primary Accent | `terra` (`#a34824`) / `terra-dark` (`#873a1b`) | `terra-light` (`#e07a4f`) |
| Secondary Accent | `gold-dark` (`#7d5e15`, text) / `gold` (`#d4a843`, linework) | `gold-light` (`#e8c462`) |
| Technical Accent | `mor` (`#116d60`) | `mor-light` (`#2ec4b6`) |
| Personal Accent | `kumkum` (`#b32d21`) | `kumkum-light` (`#f06a5c`) |

## 3. Typography & Measure

- **Display:** `Yeseva One` (`--font-display`) for `h1`, `h2`, `h3`, and card headlines. All headings use `text-wrap: balance`.
- **Body:** `Libron` (`--font-body`) at `16px` base for long-form essays, cards, and UI labels. Body paragraphs use `text-wrap: pretty` and constrain editorial prose to `max-w-[65ch]`.
- **Mono:** `Fira Code` (`--font-mono`) with `tabular-nums` for dates, reading times, counts, shortcuts, and tag pills.
- **Size Floor:** No functional UI label, badge, count, or link drops below `11px` (`text-[11px]`).
- **Heading Hierarchy:** Strict `h1 -> h2 -> h3` outline with no skipped levels and no decorative uppercase kickers above page headings.

## 4. Layout & Surface Restraint

- **Navigation Shell:** Fixed `260px` left sidebar on desktop (`>= 1024px`) with the animated `JS` Kolam emblem, Pagefind search trigger, vertical nav links, social icons, and theme toggle. Optional `240px` contextual right rail on `/` (`Recent Reads` + `Trending Tags`) and `/blog/` / `/reads/` (`Start Here` + `Trending Tags`).
- **Cards (`.featured-card`):** Flat hairline border plus a `1px` top-edge inset highlight (`inset 0 1px 0`) for subtle physical edge definition instead of heavy drop shadows. Never nest bordered cards inside cards; separate sub-sections (such as expandable reading notes) with a clean hairline top border.
- **Motifs:** Keep Gujarati stepwell spines (`.stepwell-spine`), diamond bindu nodes (`.kolam-diamond-node`), carved heading bars (`.carved-heading`), and `.kolam-border` dividers consistent across every page.

## 5. Motion Grammar

- **Easing:** `cubic-bezier(0.23, 1, 0.32, 1)` for interactive transitions and `cubic-bezier(0.16, 1, 0.3, 1)` for entrance reveals.
- **Durations:** Hover/color states `75ms` to `150ms` with `0s` delay; image scale and accordion reveals `200ms` to `220ms`; entrance reveals `450ms` with `45ms` stagger.
- **No Decorative Noise:** Never use `transition-all`, decorative `animate-pulse` on static status indicators, or fake blinking terminal carets.
- **Pointer & Reduced Motion Safety:** Gate hover zoom/border emphasis behind `@media (hover: hover) and (pointer: fine)` and disable non-essential motion under `@media (prefers-reduced-motion: reduce)`.
