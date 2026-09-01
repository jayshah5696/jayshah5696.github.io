# jayshah5696.github.io - Automation Recipes

# Default recipe: list available commands
default:
  @just --list

# Start Astro development server
dev:
  pnpm run dev

# Run production build and generate Pagefind search index
build:
  pnpm run build

# Reproduce the GitHub Pages build with a clean lockfile install
ci-build:
  pnpm install --frozen-lockfile
  pnpm run build

# Preview production build locally
preview:
  pnpm run preview

# Publish an interactive HTML report into the blog collection
# Usage: just publish-interactive <source-html-path> <slug> [tags] [date]
publish-interactive source_html slug tags="ai-safety,llm,watermarking,gen-ai,research" date="2026-08-16":
  node scripts/publish-interactive.js "{{source_html}}" "{{slug}}" "{{tags}}" "{{date}}"
  pnpm run build
  node scripts/verify-post.js "{{slug}}"

# Run automated visual verification on an existing post
# Usage: just verify-post <slug>
verify-post slug:
  node scripts/verify-post.js "{{slug}}"

# Run automated verification and visual regression testing on the reads page
# Usage: just verify-reads
verify-reads:
  node scripts/verify-reads.js


# Measure a page's runtime DOM and background work
# Usage: just measure-post-performance <url> [label]
measure-post-performance url label="measurement":
  node scripts/measure-post-performance.js --url "{{url}}" --label "{{label}}" --browsers chromium,webkit

# Add a reading list entry
add-read:
  pnpm run add-read

# Fetch recent reads from Karakeep, synthesize takeaways with LLM, review in UI, and create PR
# Usage:
#   just sync-reads                                     # Auto-detects since latest read in repo
#   just sync-reads 2026-08-15                          # From date onwards
#   just sync-reads 2026-08-15 2026-08-27               # Specific date range
#   just sync-reads 2026-08-15 "" google/gemini-3.5-flash-lite # Custom model slug
sync-reads start="auto" end="" model="openai/gpt-5.6-luna":
  uv run scripts/curate_reads.py --start "{{start}}" --end "{{end}}" --model "{{model}}"



