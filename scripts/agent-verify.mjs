import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';

const EXEC = `${homedir()}/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
const BASE = 'http://localhost:4321';
const OUT = 'test-results/agent-verify';
mkdirSync(OUT, { recursive: true });

const results = [];
const log = (name, ok, detail) => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
};

const browser = await chromium.launch({ executablePath: EXEC });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('pageerror', (e) => consoleErrors.push(String(e)));

// ── 1. Home light: load, overflow, canvas color ──
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
log('home body bg is pure white', bodyBg === 'rgb(255, 255, 255)', bodyBg);

const hasOverflowX = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
log('no horizontal overflow (1440px)', !hasOverflowX);

// ── 2. Theme toggle: click, verify class + persistence + repaint ──
await page.click('#theme-toggle-desktop');
await page.waitForTimeout(300);
let isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
let storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
log('theme toggle switches to dark', isDark && storedTheme === 'dark');
const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
log('dark canvas near-black #0a0a0a', darkBg === 'rgb(10, 10, 10)', darkBg);
await page.screenshot({ path: `${OUT}/verify-home-dark.png` });

await page.click('#theme-toggle-desktop');
await page.waitForTimeout(300);
isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
log('theme toggle switches back to light', !isDark);

// reload → theme persists via localStorage
await page.evaluate(() => localStorage.setItem('theme', 'dark'));
await page.reload({ waitUntil: 'networkidle' });
isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
log('theme persists across reload', isDark);
await page.evaluate(() => localStorage.setItem('theme', 'light'));
await page.reload({ waitUntil: 'networkidle' });

// ── 3. Hover state on post card link: computed border darkens ──
const card = page.locator('article').nth(1);
const beforeBorder = await card.evaluate((el) => getComputedStyle(el).borderTopColor);
await card.hover();
await page.waitForTimeout(350);
const afterBorder = await card.evaluate((el) => getComputedStyle(el).borderTopColor);
log('card hover changes border color', beforeBorder !== afterBorder, `${beforeBorder} -> ${afterBorder}`);

// ── 4. Keyboard focus visible ──
await page.keyboard.press('Tab'); // skip link
await page.keyboard.press('Tab');
const focusInfo = await page.evaluate(() => {
  const el = document.activeElement;
  const s = getComputedStyle(el);
  return { tag: el.tagName, outline: s.outlineStyle, ow: s.outlineWidth };
});
log('keyboard focus has visible outline', focusInfo.outline !== 'none' || focusInfo.ow !== '0px', JSON.stringify(focusInfo));

// ── 5. Search opens and returns results ──
const searchBtn = page.locator('#search-trigger');
if (await searchBtn.count()) {
  await searchBtn.click();
  await page.waitForTimeout(800);
  const modal = page.locator('#search-modal');
  const modalVisible = await modal.isVisible();
  const hasInput = await page.locator('#search-modal input, #search-modal form input').first().isVisible().catch(() => false);
  log('search modal opens', modalVisible);
  log('search input focusable', hasInput);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
} else {
  log('search modal opens', false, '#search-trigger not found');
}

// ── 6. Navigate to a post; check prose link underline + code block border ──
await page.goto(BASE + '/posts/ragatouille/', { waitUntil: 'networkidle' });
const proseLink = await page.evaluate(() => {
  const a = document.querySelector('.prose p a, .prose li a');
  if (!a) return null;
  const s = getComputedStyle(a);
  return { deco: s.textDecorationLine, color: s.color };
});
log('prose links underlined', !!proseLink && proseLink.deco.includes('underline'), JSON.stringify(proseLink));
const preBorder = await page.evaluate(() => {
  const pre = document.querySelector('pre.astro-code');
  return pre ? getComputedStyle(pre).borderTopColor : null;
});
log('code block border neutral (not terra)', preBorder && preBorder !== 'rgb(196, 98, 58)', String(preBorder));

// full-page capture of the post in both themes
await page.screenshot({ path: `${OUT}/verify-post-light-full.png`, fullPage: true });
await page.click('#theme-toggle-desktop');
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/verify-post-dark-full.png`, fullPage: true });
log('post page full-page capture both themes', true);
await page.click('#theme-toggle-desktop');

// ── 7. Reads page: filter pills render + click works ──
await page.goto(BASE + '/reads/', { waitUntil: 'networkidle' });
const filterToggle = page.locator('#filters-toggle, button[aria-controls="filters-drawer"], #toggle-filters').first();
let openedDrawer = false;
for (const sel of ['#filters-toggle', 'button[aria-controls="filters-drawer"]']) {
  if (await page.locator(sel).count()) { await page.locator(sel).click(); openedDrawer = true; break; }
}
if (!openedDrawer) {
  // fall back: click the icon button that precedes the drawer
  const btns = page.locator('main button');
  const n = await btns.count();
  for (let i = 0; i < n; i++) {
    const b = btns.nth(i);
    if (await b.isVisible()) {
      await b.click();
      await page.waitForTimeout(250);
      if (await page.locator('#filters-drawer').isVisible()) { openedDrawer = true; break; }
    }
  }
}
log('reads filter drawer opens', openedDrawer || await page.locator('#filters-drawer').isVisible());
const pill = page.locator('.year-pill[data-year-val]:not([data-year-val="all"])').first();
if (await pill.isVisible().catch(() => false)) {
  const pillText = (await pill.textContent())?.trim();
  await pill.click();
  await page.waitForTimeout(400);
  const activeCls = await pill.getAttribute('class');
  log('reads year filter applies selection', activeCls.includes('bg-terra'), `clicked "${pillText}"`);
  await page.locator('.year-pill[data-year-val="all"]').click();
} else {
  log('reads year filter applies selection', false, 'pills not visible');
}

// ── 8. Mobile viewport: no overflow, menu toggle works ──
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
const mpage = await mctx.newPage();
mpage.on('console', (m) => { if (m.type() === 'error') consoleErrors.push('[mobile] ' + m.text()); });
await mpage.goto(BASE + '/', { waitUntil: 'networkidle' });
const mOverflow = await mpage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
log('mobile: no horizontal overflow (390px)', !mOverflow);
const menuBtn = mpage.locator('#mobile-menu-toggle');
if (await menuBtn.count()) {
  await menuBtn.click();
  await mpage.waitForTimeout(250);
  const menuOpen = await mpage.locator('#mobile-menu').isVisible();
  log('mobile menu toggles open', menuOpen);
  await mpage.screenshot({ path: `${OUT}/verify-mobile-menu.png` });
  const navLink = mpage.locator('#mobile-menu a[href="/about/"]');
  if (await navLink.count()) {
    await navLink.click();
    await mpage.waitForTimeout(600);
    const url = mpage.url();
    const menuClosed = !(await mpage.locator('#mobile-menu').isVisible().catch(() => false));
    log('mobile nav navigates to /about/', url.includes('/about'), url);
    log('mobile menu closes after nav', menuClosed);
  }
  await mpage.goto(BASE + '/archives/', { waitUntil: 'networkidle' });
  const mAOverflow = await mpage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  log('mobile archives: no horizontal overflow', !mAOverflow);
} else {
  log('mobile menu toggle found', false);
}
await mctx.close();

// ── 9. Console errors across session ──
log('console clean (no errors)', consoleErrors.length === 0, consoleErrors.slice(0, 3).join(' | ') || '');

await browser.close();
const failed = results.filter(r => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed ? 1 : 0);
