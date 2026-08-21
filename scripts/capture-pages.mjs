import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';

const EXEC = `${homedir()}/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const BASE = process.env.BASE_URL || 'http://localhost:4321';
const OUT = process.env.OUT_DIR || 'test-results/design-capture';
const prefix = process.env.PREFIX || '';

const pages = [
  ['home', '/'],
  ['about', '/about/'],
  ['projects', '/projects/'],
  ['archives', '/archives/'],
  ['links', '/links/'],
  ['reads', '/reads/'],
  ['tags', '/tags/'],
  ['post-ragatouille', '/posts/ragatouille/'],
];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXEC });
for (const theme of ['light', 'dark']) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: theme,
  });
  const page = await ctx.newPage();
  await page.addInitScript((t) => {
    localStorage.setItem('theme', t);
  }, theme);
  for (const [name, path] of pages) {
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(400);
      await page.screenshot({ path: `${OUT}/${prefix}${name}-${theme}.png`, fullPage: false });
      console.log(`captured ${name} ${theme}`);
    } catch (e) {
      console.error(`FAILED ${name} ${theme}: ${e.message.split('\n')[0]}`);
    }
  }
  // mobile pass on home only
  if (theme === 'light') {
    const mctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    const mpage = await mctx.newPage();
    await mpage.addInitScript(() => localStorage.setItem('theme', 'light'));
    try {
      await mpage.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 30000 });
      await mpage.waitForTimeout(400);
      await mpage.screenshot({ path: `${OUT}/${prefix}home-mobile-light.png` });
      console.log('captured home mobile light');
    } catch (e) {
      console.error(`FAILED home mobile: ${e.message.split('\n')[0]}`);
    }
    await mctx.close();
  }
  await ctx.close();
}
await browser.close();
