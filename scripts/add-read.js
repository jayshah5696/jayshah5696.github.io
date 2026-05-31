import fs from 'fs';
import path from 'path';

// Helper to decode basic HTML entities
function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—');
}

// Helper to slugify titles for filenames
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Usage: npm run add-read <url> [tags] [title]

Arguments:
  url      The URL you want to recommend (Required)
  tags     Comma-separated tags (Optional, e.g., "llm,agents")
  title    Custom title (Optional. If omitted, it fetches the page title)

Examples:
  npm run add-read "https://simonwillison.net/" "dev,llm"
  npm run add-read "https://example.com" "ml" "Custom Title of Article"
    `);
    process.exit(0);
  }

  const url = args[0];
  const tagsArg = args[1] || '';
  let customTitle = args[2] || '';

  const tags = tagsArg
    ? tagsArg.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    : [];

  let title = customTitle;

  if (!title) {
    console.log(`Fetching title from URL: ${url}...`);
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const html = await response.text();
      const match = html.match(/<title>(.*?)<\/title>/i);
      
      if (match && match[1]) {
        title = decodeHtmlEntities(match[1].trim());
        console.log(`Successfully fetched title: "${title}"`);
      } else {
        console.log('Could not find <title> tag. Using fallback.');
        title = 'Recommended Read';
      }
    } catch (error) {
      console.error(`Warning: Failed to fetch title automatically: ${error.message}`);
      title = 'Recommended Read';
    }
  }

  // Get current date details
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const dateStr = today.toISOString().split('T')[0];

  // Folder path: src/content/reads/YYYY/MM/
  const dirPath = path.join(process.cwd(), 'src', 'content', 'reads', year, month);
  
  // Make sure directories exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Generate filename: slugified-title.md
  const fileSlug = slugify(title) || 'recommend-read';
  const filePath = path.join(dirPath, `${fileSlug}.md`);

  // If file already exists, avoid overwriting
  let finalFilePath = filePath;
  let counter = 1;
  while (fs.existsSync(finalFilePath)) {
    finalFilePath = path.join(dirPath, `${fileSlug}-${counter}.md`);
    counter++;
  }

  const yamlContent = `---
title: "${title.replace(/"/g, '\\"')}"
url: "${url}"
date: ${dateStr}
tags: ${JSON.stringify(tags)}
---

`;

  fs.writeFileSync(finalFilePath, yamlContent, 'utf8');
  console.log(`
Success! Created new recommendation file:
  ${path.relative(process.cwd(), finalFilePath)}

File content:
----------------------------------------------
${yamlContent}----------------------------------------------
You can edit the file to add markdown commentary if you wish.
`);
}

main().catch(err => {
  console.error('Error running script:', err);
  process.exit(1);
});
