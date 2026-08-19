# jayshah5696.github.io - Automation Recipes

# Default recipe: list available commands
default:
  @just --list

# Start Astro development server
dev:
  npm run dev

# Run production build and generate Pagefind search index
build:
  npm run build

# Preview production build locally
preview:
  npm run preview

# Publish an interactive HTML report into the blog collection
# Usage: just publish-interactive <source-html-path> <slug> [tags] [date]
publish-interactive source_html slug tags="ai-safety,llm,watermarking,gen-ai,research" date="2026-08-16":
  node scripts/publish-interactive.js "{{source_html}}" "{{slug}}" "{{tags}}" "{{date}}"
  npm run build
  node scripts/verify-post.js "{{slug}}"

# Run automated visual verification on an existing post
# Usage: just verify-post <slug>
verify-post slug:
  node scripts/verify-post.js "{{slug}}"

# Measure the watermark post's runtime DOM and background work
# Usage: just measure-watermark-performance [url] [label]
measure-watermark-performance url="http://127.0.0.1:4321/posts/how-text-watermarks-hide-in-plain-sight/" label="measurement":
  node scripts/measure-post-performance.js --url "{{url}}" --label "{{label}}" --browsers chromium,webkit

# Add a reading list entry
add-read:
  npm run add-read
